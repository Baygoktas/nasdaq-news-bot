export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/test") {
      try {
        const response = await fetch(
          `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              chat_id: env.TELEGRAM_CHAT_ID,
              text: "Nasdaq Haber Bot Telegram bağlantı testi başarılı."
            })
          }
        );

        const result = await response.text();

        return new Response(result, {
          status: response.status,
          headers: {
            "Content-Type": "application/json"
          }
        });

      } catch (error) {
        return new Response(
          JSON.stringify({
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
  }
};
