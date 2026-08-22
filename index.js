const RSS_URL = "https://www.investing.com/rss/news_25.rss";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/test") {
      await sendTelegram(
        env,
        "#TEST\n\nNasdaq Haber Bot bağlantı testi başarılı."
      );

      return new Response("Telegram testi başarılı.");
    }

    if (url.pathname === "/news") {
      const result = await processNews(env);
      return new Response(result);
    }

    return new Response("Nasdaq Haber Bot aktif.");
  },

  async scheduled(event, env, ctx) {
    ctx.waitUntil(processNews(env));
  }
};

async function processNews(env) {
  try {
    const response = await fetch(RSS_URL, {
      headers: {
        "User-Agent": "Mozilla/5.0 NasdaqNewsBot/1.0"
      }
    });

    if (!response.ok) {
      throw new Error("RSS alınamadı: " + response.status);
    }

    const xml = await response.text();
    const items = parseRSS(xml);

    if (items.length === 0) {
      return "Yeni haber bulunamadı.";
    }

    let sent = 0;

    for (const item of items.slice(0, 5)) {
      const message =
        `<b>${escapeHtml(item.title)}</b>\n\n` +
        `<a href="${escapeHtml(item.link)}">Kaynak: ${escapeHtml(item.source)}</a>`;

      await sendTelegram(env, message);

      sent++;
    }

    return `${sent} haber gönderildi.`;

  } catch (error) {
    console.error("HATA:", error);
    return "Hata: " + error.message;
  }
}

function parseRSS(xml) {
  const items = [];

  const matches =
    xml.match(/<item[\s\S]*?<\/item>/gi) || [];

  for (const item of matches) {
    const title = getTag(item, "title");
    const link = getTag(item, "link");

    if (!title || !link) continue;

    items.push({
      title: cleanText(title),
      link: cleanText(link),
      source: "Investing.com"
    });
  }

  return items;
}

function getTag(text, tag) {
  const regex = new RegExp(
    `<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`,
    "i"
  );

  const match = text.match(regex);

  return match ? match[1] : "";
}

function cleanText(text) {
  return text
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

async function sendTelegram(env, message) {
  const token = env.TELEGRAM_BOT_TOKEN;
  const chatId = env.TELEGRAM_CHAT_ID;

  if (!token) {
    throw new Error("TELEGRAM_BOT_TOKEN bulunamadı.");
  }

  if (!chatId) {
    throw new Error("TELEGRAM_CHAT_ID bulunamadı.");
  }

  const url =
    `https://api.telegram.org/bot${token}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: "HTML",
      disable_web_page_preview: false
    })
  });

  const data = await response.json();

  if (!response.ok || !data.ok) {
    throw new Error(
      "Telegram hatası: " + JSON.stringify(data)
    );
  }
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
