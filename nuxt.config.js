import {
  defineNuxtConfig,
} from 'nuxt/config'

import nodePolyfills from 'vite-plugin-node-stdlib-browser'

import furoEnv from './app/globals/furo-env'

// Reference: https://nuxt.com/docs/api/nuxt-config.
export default defineNuxtConfig({
  // https://nuxt.com/docs/api/nuxt-config#compatibilitydate
  // NOTE: Please keep `compatibilityDate` up to date with each release. The format is `yyyy-mm-dd`.
  compatibilityDate: '2025-01-16',

  // Nuxt App configuration: https://nuxt.com/docs/api/nuxt-config#app.
  app: {
    head: {
      title: '⋯', // Loading title, can not be empty.
      script: [
        {
          innerHTML: `
          // define global variables
          window.exports = {};
          window.module = { exports: window.exports };

          // require polyfill
          window.require = function(moduleName) {
            console.log('Require called for:', moduleName);
            // crypto-browserify related modules
            if (moduleName === 'browserify-sign/algos') return {};
            if (moduleName === 'pbkdf2') return { pbkdf2: () => {}, pbkdf2Sync: () => {} };
            if (moduleName === 'browserify-cipher') return {};
          };

          console.log('Global polyfills including require initialized');
          `,
          type: 'text/javascript',
        },
      ],
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg',
        },
      ],
    },
  },

  vite: {
    plugins: [
      // @ts-expect-error - Upstream type error.
      nodePolyfills(),
    ],
  },

  // Global CSS: https://nuxt.com/docs/api/nuxt-config#css.
  css: [
    '~/assets/css/fonts.css',

    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0000.furo.css',
    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0010.variables-palette-color-scale.css',
    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0020.variables-z-index.css',

    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0100.reset.css',

    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0200.base.css',
    '~/assets/css/0210.base.css',

    '~/node_modules/@openreachtech/furo-nuxt/lib/assets/css/0300.gimmick.css',

    '~/assets/css/variables-component-default.css',
    '~/assets/css/variables.css',
    '~/assets/css/main.css',
  ],

  // Plugins to run before rendering page: https://nuxt.com/docs/api/nuxt-config#plugins-1.
  // NOTE: Plugins at the top level of `~/plugins/` directory are auto-registered. You will only need
  // to use this if you have nested files. E.g. `~/plugins/bar/foo.ts` <- This won't be auto-registered.
  plugins: [
  ],

  // Configure Nuxt component auto-registration: https://nuxt.com/docs/api/nuxt-config#components.
  components: {
    dirs: [],
  },

  // Disable auto-import: https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports.
  imports: {
    autoImport: false,
  },

  // Modules: https://nuxt.com/docs/api/nuxt-config#modules-1.
  modules: [
    '@nuxt/icon',
  ],

  // Shared build configuration: https://nuxt.com/docs/api/nuxt-config#build.
  build: {
    transpile: [
    ],
  },

  // Runtime configuration: https://nuxt.com/docs/api/nuxt-config#runtimeconfig
  runtimeConfig: {
    // on server
    ...furoEnv,

    // on client
    public: {
      ...furoEnv,
    },
  },

  // To enable Server-Side Rendering or not: https://nuxt.com/docs/api/nuxt-config#ssr
  ssr: false,

  // Restart dev server when changed: https://nuxt.com/docs/api/nuxt-config#watch
  watch: [
    '.furo-env.development',
  ],
})
