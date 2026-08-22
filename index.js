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


/* =========================================================
   HABER FİLTRESİ
   ========================================================= */

const NEWS_FILTER_TERMS = [

  // FDA / REGULATORY
  "fda",
  "food and drug administration",
  "fda approval",
  "fda approved",
  "fda clearance",
  "fda cleared",
  "regulatory approval",
  "regulatory clearance",
  "regulatory authorization",
  "approved by the fda",
  "cleared by the fda",

  // CLINICAL TRIALS
  "phase 1",
  "phase 2",
  "phase 3",
  "phase i",
  "phase ii",
  "phase iii",
  "clinical trial",
  "clinical study",
  "clinical data",
  "clinical results",
  "trial results",
  "trial data",
  "topline results",
  "top-line results",
  "primary endpoint",
  "secondary endpoint",
  "endpoint",
  "positive results",
  "positive data",
  "negative results",
  "interim results",
  "interim data",
  "enrollment",
  "patient enrollment",
  "first patient",
  "first patient dosed",
  "dosed first patient",
  "patient dosed",
  "clinical development",

  // BIOTECH / DRUG
  "drug candidate",
  "drug development",
  "treatment",
  "therapy",
  "therapeutic",
  "biologic",
  "biologics",
  "new drug",
  "investigational",
  "indication",
  "label expansion",
  "clinical program",
  "biotech",

  // EARNINGS / FINANCIAL RESULTS
  "earnings",
  "earnings results",
  "earnings report",
  "earnings release",
  "quarterly results",
  "quarterly earnings",
  "financial results",
  "revenue",
  "profit",
  "net income",
  "eps",
  "adjusted eps",
  "guidance",
  "financial guidance",
  "raises guidance",
  "lowers guidance",
  "full-year guidance",
  "fiscal year guidance",
  "outlook",

  // QUARTERS
  "q1",
  "q2",
  "q3",
  "q4",
  "first quarter",
  "second quarter",
  "third quarter",
  "fourth quarter",

  // CAPITAL / DILUTION
  "dilution",
  "dilutive",
  "dilution risk",
  "share dilution",
  "stock offering",
  "public offering",
  "secondary offering",
  "follow-on offering",
  "registered direct offering",
  "direct offering",
  "private placement",
  "private offering",
  "at-the-market",
  "atm offering",
  "securities purchase agreement",
  "common stock offering",
  "preferred stock offering",
  "convertible notes",
  "convertible debt",
  "warrant",
  "warrants",
  "exercise of warrants",
  "capital raise",
  "financing",
  "funding",

  // BUYBACK / SHARE REPURCHASE
  "share repurchase",
  "share repurchases",
  "stock repurchase",
  "stock repurchases",
  "share buyback",
  "share buybacks",
  "stock buyback",
  "stock buybacks",
  "repurchase program",
  "repurchase agreement",
  "buyback program",
  "repurchase authorization",
  "share repurchase program",

  // CONTRACTS / ORDERS / CUSTOMERS
  "contract",
  "new contract",
  "major contract",
  "government contract",
  "defense contract",
  "multi-year contract",
  "long-term contract",
  "purchase order",
  "purchase orders",
  "order agreement",
  "new order",
  "large order",
  "customer agreement",
  "commercial agreement",
  "supply agreement",
  "supply contract",
  "licensing agreement",
  "license agreement",

  // PARTNERSHIP / COLLABORATION
  "partnership",
  "strategic partnership",
  "strategic agreement",
  "collaboration",
  "strategic collaboration",
  "joint venture",
  "jv agreement",
  "commercial partnership",
  "technology partnership",
  "research collaboration",

  // ACQUISITION / MERGER
  "acquisition",
  "acquires",
  "acquired",
  "to acquire",
  "acquisition agreement",
  "merger",
  "merger agreement",
  "merger deal",
  "business combination",
  "takeover",

  // COMPANY INVESTMENT / EXPANSION
  "capital investment",
  "company investment",
  "investment in",
  "invests in",
  "invested in",
  "investment agreement",
  "strategic investment",
  "infrastructure investment",
  "infrastructure project",
  "infrastructure expansion",
  "facility investment",
  "new facility",
  "new plant",
  "manufacturing facility",
  "manufacturing expansion",
  "production expansion",
  "production capacity",
  "capacity expansion",
  "expansion project",
  "expands operations",
  "expansion plans",

  // PRODUCT / TECHNOLOGY
  "product launch",
  "launches product",
  "new product",
  "new technology",
  "technology launch",
  "commercial launch",
  "commercialization",
  "commercializes",
  "production begins",
  "production started",
  "production agreement",

  // CORPORATE ACTIONS
  "strategic review",
  "strategic alternatives",
  "restructuring",
  "reorganization",
  "spin-off",
  "spinoff",
  "divestiture",
  "asset sale",
  "sale of assets",
  "special dividend",
  "dividend increase",
  "dividend declaration",

  // LEGAL / MATERIAL COMPANY EVENTS
  "settlement",
  "lawsuit settlement",
  "legal settlement",
  "court ruling",
  "court decision",
  "patent granted",
  "patent approval",
  "patent issued",
  "intellectual property",

  // MANAGEMENT / CORPORATE
  "ceo appointed",
  "new ceo",
  "chief executive officer",
  "executive appointment",
  "board appointment",
  "management change",
  "resignation of ceo",
  "ceo resignation",

  // IMPORTANT MATERIAL EVENTS
  "material agreement",
  "material event",
  "definitive agreement",
  "letter of intent",
  "memorandum of understanding",
  "mou",
  "definitive merger",
  "strategic transaction",

  // LISTING / EXCHANGE
  "nasdaq compliance",
  "nasdaq listing",
  "nasdaq delisting",
  "listing compliance",
  "minimum bid price",
  "reverse split",
  "stock split",

  // SEC / FILINGS
  "sec filing",
  "sec",
  "8-k",
  "10-q",
  "10-k",
  "13f",
  "form 8-k",

  // ANALYST / RATING - COMPANY SPECIFIC
  "analyst upgrade",
  "analyst downgrade",
  "price target raised",
  "price target lowered",
  "price target increased",
  "price target decreased",

  // MAJOR INVESTOR / OWNERSHIP
  "institutional investment",
  "institutional investor",
  "stake",
  "takes stake",
  "acquires stake",
  "ownership stake",
  "beneficial ownership"

];


