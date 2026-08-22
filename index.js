const FEEDS = [
  ["Reuters","https://news.google.com/rss/search?q=site%3Areuters.com+stocks+companies+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["CNBC","https://www.cnbc.com/id/100003114/device/rss/rss.html"],
  ["Yahoo Finance","https://finance.yahoo.com/news/rssindex"],
  ["GlobeNewswire","https://news.google.com/rss/search?q=site%3Aglobenewswire.com+NASDAQ+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["PR Newswire","https://news.google.com/rss/search?q=site%3Aprnewswire.com+NASDAQ+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["Business Wire","https://news.google.com/rss/search?q=site%3Abusinesswire.com+NASDAQ+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["Investing.com","https://news.google.com/rss/search?q=site%3Ainvesting.com+stocks+companies+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"],
  ["MarketWatch","https://news.google.com/rss/search?q=site%3Amarketwatch.com+stocks+companies+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"]
];

const TERMS = [
  "fda","phase 1","phase 2","phase 3","phase i","phase ii","phase iii",
  "clinical trial","clinical results","clinical data","topline results",
  "trial results","pdufa","nda","bla","earnings","earnings results",
  "quarterly results","financial results","earnings per share","eps",
  "guidance","revenue","profit","net income","q1","q2","q3","q4",
  "first quarter","second quarter","third quarter","fourth quarter",
  "dilution","dilutive","stock offering","public offering","follow-on offering",
  "registered direct offering","direct offering","private placement",
  "at-the-market","atm offering","capital raise","financing","convertible notes",
  "warrant","warrants","share repurchase","share buyback","stock buyback",
  "buyback program","repurchase authorization","new contract","major contract",
  "government contract","defense contract","purchase order","new order",
  "customer agreement","supply agreement","licensing agreement","partnership",
  "strategic partnership","collaboration","joint venture","acquisition",
  "acquires","merger","business combination","strategic investment",
  "infrastructure investment","new facility","manufacturing facility",
  "production expansion","capacity expansion","capital expenditure","capex",
  "product launch","commercial launch","new product","strategic review",
  "restructuring","divestiture","special dividend","dividend increase",
  "settlement","court ruling","patent granted","patent issued","ceo appointed",
  "new ceo","management change","material agreement","definitive agreement",
  "letter of intent","nasdaq compliance","nasdaq delisting","reverse split",
  "stock split","sec filing","8-k","10-q","10-k","analyst upgrade",
  "analyst downgrade","price target raised","price target lowered"
];

const MARKET_ONLY = [
  "s&p 500","nasdaq composite","dow jones","wall street","stock market",
  "market rally","market selloff","market volatility","stocks rise",
  "stocks fall","stocks rally","stocks decline","fed rate","interest rates",
  "inflation","jobs report","employment report","economic data","treasury yields",
  "bond yields","market outlook","market update","weekly market"
];

function clean(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[|\]\]>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/gi, "&").replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">").replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'").replace(/\s+/g, " ").trim();
}

