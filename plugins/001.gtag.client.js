import {
  defineNuxtPlugin,
  useHead,
  useRuntimeConfig,
} from '#imports'

export default defineNuxtPlugin({
  parallel: true,
  setup () {
    // Should only enable Google Tag in production.
    if (import.meta.env.MODE !== 'production') {
      return
    }

    const runtimeConfig = useRuntimeConfig()
    const gtagId = runtimeConfig.public.GTAG_ID

    initializeGtag({
      gtagId,
    })

    useHead({
      // Preload to ensure gtag.js is loaded as soon as possible.
      link: [
        {
          rel: 'preload',
          as: 'script',
          href: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
        },
      ],
      script: [
        {
          src: `https://www.googletagmanager.com/gtag/js?id=${gtagId}`,
          async: true,
        },
      ],
    })
  },
})

/**
 * Initialize the Google tag.
 *
 * @param {{
 *   gtagId: string
 * }} params - Parameters.
 * @returns {void}
 */
function initializeGtag ({
  gtagId,
}) {
  window.dataLayer ||= []

  gtag('js', new Date())
  gtag('config', gtagId)
}

/**
 * Function provided by Google Tag.
 */
function gtag () {
  // Rest parameters does not work. Must use `arguments`.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments)
}
