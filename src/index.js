
export default {
  async fetch(request, env) {
    return new Response("Nasdaq Haber Bot aktif.");
  },

  async scheduled(controller, env, ctx) {
    console.log("Cron çalıştı.");
  }
};
