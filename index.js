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
  }
];

/* =========================================================
   HABER FİLTRESİ
   ========================================================= */

const FILTER_TERMS = [

  // FDA / REGULATORY
  "fda",
  "fda approval",
  "fda approved",
  "fda clearance",
  "fda cleared",
  "regulatory approval",
  "regulatory clearance",
  "regulatory authorization",

  // CLINICAL
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
  "patient enrollment",
  "first patient dosed",
  "patient dosed",

  // BIOTECH / PHARMA
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

  // EARNINGS
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

  // QUARTERS
  "q1",
  "q2",
  "q3",
  "q4",
  "first quarter",
  "second quarter",
  "third quarter",
  "fourth quarter",

  // DILUTION / OFFERING / FINANCING
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

  // BUYBACK
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

  // CONTRACTS / ORDERS
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

  // PARTNERSHIPS
  "partnership",
  "strategic partnership",
  "strategic agreement",
  "collaboration",
  "strategic collaboration",
  "joint venture",
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
  "business combination",
  "takeover",

  // INVESTMENT / EXPANSION
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

  // PRODUCT / TECHNOLOGY
  "product launch",
  "launches product",
  "new product",
  "new technology",
  "technology launch",
  "commercial launch",
  "production begins",
  "production started",
  "commercial launch",

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

  // LEGAL / IP
  "settlement",
  "lawsuit settlement",
  "legal settlement",
  "court ruling",
  "court decision",
  "patent granted",
  "patent approval",
  "patent issued",
  "intellectual property",

  // MANAGEMENT
  "ceo appointed",
  "new ceo",
  "chief executive officer",
  "executive appointment",
  "board appointment",
  "management change",
  "ceo resignation",

  // MATERIAL EVENTS
  "material agreement",
  "material event",
  "definitive agreement",
  "letter of intent",
  "memorandum of understanding",
  "mou",

  // NASDAQ / LISTING
  "nasdaq compliance",
  "nasdaq listing",
  "nasdaq delisting",
  "listing compliance",
  "minimum bid price",
  "reverse split",
  "stock split",

  // SEC
  "8-k",
  "10-q",
  "10-k",
  "13f",
  "sec filing",

  // ANALYST
  "analyst upgrade",
  "analyst downgrade",
  "price target raised",
  "price target lowered",
  "price target increased",
  "price target decreased",

  // OWNERSHIP
  "institutional investment",
  "institutional investor",
  "takes stake",
  "acquires stake",
  "ownership stake",
  "beneficial ownership"
];


/* =========================================================
   GENEL PİYASA İÇERİĞİ ENGELLEYİCİLERİ
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
   METİN TEMİZLEME
   ========================================================= */

