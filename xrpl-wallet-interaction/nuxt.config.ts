export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    XUMM_API_KEY: process.env.XUMM_API_KEY,
    
  },

  app: {
    head: {
      script: [
        {
          src: 'https://xumm.app/assets/cdn/xumm.min.js',
          type: 'text/javascript',
          async: true,
        },
      ],
    },
  },
});
