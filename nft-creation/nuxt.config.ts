export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    XRPL_SECRET: process.env.XRPL_SECRET, 

    public: {
      XRPL_NETWORK: process.env.XRPL_NETWORK 
    }
  }
});
