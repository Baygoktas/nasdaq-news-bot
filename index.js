/* =========================================================
   NASDAQ NEWS BOT
   D1 + MULTI SOURCE + FILTER + TURKISH + TELEGRAM
   ========================================================= */


/* =========================================================
   HABER KAYNAKLARI
   ========================================================= */

const FEEDS = [
  {
    name: "Reuters",
    url: "https://news.google.com/rss/search?q=site%3Areuters.com+stocks+companies+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "CNBC",
    url: "https://www.cnbc.com/id/100003114/device/rss/rss.html"
  },
  {
    name: "MarketWatch",
    url: "https://news.google.com/rss/search?q=site%3Amarketwatch.com+stocks+companies+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "Investing.com",
    url: "https://news.google.com/rss/search?q=site%3Ainvesting.com+stocks+companies+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "Yahoo Finance",
    url: "https://finance.yahoo.com/news/rssindex"
  },

  /* Şirket basın açıklamaları için ek kaynaklar */
  {
    name: "GlobeNewswire",
    url: "https://news.google.com/rss/search?q=site%3Aglobenewswire.com+NASDAQ+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "PR Newswire",
    url: "https://news.google.com/rss/search?q=site%3Aprnewswire.com+NASDAQ+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  },
  {
    name: "Business Wire",
    url: "https://news.google.com/rss/search?q=site%3Abusinesswire.com+NASDAQ+stocks+when%3A1d&hl=en-US&gl=US&ceid=US%3Aen"
  }
];


/* =========================================================
   HABER FİLTRELERİ
   ========================================================= */

const FILTER_TERMS = [

  /* FDA / REGULATORY */
  "fda",
  "fda approval",
  "fda approved",
  "fda clearance",
  "fda cleared",
  "regulatory approval",
  "regulatory clearance",
  "regulatory authorization",
  "regulatory decision",

  /* CLINICAL */
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
  "interim results",
  "interim data",
  "positive results",
  "positive data",
  "negative results",
  "patient enrollment",
  "first patient dosed",
  "patient dosed",
  "trial enrollment",

  /* BIOTECH / PHARMA */
  "drug candidate",
  "drug development",
  "drug approval",
  "new drug",
  "investigational",
  "therapeutic",
  "therapy",
  "treatment",
  "biologic",
  "commercialization",
  "bLA",
  "nda",
  "ind",
  "pdufa",

  /* EARNINGS */
  "earnings",
  "earnings results",
  "earnings report",
  "earnings release",
  "quarterly results",
  "quarterly earnings",
  "financial results",
  "earnings per share",
  "eps",
  "guidance",
  "financial guidance",
  "raises guidance",
  "lowers guidance",
  "full-year guidance",
  "outlook",
  "revenue",
  "profit",
  "net income",

  /* QUARTERS */
  "q1",
  "q2",
  "q3",
  "q4",
  "first quarter",
  "second quarter",
  "third quarter",
  "fourth quarter",

  /* DILUTION / OFFERING / FINANCING */
  "dilution",
  "dilutive",
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
  "capital raise",
  "capital raising",
  "financing",
  "funding",
  "convertible notes",
  "convertible debt",
  "securities purchase agreement",
  "warrant",
  "warrants",

  /* BUYBACK */
  "share repurchase",
  "share repurchases",
  "stock repurchase",
  "share buyback",
  "share buybacks",
  "stock buyback",
  "stock buybacks",
  "buyback program",
  "repurchase program",
  "repurchase authorization",

  /* CONTRACTS / ORDERS */
  "new contract",
  "major contract",
  "government contract",
  "defense contract",
  "multi-year contract",
  "long-term contract",
  "purchase order",
  "purchase orders",
  "new order",
  "large order",
  "customer agreement",
  "commercial agreement",
  "supply agreement",
  "supply contract",
  "licensing agreement",
  "license agreement",

  /* PARTNERSHIPS */
  "partnership",
  "strategic partnership",
  "strategic agreement",
  "collaboration",
  "strategic collaboration",
  "joint venture",
  "commercial partnership",
  "technology partnership",
  "research collaboration",

  /* ACQUISITION / MERGER */
  "acquisition",
  "acquires",
  "acquired",
  "to acquire",
  "acquisition agreement",
  "merger",
  "merger agreement",
  "business combination",
  "takeover",

  /* INVESTMENT / INFRASTRUCTURE */
  "strategic investment",
  "company investment",
  "investment in",
  "invests in",
  "invested in",
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
  "capital expenditure",
  "capital expenditures",
  "capex",

  /* PRODUCT / TECHNOLOGY */
  "product launch",
  "launches product",
  "new product",
  "new technology",
  "technology launch",
  "commercial launch",
  "production begins",
  "production started",
  "commercial launch",

  /* CORPORATE ACTIONS */
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

  /* LEGAL / IP */
  "settlement",
  "lawsuit settlement",
  "legal settlement",
  "court ruling",
  "court decision",
  "patent granted",
  "patent approval",
  "patent issued",
  "intellectual property",

  /* MANAGEMENT */
  "ceo appointed",
  "new ceo",
  "chief executive officer",
  "executive appointment",
  "board appointment",
  "management change",
  "ceo resignation",

  /* MATERIAL EVENTS */
  "material agreement",
  "material event",
  "definitive agreement",
  "letter of intent",
  "memorandum of understanding",
  "mou",

  /* NASDAQ */
  "nasdaq compliance",
  "nasdaq listing",
  "nasdaq delisting",
  "listing compliance",
  "minimum bid price",
  "reverse split",
  "stock split",

  /* SEC */
  "8-k",
  "10-q",
  "10-k",
  "13f",
  "sec filing",

  /* ANALYST */
  "analyst upgrade",
  "analyst downgrade",
  "price target raised",
  "price target lowered",
  "price target increased",
  "price target decreased",

  /* OWNERSHIP */
  "institutional investment",
  "institutional investor",
  "takes stake",
  "acquires stake",
  "ownership stake",
  "beneficial ownership"
];


/* =========================================================
   SADECE GENEL PİYASA HABERLERİNİ ELE
   ========================================================= */

const MARKET_ONLY_TERMS = [
  "s&p 500",
  "nasdaq composite",
  "dow jones",
  "wall street",
  "stock market",
  "market rally",
  "market selloff",
  "market volatility",
  "stocks rise",
  "stocks fall",
  "stocks rally",
  "stocks decline",
  "shares rise",
  "shares fall",
  "investors await",
  "market awaits",
  "fed rate",
  "interest rates",
  "inflation",
  "jobs report",
  "employment report",
  "economic data",
  "treasury yields",
  "bond yields"
];


/* =========================================================
   GÜÇLÜ ŞİRKET KATALİZÖRLERİ
   ========================================================= */

const STRONG_CATALYST_TERMS = [
  "fda",
  "phase 1",
  "phase 2",
  "phase 3",
  "clinical",
  "trial",
  "drug approval",
  "regulatory approval",
  "pdufa",
  "earnings",
  "eps",
  "revenue",
  "guidance",
  "dilution",
  "offering",
  "financing",
  "buyback",
  "repurchase",
  "acquisition",
  "merger",
  "contract",
  "purchase order",
  "partnership",
  "collaboration",
  "licensing",
  "strategic agreement",
  "new facility",
  "capacity expansion",
  "product launch",
  "infrastructure investment",
  "reverse split",
  "stock split",
  "nasdaq compliance",
  "nasdaq delisting",
  "patent",
  "strategic investment",
  "government contract",
  "defense contract"
];


/* =========================================================
   METİN TEMİZLEME
   ========================================================= */

function cleanText(text) {

  if (!text) {
    return "";
  }

  return String(text)
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => {

      try {
        return String.fromCharCode(
          Number(n)
        );
      } catch {
        return "";
      }

    })
    .replace(/\s+/g, " ")
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
   URL ESCAPE
   ========================================================= */

function escapeUrl(url) {

  return String(url || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;");
}


/* =========================================================
   HABER FİLTRESİ
   ========================================================= */

function passesFilter(item) {

  const title =
    String(item.title || "")
      .toLowerCase();

  const description =
    String(item.description || "")
      .toLowerCase();

  const text =
    `${title} ${description}`;


  /* En az bir önemli terim olmalı */

  const matchedTerm =
    FILTER_TERMS.find(term =>
      text.includes(
        term.toLowerCase()
      )
    );


  if (!matchedTerm) {

    console.log(
      "FİLTRE DIŞI:",
      item.title
    );

    return false;
  }


  /* Güçlü katalizör kontrolü */

  const hasStrongCatalyst =
    STRONG_CATALYST_TERMS.some(term =>
      text.includes(
        term.toLowerCase()
      )
    );


  /*
   * Başlık doğrudan genel piyasa haberi ise
   * ve güçlü şirket katalizörü yoksa alma.
   */

  const isMarketOnly =
    MARKET_ONLY_TERMS.some(term =>
      title.includes(term)
    );


  if (
    isMarketOnly &&
    !hasStrongCatalyst
  ) {

    console.log(
      "GENEL PİYASA HABERİ ELENDİ:",
      item.title
    );

    return false;
  }


  console.log(
    "FİLTREDEN GEÇTİ:",
    matchedTerm,
    "|",
    item.title
  );

  return true;
}


/* =========================================================
   RSS OKUMA
   ========================================================= */

function getItems(xml) {

  const items = [];

  const matches =
    xml.match(
      /<item>[\s\S]*?<\/item>/gi
    ) || [];


  for (const item of matches) {

    const titleMatch =
      item.match(
        /<title>([\s\S]*?)<\/title>/i
      );

    const linkMatch =
      item.match(
        /<link>([\s\S]*?)<\/link>/i
      );

    const dateMatch =
      item.match(
        /<pubDate>([\s\S]*?)<\/pubDate>/i
      );

    const sourceMatch =
      item.match(
        /<source[^>]*>([\s\S]*?)<\/source>/i
      );

    const descriptionMatch =
      item.match(
        /<description>([\s\S]*?)<\/description>/i
      );


    if (
      !titleMatch ||
      !linkMatch
    ) {
      continue;
    }


    const title =
      cleanText(
        titleMatch[1]
      );

    const link =
      cleanText(
        linkMatch[1]
      );

    const pubDate =
      dateMatch
        ? cleanText(
            dateMatch[1]
          )
        : "";

    const source =
      sourceMatch
        ? cleanText(
            sourceMatch[1]
          )
        : "";

    const description =
      descriptionMatch
        ? cleanText(
            descriptionMatch[1]
          )
        : "";


    if (
      !title ||
      !link
    ) {
      continue;
    }


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
   SHA256
   ========================================================= */

async function makeKey(link) {

  const data =
    new TextEncoder()
      .encode(link);

  const hash =
    await crypto.subtle.digest(
      "SHA-256",
      data
    );


  return Array
    .from(
      new Uint8Array(hash)
    )
    .map(
      b =>
        b.toString(16)
          .padStart(2, "0")
    )
    .join("");
}


/* =========================================================
   D1 TABLOSU
   ========================================================= */

async function initDatabase(env) {

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


/* =========================================================
   D1'DE HABER VAR MI?
   ========================================================= */

async function alreadySent(
  env,
  hash
) {

  const result =
    await env.NEWS_DB
      .prepare(`
        SELECT link_hash
        FROM news_sent
        WHERE link_hash = ?
        LIMIT 1
      `)
      .bind(hash)
      .first();

  return !!result;
}


/* =========================================================
   D1'E KAYDET
   ========================================================= */

async function saveSentNews(
  env,
  hash,
  item
) {

  await env.NEWS_DB
    .prepare(`
      INSERT OR IGNORE INTO news_sent
      (
        link_hash,
        link,
        title,
        source,
        sent_at
      )
      VALUES (?, ?, ?, ?, ?)
    `)
    .bind(
      hash,
      item.link,
      item.title,
      item.source ||
        item.feedSource ||
        "",
      Date.now()
    )
    .run();
}


/* =========================================================
   ESKİ KAYITLARI TEMİZLE
   7 GÜNDEN ESKİ HABERLERİ SİL
   ========================================================= */

async function cleanupDatabase(env) {

  const sevenDays =
    Date.now() -
    (
      7 *
      24 *
      60 *
      60 *
      1000
    );


  await env.NEWS_DB
    .prepare(`
      DELETE FROM news_sent
      WHERE sent_at < ?
    `)
    .bind(sevenDays)
    .run();
}


/* =========================================================
   TÜRKÇE ÇEVİRİ
   ========================================================= */

async function translateToTurkish(
  text
) {

  if (!text) {
    return "";
  }


  try {

    const url =
      "https://translate.googleapis.com/translate_a/single" +
      "?client=gtx" +
      "&sl=auto" +
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


    if (
      !data ||
      !data[0]
    ) {
      return text;
    }


    let translated = "";


    for (
      const part of data[0]
    ) {

      if (
        part &&
        part[0]
      ) {

        translated +=
          part[0];
      }
    }


    return (
      translated.trim() ||
      text
    );

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


  for (
    const feed of FEEDS
  ) {

    try {

      const response =
        await fetch(
          feed.url,
          {
            headers: {
              "User-Agent":
                "Nasdaq-News-Bot/1.0"
            }
          }
        );


      if (!response.ok) {

        console.log(
          `Feed HTTP hatası: ${feed.name}`,
          response.status
        );

        continue;
      }


      const xml =
        await response.text();


      const items =
        getItems(xml);


      for (
        const item of items
      ) {

        allNews.push({

          ...item,

          feedSource:
            feed.name

        });
      }


      console.log(
        `${feed.name}: ${items.length} haber`
      );

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
   TELEGRAM
   ========================================================= */

async function sendTelegram(
  env,
  message
) {

  const response =
    await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {

        method:
          "POST",

        headers: {

          "Content-Type":
            "application/json"

        },

        body:
          JSON.stringify({

            chat_id:
              env.TELEGRAM_CHAT_ID,

            text:
              message,

            parse_mode:
              "HTML",

            disable_web_page_preview:
              true

          })

      }
    );


  if (!response.ok) {

    const errorText =
      await response.text();


    console.log(
      "Telegram hatası:",
      errorText
    );


    return false;
  }


  return true;
}


/* =========================================================
   ANA HABER SİSTEMİ
   ========================================================= */

async function sendNews(env) {

  /*
   * D1 hazırla
   */

  await initDatabase(env);


  /*
   * Eski kayıtları temizle
   */

  await cleanupDatabase(env);


  /*
   * Haberleri çek
   */

  const news =
    await getNews();


  if (!news.length) {

    return {

      sent: 0,

      filtered: 0,

      message:
        "Yeni haber bulunamadı."

    };
  }


  /* =======================================================
     AYNI HABERLERİ TEKLE
     ======================================================= */

  const unique = [];

  const seen =
    new Set();


  for (
    const item of news
  ) {

    if (
      seen.has(item.link)
    ) {
      continue;
    }


    seen.add(
      item.link
    );


    unique.push(item);
  }


  /* =======================================================
     YENİDEN ESKİYE SIRALA
     ======================================================= */

  unique.sort(
    (a, b) => {

      const da =
        a.pubDate
          ? new Date(
              a.pubDate
            ).getTime()
          : 0;


      const db =
        b.pubDate
          ? new Date(
              b.pubDate
            ).getTime()
          : 0;


      return db - da;

    }
  );


  /* =======================================================
     KRİTİK NOKTA:

     FİLTRE ÖNCE
     D1 SONRA

     Önemsiz haber D1'E GİRMEZ.
     ======================================================= */

  const filtered =
    unique.filter(
      item =>
        passesFilter(item)
    );


  console.log(
    "Toplam haber:",
    unique.length
  );


  console.log(
    "Filtreyi geçen:",
    filtered.length
  );


  if (
    !filtered.length
  ) {

    return {

      sent: 0,

      filtered: 0,

      message:
        "Filtreyi geçen haber bulunamadı."

    };
  }


  /* =======================================================
     MAKSİMUM 10 HABER
     ======================================================= */

  let sent = 0;


  for (
    const item of filtered
  ) {

    if (
      sent >= 10
    ) {
      break;
    }


    /* =====================================================
       D1 KONTROLÜ
       ===================================================== */

    const hash =
      await makeKey(
        i
