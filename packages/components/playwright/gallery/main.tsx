/* eslint-disable import/no-extraneous-dependencies */

/**
 * Playwright component-testing gallery (webpack flavour).
 *
 * Implements the gallery contract from the `playwright-component-testing` skill
 * (`references/gallery-spec.md`): exposes `window.mount({ story, props })` and
 * `window.unmount()`, rendering the resolved story into `#root`.
 *
 * The published spec's worked example uses Vite's `import.meta.glob`. This
 * package builds on webpack (see `../../webpack.config.ts`), so story discovery
 * uses `require.context` instead — the webpack equivalent. Serving the gallery
 * from the existing webpack config is what lets stories rely on
 * `babel-plugin-relay`, the react-native/expo aliases and the `next/font` mock
 * without a second bundler.
 */
import { flushSync } from 'react-dom'
import { type Root, createRoot } from 'react-dom/client'

import '../../styles/tailwind/globals.css'

type StoryModule = Record<string, React.ComponentType<any>>

interface RequireContext {
  (id: string): StoryModule
  keys(): string[]
}

// DOCS: `require.context` is webpack's static-analysis equivalent of Vite's
// `import.meta.glob` used in the published gallery spec. It is not part of
// @types/node's NodeRequire, hence the local shape.
const context = (
  require as unknown as {
    context(path: string, deep: boolean, filter: RegExp): RequireContext
  }
).context('../../modules', true, /\.story\.tsx$/)

/**
 * './navigations/web/NavMini/__tests__/__utils__/NavMini.story.tsx'
 *   -> 'navigations/web/NavMini/NavMini'
 *
 * The test-scaffolding segments are stripped so an id stays stable wherever the
 * story lives. Story ids are plain strings resolved at runtime, so without this
 * a move between `__tests__/__utils__/` and the component folder would break
 * every spec that mounts it — with no compile-time error.
 */
const toId = (file: string) =>
  file
    .replace(/^\.\//, '')
    .replace(/\.story\.\w+$/, '')
    .replace(/\/__tests__\/__utils__(?=\/|$)/, '')
    .replace(/\/__tests__(?=\/|$)/, '')

const resolve = (storyId: string): React.ComponentType<any> | undefined => {
  const separator = storyId.lastIndexOf('/')
  const path = storyId.slice(0, separator)
  const name = storyId.slice(separator + 1)

  const file = context.keys().find((key) => toId(key) === path || toId(key).endsWith(`/${path}`))

  if (!file) return undefined

  const mod = context(file) as StoryModule
  return mod[name] ?? mod.default
}

const rootElement = document.getElementById('root')!
let root: Root | undefined

declare global {
  interface Window {
    mount: (params: { story: string; props?: Record<string, unknown> }) => Promise<void>
    unmount: () => Promise<void>
  }
}

window.mount = async ({ story, props }) => {
  const Story = resolve(story)
  if (!Story) throw new Error(`Unknown story: ${story}`)

  // DOCS: reuse the root so `component.update(props)` reconciles instead of
  // remounting, preserving component-internal state.
  root ??= createRoot(rootElement)

  // DOCS: flushSync so a render error rejects this promise rather than being
  // swallowed by React's async rendering.
  flushSync(() => root!.render(<Story {...props} />))
}

window.unmount = async () => {
  root?.unmount()
  root = undefined
}
