export default {
  async fetch(request, env) {
    return new Response(
      JSON.stringify({
        worker: "OK",
        token: !!env.TELEGRAM_BOT_TOKEN,
        chat: !!env.TELEGRAM_CHAT_ID
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }
};