/* =========================================================
   FİLTRE FONKSİYONU
   ========================================================= */

function passesNewsFilter(item) {

  const text = `
    ${item.title || ""}
    ${item.description || ""}
  `.toLowerCase();

  for (const term of NEWS_FILTER_TERMS) {
    if (text.includes(term.toLowerCase())) {
      return true;
    }
  }

  return false;
}


/* =========================================================
   METİN TEMİZLEME
   ========================================================= */

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


/* =========================================================
   HTML ESCAPE
   ========================================================= */

function escapeHtml(text) {
  return String(text || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}


/* =========================================================
   RSS ITEM OKUMA
   ========================================================= */

function getItems(xml) {

  const items = [];

  const matches =
    xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

  for (const item of matches) {

    const titleMatch =
      item.match(/<title>([\s\S]*?)<\/title>/i);

    const linkMatch =
      item.match(/<link>([\s\S]*?)<\/link>/i);

    const dateMatch =
      item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const sourceMatch =
      item.match(/<source[^>]*>([\s\S]*?)<\/source>/i);

    const descriptionMatch =
      item.match(/<description>([\s\S]*?)<\/description>/i);

    if (!titleMatch || !linkMatch) continue;

    const title = cleanText(titleMatch[1]);

    const link = cleanText(linkMatch[1]);

    const pubDate =
      dateMatch
        ? cleanText(dateMatch[1])
        : "";

    const source =
      sourceMatch
        ? cleanText(sourceMatch[1])
        : "";

    const description =
      descriptionMatch
        ? cleanText(descriptionMatch[1])
        : "";

    if (!title || !link) continue;

    items.push({
      title,
      link,
      pubDate,
      source,
      description
    });
  }

  return items;
}


/* =========================================================
   SHA256 KEY
   ========================================================= */

async function makeKey(link) {

  const data =
    new TextEncoder().encode(link);

  const hash =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );

  return Array
    .from(new Uint8Array(hash))
    .map(
      b => b.toString(16).padStart(2, "0")
    )
    .join("");
}


/* =========================================================
   TÜRKÇE ÇEVİRİ
   ========================================================= */

async function translateToTurkish(text) {

  try {

    const url =
      "https://translate.googleapis.com/translate_a/single" +
      "?client=gtx" +
      "&sl=en" +
      "&tl=tr" +
      "&dt=t" +
      "&q=" +
      encodeURIComponent(text);

    const response =
      await fetch(url);

    if (!response.ok) {
      return text;
    }

    const data =
      await response.json();

    if (!data || !data[0]) {
      return text;
    }

    let translated = "";

    for (const part of data[0]) {

      if (part && part[0]) {
        translated += part[0];
      }

    }

    return translated.trim() || text;

  } catch (error) {

    console.log(
      "Çeviri hatası:",
      error.message
    );

    return text;
  }
}


/* =========================================================
   HABERLERİ ÇEK
   ========================================================= */

async function getNews() {

  const allNews = [];

  for (const feed of FEEDS) {

    try {

      const response =
        await fetch(feed.url, {
          headers: {
            "User-Agent":
              "Nasdaq-News-Bot/1.0"
          }
        });

      if (!response.ok) {
        continue;
      }

      const xml =
        await response.text();

      const items =
        getItems(xml);

      for (const item of items) {

        allNews.push({
          ...item,
          feedSource: feed.name
        });

      }

    } catch (error) {

      console.log(
        `Feed hatası: ${feed.name}`,
        error.message
      );

    }

  }

  return allNews;
}


