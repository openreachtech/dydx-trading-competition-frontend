import {
  defineNuxtPlugin,
} from '#imports'

import markdownit from 'markdown-it'

export default defineNuxtPlugin({
  setup (nuxtApp) {
    const markdownItInstance = createMarkdownItInstance()

    return {
      provide: {
        markdown: markdownItInstance,
      },
    }
  },
})

/**
 * Create markdown-it instance.
 *
 * @returns {ReturnType<typeof markdownit>}
 */
function createMarkdownItInstance () {
  return markdownit({
    linkify: true,
  })
}
