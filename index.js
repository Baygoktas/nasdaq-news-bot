const FEEDS = [
  {
    name: "Reuters",
    url: "https://news.google.com/rss/search?q=site%3Areuters.com+markets+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "CNBC",
    url: "https://www.cnbc.com/id/100003114/device/rss/rss.html"
  },
  {
    name: "MarketWatch",
    url: "https://news.google.com/rss/search?q=site%3Amarketwatch.com+markets+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "Investing.com",
    url: "https://news.google.com/rss/search?q=site%3Ainvesting.com+markets+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "Yahoo Finance",
    url: "https://finance.yahoo.com/news/rssindex"
  }
];

function cleanText(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getItems(xml) {
  const items = [];
  const matches = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

  for (const item of matches) {
    const titleMatch = item.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = item.match(/<link>([\s\S]*?)<\/link>/i);
    const dateMatch = item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    const sourceMatch = item.match(/<source[^>]*>([\s\S]*?)<\/source>/i);

    if (!titleMatch || !linkMatch) continue;

    const title = cleanText(titleMatch[1]);
    const link = cleanText(linkMatch[1]);
    const pubDate = dateMatch ? cleanText(dateMatch[1]) : "";
    const source = sourceMatch ? cleanText(sourceMatch[1]) : "";

    if (!title || !link) continue;

    items.push({
      title,
      link,
      pubDate,
      source
    });
  }

  return items;
}

async function makeKey(link) {
  const data = new TextEncoder().encode(link);
  const hash = await crypto.subtle.digest("SHA-256", data);

  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function getNews() {
  const allNews = [];

  for (const feed of FEEDS) {
    try {
      const response = await fetch(feed.url, {
        headers: {
          "User-Agent": "Nasdaq-News-Bot/1.0"
        }
      });

      if (!response.ok) continue;

      const xml = await response.text();
      const items = getItems(xml);

      for (const item of items) {
        allNews.push({
          ...item,
          feedSource: feed.name
        });
      }
    } catch (error) {
      console.log(`Feed hatası: ${feed.name}`, error.message);
    }
  }

  return allNews;
}

async function sendNews(env) {
  const news = await getNews();

  if (!news.length) {
    return {
      sent: 0,
      message: "Yeni haber bulunamadı."
    };
  }

  const unique = [];
  const seen = new Set();

  for (const item of news) {
    if (seen.has(item.link)) continue;

    seen.add(item.link);
    unique.push(item);
  }

  unique.sort((a, b) => {
    const da = a.pubDate ? new Date(a.pubDate).getTime() : 0;
    const db = b.pubDate ? new Date(b.pubDate).getTime() : 0;
    return db - da;
  });

  let sent = 0;

  for (const item of unique) {
    if (sent >= 5) break;

    const key = `news:${await makeKey(item.link)}`;

    const alreadySent = await env.NEWS_SENT.get(key);

    if (alreadySent) continue;

    const title = escapeHtml(item.title);
    const source = escapeHtml(item.source || item.feedSource);

    const message =
      `📰 <b>NASDAQ / ABD PİYASALARI</b>\n\n` +
      `<b>${title}</b>\n\n` +
      `Kaynak: ${source}\n` +
      `<a href="${item.link}">🔗 Haberi Aç</a>`;

    const response = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
          disable_web_page_preview: false
        })
      }
    );

    if (!response.ok) {
      console.log("Telegram hatası:", await response.text());
      continue;
    }

    await env.NEWS_SENT.put(key, "1", {
      expirationTtl: 86400
    });

    sent++;
  }

  return {
    sent,
    message: `${sent} yeni haber gönderildi.`
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Manuel test
    if (url.pathname === "/test") {
      try {
        const result = await sendNews(env);

        return new Response(
          JSON.stringify({
            ok: true,
            ...result
          }),
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      } catch (error) {
        return new Response(
          JSON.stringify({
            ok: false,
            error: error.message
          }),
          {
            status: 500,
            headers: {
              "Content-Type": "application/json"
            }
          }
        );
      }
    }

    return new Response("Nasdaq Haber Bot aktif.");
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(
      sendNews(env).catch(error => {
        console.log("Scheduled hata:", error.message);
      })
    );
  }
};