function tag(xml, name) {
  const m = xml.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${name}>`, "i"));
  return m ? clean(m[1]) : "";
}

function parseRSS(xml, source) {
  const blocks = xml.match(/<item(?:\s[^>]*)?>[\s\S]*?<\/item>/gi) || [];
  return blocks.map(b => ({
    title: tag(b, "title"),
    link: tag(b, "link"),
    description: tag(b, "description"),
    pubDate: tag(b, "pubDate"),
    source
  })).filter(x => x.title && x.link);
}

function passes(item) {
  const title = item.title.toLowerCase();
  const text = `${title} ${item.description}`.toLowerCase();
  const matched = TERMS.some(t => text.includes(t));
  if (!matched) return false;

  const strong = TERMS.slice(0, 10).some(t => text.includes(t)) ||
    /earnings|guidance|dilution|offering|financing|buyback|repurchase|contract|acquisition|merger|partnership|clinical|fda|patent|nasdaq compliance|reverse split|stock split/i.test(text);

  const marketOnly = MARKET_ONLY.some(t => title.includes(t));
  return !(marketOnly && !strong);
}

async function hash(s) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2,"0")).join("");
}

async function init(env) {
  if (!env.NEWS_DB) throw new Error("NEWS_DB D1 binding bulunamadı.");
  await env.NEWS_DB.prepare(`
    CREATE TABLE IF NOT EXISTS news_sent (
      link_hash TEXT PRIMARY KEY,
      link TEXT NOT NULL,
      title TEXT,
      source TEXT,
      sent_at INTEGER NOT NULL
    )
  `).run();
}

async function seen(env, h) {
  return !!await env.NEWS_DB.prepare(
    "SELECT link_hash FROM news_sent WHERE link_hash=? LIMIT 1"
  ).bind(h).first();
}

async function mark(env, h, item) {
  await env.NEWS_DB.prepare(
    "INSERT OR IGNORE INTO news_sent(link_hash,link,title,source,sent_at) VALUES(?,?,?,?,?)"
  ).bind(h, item.link, item.title, item.source, Date.now()).run();
}

async function translate(text) {
  if (!text) return "";

  const input = String(text).trim();
  if (!input) return "";

  try {
    const r = await fetch(
      "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=tr&dt=t&q=" +
      encodeURIComponent(input)
    );

    if (!r.ok) throw new Error(`Translate HTTP ${r.status}`);

    const d = await r.json();
    const translated = (d?.[0] || [])
      .map(x => x?.[0] || "")
      .join("")
      .trim();

    if (!translated) throw new Error("Boş çeviri döndü.");

    return translated;
  } catch {
    // Çeviri servisi geçici olarak cevap vermezse İngilizce metni
    // Telegram'a göndermek yerine boş bırakıyoruz.
    return "";
  }
}

function esc(s) {
  return String(s || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
}

async function telegram(env, text) {
  if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
    throw new Error("TELEGRAM_BOT_TOKEN veya TELEGRAM_CHAT_ID eksik.");
  }
  const r = await fetch(
    `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
    {
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify({
        chat_id:env.TELEGRAM_CHAT_ID,
        text,
        parse_mode:"HTML",
        link_preview_options:{
          is_disabled:false,
          prefer_large_media:true
        }
      })
    }
  );
  return r.ok;
}

async function run(env) {
  await init(env);
  await env.NEWS_DB.prepare(
    "DELETE FROM news_sent WHERE sent_at < ?"
  ).bind(Date.now() - 7*24*60*60*1000).run();

  const lists = await Promise.all(FEEDS.map(async ([source,url]) => {
    try {
      const r = await fetch(url, {headers:{"user-agent":"NASDAQ-News-Bot/1.0"}});
      if (!r.ok) return [];
      return parseRSS(await r.text(), source);
    } catch {
      return [];
    }
  }));

  const all = lists.flat();
  const unique = [];
  const links = new Set();

  for (const item of all) {
    if (!links.has(item.link)) {
      links.add(item.link);
      unique.push(item);
    }
  }

  unique.sort((a,b) =>
    (new Date(b.pubDate || 0).getTime() || 0) -
    (new Date(a.pubDate || 0).getTime() || 0)
  );

  const filtered = unique.filter(passes);
  let sent = 0;
  let duplicate = 0;

  for (const item of filtered) {
    if (sent >= 10) break;

    const h = await hash(item.link);
    if (await seen(env, h)) {
      duplicate++;
      continue;
    }

    const title = await translate(item.title);
    if (!title) continue;

    const desc = item.description ? await translate(item.description) : "";

    let msg = `📰 <b>NASDAQ / ABD PİYASALARI</b>\n\n<b>${esc(title)}</b>\n\nKaynak: ${esc(item.source)}\n🔗 <a href="${esc(item.link)}">Haberi Aç</a>`;
    if (desc) msg += `\n\n<b>Haber Özeti</b>\n${esc(desc.slice(0,1800))}`;

    if (await telegram(env, msg)) {
      await mark(env, h, item);
      sent++;
    }
  }

  return {ok:true,total:unique.length,filtered:filtered.length,sent,duplicate};
}

export default {
  async fetch(request, env) {
    const path = new URL(request.url).pathname;

    if (path === "/test") {
      try {
        await init(env);
        return Response.json({
          ok:true,
          d1:"bağlı",
          feeds:FEEDS.length,
          filters:TERMS.length,
          telegram:!!(env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID)
        });
      } catch (e) {
        return Response.json({ok:false,error:e.message},{status:500});
      }
    }

    if (path === "/run") {
      try {
        return Response.json(await run(env));
      } catch (e) {
        return Response.json({ok:false,error:e.message},{status:500});
      }
    }

    return Response.json({
      ok:true,
      worker:"NASDAQ News Bot",
      endpoints:["/test","/run"]
    });
  },

  async scheduled(controller, env, ctx) {
    ctx.waitUntil(run(env));
  }
};