/* =========================================================
   TELEGRAM'A HABER GÖNDER
   ========================================================= */

async function sendNews(env) {

  const news =
    await getNews();

  if (!news.length) {

    return {
      sent: 0,
      message:
        "Yeni haber bulunamadı."
    };

  }


  /* =======================================================
     1. AYNI LİNKLERİ TEMİZLE
     ======================================================= */

  const unique = [];

  const seen =
    new Set();

  for (const item of news) {

    if (seen.has(item.link)) {
      continue;
    }

    seen.add(item.link);

    unique.push(item);
  }


  /* =======================================================
     2. TARİHE GÖRE SIRALA
     ======================================================= */

  unique.sort((a, b) => {

    const da =
      a.pubDate
        ? new Date(a.pubDate).getTime()
        : 0;

    const db =
      b.pubDate
        ? new Date(b.pubDate).getTime()
        : 0;

    return db - da;

  });


  /* =======================================================
     3. KRİTİK NOKTA:
        FİLTRE KV'DEN ÖNCE ÇALIŞIYOR
     ======================================================= */

  const filtered = [];

  for (const item of unique) {

    if (!passesNewsFilter(item)) {

      console.log(
        "FİLTRE DIŞI:",
        item.title
      );

      continue;
    }

    filtered.push(item);
  }


  /* =======================================================
     FİLTRELENMİŞ HABER YOK
     ======================================================= */

  if (!filtered.length) {

    return {
      sent: 0,
      message:
        "Filtreyi geçen yeni haber bulunamadı."
    };

  }


  /* =======================================================
     4. EN FAZLA 10 HABER
     ======================================================= */

  let sent = 0;

  for (const item of filtered) {

    if (sent >= 10) {
      break;
    }


    /* =====================================================
       5. KV KONTROLÜ
       ===================================================== */

    const key =
      `news:${await makeKey(item.link)}`;

    const alreadySent =
      await env.NEWS_SENT.get(key);

    if (alreadySent) {
      continue;
    }


    /* =====================================================
       6. TÜRKÇEYE ÇEVİR
       ===================================================== */

    const translatedTitle =
      await translateToTurkish(
        item.title
      );

    const title =
      escapeHtml(
        translatedTitle
      );

    const source =
      escapeHtml(
        item.source ||
        item.feedSource
      );


    /* =====================================================
       7. TELEGRAM MESAJI
       ===================================================== */

    const message =
      `📰 <b>NASDAQ / ABD PİYASALARI</b>\n\n` +
      `<b>${title}</b>\n\n` +
      `Kaynak: ${source}\n` +
      `<a href="${item.link}">🔗 Haberi Aç</a>`;


    /* =====================================================
       8. TELEGRAM'A GÖNDER
       ===================================================== */

    const response =
      await fetch(
        `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json"
          },

          body: JSON.stringify({
            chat_id:
              env.TELEGRAM_CHAT_ID,

            text:
              message,

            parse_mode:
              "HTML",

            disable_web_page_preview:
              false
          })
        }
      );


    /* =====================================================
       TELEGRAM HATASI
       ===================================================== */

    if (!response.ok) {

      console.log(
        "Telegram hatası:",
        await response.text()
      );

      continue;
    }


    /* =====================================================
       9. SADECE BAŞARILI GÖNDERİMDEN SONRA KV'YE YAZ
       ===================================================== */

    await env.NEWS_SENT.put(
      key,
      "1",
      {
        expirationTtl:
          86400
      }
    );

    sent++;

  }


  /* =======================================================
     SONUÇ
     ======================================================= */

  return {

    sent,

    message:
      `${sent} yeni filtrelenmiş haber gönderildi.`

  };

}


/* =========================================================
   WORKER
   ========================================================= */

export default {

  async fetch(request, env) {

    const url =
      new URL(request.url);


    /* =====================================================
       MANUEL TEST
       ===================================================== */

    if (url.pathname === "/test") {

      try {

        const result =
          await sendNews(env);

        return new Response(

          JSON.stringify({
            ok: true,
            ...result
          }),

          {
            headers: {
              "Content-Type":
                "application/json"
            }
          }

        );

      } catch (error) {

        return new Response(

          JSON.stringify({
            ok: false,
            error:
              error.message
          }),

          {
            status: 500,

            headers: {
              "Content-Type":
                "application/json"
            }
          }

        );

      }

    }


    return new Response(
      "Nasdaq Haber Bot aktif."
    );

  },


  async scheduled(event, env, ctx) {

    ctx.waitUntil(

      sendNews(env).catch(error => {

        console.log(
          "Scheduled hata:",
          error.message
        );

      })

    );

  }

};