function cleanText(text) {
  if (!text) return "";

  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&#x27;/gi, "'")
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
   HABER FİLTRESİ
   ========================================================= */

function passesFilter(item) {

  const title =
    String(item.title || "").toLowerCase();

  const description =
    String(item.description || "").toLowerCase();

  const text =
    `${title} ${description}`;

  /* Önce önemli terim aranır */
  const matchedTerm =
    FILTER_TERMS.find(term =>
      text.includes(term.toLowerCase())
    );

  if (!matchedTerm) {
    return false;
  }

  /*
   * Sadece genel piyasa haberlerinde
   * şirket-spesifik katalizör yoksa ele.
   *
   * Ancak FDA, Phase, clinical, offering,
   * buyback, acquisition gibi güçlü terimler
   * varsa kabul et.
   */

  const strongCatalystTerms = [
    "fda",
    "phase 1",
    "phase 2",
    "phase 3",
    "clinical",
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
    "regulatory approval",
    "reverse split",
    "stock split",
    "nasdaq compliance",
    "nasdaq delisting"
  ];

  const hasStrongCatalyst =
    strongCatalystTerms.some(term =>
      text.includes(term)
    );

  const isMarketOnly =
    MARKET_ONLY_TERMS.some(term =>
      title.includes(term)
    );

  if (isMarketOnly && !hasStrongCatalyst) {
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
    xml.match(/<item>[\s\S]*?<\/item>/gi) || [];

  for (const item of matches) {

    const titleMatch =
      item.match(/<title>([\s\S]*?)<\/title>/i);

    const linkMatch =
      item.match(/<link>([\s\S]*?)<\/link>/i);

    const dateMatch =
      item.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);

    const sourceMatch =
      item.match(
        /<source[^>]*>([\s\S]*?)<\/source>/i
      );

    const descriptionMatch =
      item.match(
        /<description>([\s\S]*?)<\/description>/i
      );

    if (!titleMatch || !linkMatch) {
      continue;
    }

    const title =
      cleanText(titleMatch[1]);

    const link =
      cleanText(linkMatch[1]);

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

    if (!title || !link) {
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

          /*
           * ÖNEMLİ:
           * Yahoo/Telegram İngilizce önizlemesi
           * artık çıkmayacak.
           */
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

  const news =
    await getNews();

  if (!news.length) {

    return {
      sent: 0,
      message:
        "Yeni haber bulunamadı."
    };
  }


  /* -------------------------------------------------------
     AYNI LINKLERİ TEKLE
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     YENİDEN ESKİYE SIRALA
     ------------------------------------------------------- */

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


  /* -------------------------------------------------------
     KRİTİK:
     KV'YE GİRMEDEN ÖNCE FİLTRE
     ------------------------------------------------------- */

  const filtered =
    unique.filter(
      item => passesFilter(item)
    );


  console.log(
    "Toplam haber:",
    unique.length
  );

  console.log(
    "Filtreyi geçen:",
    filtered.length
  );


  if (!filtered.length) {

    return {
      sent: 0,
      message:
        "Filtreyi geçen haber bulunamadı."
    };
  }


  /* -------------------------------------------------------
     MAKSİMUM 10
     ------------------------------------------------------- */

  let sent = 0;

  for (const item of filtered) {

    if (sent >= 10) {
      break;
    }


    /* -----------------------------------------------------
       KV KONTROLÜ
       ----------------------------------------------------- */

    const key =
      `news:${await makeKey(item.link)}`;

    const alreadySent =
      await env.NEWS_SENT.get(key);

    if (alreadySent) {
      continue;
    }


    /* -----------------------------------------------------
       BAŞLIK ÇEVİR
       ----------------------------------------------------- */

    const translatedTitle =
      await translateToTurkish(
        item.title
      );


    /* -----------------------------------------------------
       AÇIKLAMA ÇEVİR
       ----------------------------------------------------- */

    let translatedDescription = "";

    if (item.description) {

      translatedDescription =
        await translateToTurkish(
          item.description
        );
    }


    /* -----------------------------------------------------
       AÇIKLAMA UZUNLUĞU
       ----------------------------------------------------- */

    if (
      translatedDescription.length > 700
    ) {

      translatedDescription =
        translatedDescription
          .slice(0, 700)
          .trim() +
        "...";
    }


    /* -----------------------------------------------------
       HTML TEMİZLE
       ----------------------------------------------------- */

    const title =
      escapeHtml(
        translatedTitle
      );

    const description =
      escapeHtml(
        translatedDescription
      );

    const source =
      escapeHtml(
        item.source ||
        item.feedSource
      );


    /* -----------------------------------------------------
       TELEGRAM MESAJI
       ----------------------------------------------------- */

    let message =
      `📰 <b>NASDAQ / ABD PİYASALARI</b>\n\n` +
      `<b>${title}</b>\n\n`;

    if (description) {

      message +=
        `${description}\n\n`;
    }

    message +=
      `📌 Kaynak: ${source}\n\n` +
      `<a href="${item.link}">🔗 Haberi Aç</a>`;


    /* -----------------------------------------------------
       TELEGRAM'A GÖNDER
       ----------------------------------------------------- */

    const success =
      await sendTelegram(
        env,
        message
      );

    if (!success) {
      continue;
    }


    /* -----------------------------------------------------
       SADECE BAŞARILI GÖNDERİMDEN SONRA KV
       ----------------------------------------------------- */

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


  return {

    sent,

    filtered:
      filtered.length,

    message:
      `${sent} filtrelenmiş haber gönderildi.`

  };
}


/* =========================================================
   WORKER
   ========================================================= */

export default {

  async fetch(request, env) {

    const url =
      new URL(request.url);


    /* -----------------------------------------------------
       TEST
       ----------------------------------------------------- */

    if (
      url.pathname === "/test"
    ) {

      try {

        const result =
          await sendNews(env);

        return new Response(

          JSON.stringify(
            {
              ok: true,
              ...result
            },
            null,
            2
          ),

          {
            headers: {
              "Content-Type":
                "application/json"
            }
          }
        );

      } catch (error) {

        return new Response(

          JSON.stringify(
            {
              ok: false,
              error:
                error.message
            },
            null,
            2
          ),

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


  /* -------------------------------------------------------
     CRON
     ------------------------------------------------------- */

  async scheduled(
    event,
    env,
    ctx
  ) {

    ctx.waitUntil(

      sendNews(env)
        .catch(error => {

          console.log(
            "Scheduled hata:",
            error.message
          );

        })

    );
  }
};
