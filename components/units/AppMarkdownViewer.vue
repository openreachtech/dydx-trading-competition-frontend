<script>
import {
  defineComponent,
} from 'vue'

import {
  useNuxtApp,
} from '#imports'

import AppMarkdownViewerContext from './AppMarkdownViewerContext'

export default defineComponent({
  props: {
    content: {
      type: String,
      required: true,
    },
  },

  setup (
    props,
    componentContext
  ) {
    const {
      $markdown,
    } = useNuxtApp()

    const args = {
      props,
      componentContext,
      markdownItInstance: $markdown,
    }
    const context = AppMarkdownViewerContext.create(args)
      .setupComponent()

    return {
      context,
    }
  },
})
</script>

<template>
  <div
    :class="$style.markdown"
    v-html="context.renderContent()"
  />
</template>

<style module>
.markdown {
  font-family: var(--font-family-body);
  font-size: var(--font-size-base);

  line-height: var(--size-line-height-regular);

  color: var(--color-text-primary);
}

/* Headings */
.markdown h1,
.markdown h2,
.markdown h3,
.markdown h4,
.markdown h5,
.markdown h6 {
  margin-block: 2rem 1rem;

  font-family: var(--font-family-heading);
  font-weight: 600;
  color: var(--color-text-primary);
}

.markdown h1 {
  font-size: var(--font-size-headline);
  line-height: var(--size-line-height-headline);
}

.markdown h2 {
  font-size: var(--font-size-extra);
  line-height: var(--size-line-height-extra);
}

.markdown h3 {
  font-size: var(--font-size-large);
  line-height: var(--size-line-height-large);
}

.markdown h4 {
  font-size: var(--font-size-medium);
  line-height: var(--size-line-height-medium);
}

.markdown h5,
.markdown h6 {
  font-size: var(--font-size-base);
  line-height: var(--size-line-height-base);
}

/* Paragraphs and text */
.markdown p {
  margin-block: 1rem;

  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
}

/* Links */
.markdown a {
  --color-text-link-hover: var(--palette-blue);

  text-decoration: none;

  color: inherit;

  transition: color 250ms var(--transition-timing-base);
}

.markdown a:hover {
  color: var(--color-text-link-hover);

  text-decoration: underline;
}

/* Lists */
.markdown ul,
.markdown ol {
  margin-block: 1rem;
  padding-inline-start: 1rem;
  color: var(--color-text-secondary);
}

.markdown ul {
  list-style-position: inside;
  list-style-type: disc;
}

.markdown ol li {
  padding-inline-start: 0.5rem;
}

.markdown li {
  margin-block: 0.5rem;
}

.markdown li > ul,
.markdown li > ol {
  margin-block: 0.5rem;
}

/* Blockquotes */
.markdown blockquote {
  margin-block: 1rem;

  border-inline-start-width: 0.25rem;
  border-inline-start-style: solid;
  border-inline-start-color: var(--color-border-default);

  padding-block: 0.5rem;
  padding-inline: 1rem;

  background-color: var(--color-background-surface-secondary);
}

.markdown blockquote p {
  margin-block: 0.5rem;

  color: var(--color-text-tertiary);
}

/* Code blocks and inline code */
.markdown pre {
  margin-block: 1rem;

  border-color: var(--color-border-default);
  border-radius: 0.25rem;
  border-style: solid;
  border-width: var(--size-thinnest);

  padding-block: 1rem;
  padding-inline: 1rem;

  background-color: var(--color-background-surface-primary);

  overflow-x: auto;
}

.markdown code {
  border-radius: 0.25rem;

  padding-block: 0.2rem;
  padding-inline: 0.4rem;

  font-family: monospace, var(--font-family-sans-fallback);
  font-size: var(--font-size-small);

  background-color: var(--color-background-surface-primary);
}

.markdown pre code {
  padding-block: 0;
  padding-inline: 0;

  background-color: transparent;
}

/* Tables */
.markdown table {
  margin-block: 1rem;

  width: 100%;

  border-collapse: collapse;

  background-color: var(--color-background-surface-secondary);
}

.markdown th,
.markdown td {
  padding-block: 0.75rem;
  padding-inline: 0.75rem;

  border: var(--size-thinnest);
  border-style: solid;
  border-color: var(--color-border-default);

  text-align: left;
}

.markdown th {
  background-color: var(--color-background-surface-primary);
  font-weight: 600;
}

/* Horizontal rule */
.markdown hr {
  margin-block: 2rem;

  border: none;
}

/* Images */
.markdown img {
  margin-block: 1rem;

  border-radius: 0.25rem;

  max-inline-size: 100%;
  block-size: auto;
}

/* Task lists */
.markdown input[type="checkbox"] {
  margin-inline-end: 0.5rem;
}
</style>
