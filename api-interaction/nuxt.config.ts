export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    openAiKey: process.env.OPENAI_API_KEY,
  },
});
