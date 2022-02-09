export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'boardgame-helper',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    // CSS file in the project
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/vuex-persist', ssr: false }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/pwa',
    '@nuxtjs/svg',
    // color theme
    '@nuxtjs/color-mode',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ['@nuxtjs/apollo', '@nuxtjs/proxy'],

  apollo: {
    tokenName: 'nuxt-apollo', // specify token name
    cookieAttributes: {
      expires: 7, // optional, default: 7 (days)
    },
    defaultOptions: {
      $query: {
        fetchPolicy: 'network-only', // 'no-cache'
        errorPolicy: 'all',
      },
    },
    clientConfigs: {
      default: '~/plugins/apollo-config.js',
    },
  },

  proxy: {
    // need proxy if this project is acting as Frontend and Backend at the same time
    [process.env.WEB_PROXY ?? '/graphql']: process.env.API_URL ?? 'http://localhost:5000', // '/graphql': 'http://localhost:5000',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
  },

  // https://typescript.nuxtjs.org/guide/lint
  typescript: {
    typeCheck: {
      eslint: {
        files: './**/*.{ts,js,vue}',
      },
    },
  },

  serverMiddleware: ['~/server-middleware/server.ts'],

  pwa: {
    icon: {
      fileName: 'icon.png',
    },
    manifest: {
      name: 'Boardgames Helper',
      short_name: 'BG Helper',
      start_url: '/',
      background_color: '#ff0303',
      theme_color: '#000000',
    },
    meta: {
      appleStatusBarStyle: 'black',
    },
  },

  watchers: {
    webpack: {
      ignored: [/docker-cache/, /.idea/, /.git/],
    },
  },

  colorMode: {
    preference: 'dark', // default value of $colorMode.preference
    fallback: 'dark', // fallback value if not system preference found
    classSuffix: '', // removing -mode suffix for '@nuxtjs/color-mode'
    cookie: {
      key: 'nuxt-color-mode', // default
    },
  },
}
