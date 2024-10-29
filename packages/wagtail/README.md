# **`@baseapp-frontend/wagtail`**

## **Overview**

This package includes BaseApp wagtail.

## **Installation**

You can install the package via npm, yarn or pnpm:

```bash
npm install @baseapp-frontend/wagtail
# or
yarn add @baseapp-frontend/wagtail
# or
pnpm install @baseapp-frontend/wagtail
```

## **What is in here?**

Use this package to load the Wagtail CMS initial headless setup. You can also follow its internal code as a reference of how to implement features inside of the Wagtail CMS

```bash
cd packages/wagtail

pnpm storybook
```

## Usage

### Package setup

The following steps are already applied in the baseapp-frontend-template. If you want to remove the Wagtail package settings from your project, please follow this guide: [Remove the Wagtail package from your project](#remove-the-wagtail-package-from-your-project).

#### Create Page to Render Wagtail Content

Inside `apps/web/app/`, define where you want the Wagtail pages to appear. In the baseapp-frontend-template, we set the pages to display at `/pages/<page-slug>`, so Wagtail pages are rendered in `apps/web/app/(with-navigation)/(wagtail)/pages/[[...path]]/page.tsx`. Note the `[[...path]]/page.tsx` structure, which you’ll need wherever you decide to place the Wagtail page renderer.

In the `page.tsx` file you created, add the following code:

```tsx
import { FC } from 'react'

import { IPageParams, createWagtailPage } from '@baseapp-frontend/wagtail'

import { availableBlocks } from 'components/wagtail/blocks'

const WagtailPage: FC<IPageParams> = async ({ params }) => {
  const { WagtailPagesProvider, WagtailPageTypes } = await createWagtailPage({ params })

  return (
    <WagtailPagesProvider defaultSettings={{ availableBlocks }}>
      <WagtailPageTypes />
    </WagtailPagesProvider>
  )
}

export default WagtailPage
```

This code shows a simple way to render Wagtail page content on a Next.js page. It can be modified as needed to add extra blocks above or below the Wagtail content. Any component inside `WagtailPagesProvider` can access the Wagtail page data, and the `WagtailPageTypes` component is responsible for rendering the page and its blocks. Each `PageType` should correspond to a page model in the backend. For more on customizing the `createWagtailPage` function, see [Customize Wagtail Components](#customize-wagtail-components).

#### Create a Page to Preview Frontend Pages in the Wagtail CMS

One of Wagtail’s key features is providing an easy way for authors to review content before publishing. This feature allows authors to preview pages they are editing.

To create this page under `apps/web/app/`, place it near the previous `page.tsx`, so developers recognize they’re related. In the baseapp-frontend-template, we added this page at `apps/web/app/(with-navigation)/(wagtail)/page-preview/page.tsx`, making it accessible at `/page-preview` and positioning it within the `(wagtail)` folder near `pages/[[...path]]/page.tsx`.

In the `page.tsx` file you created, add the following code:

```tsx
import { FC } from 'react'

import { IPagePreviewParams, createWagtailPagePreview } from '@baseapp-frontend/wagtail'

import { availableBlocks } from 'components/wagtail/blocks'

const WagtailPagePreview: FC<IPagePreviewParams> = async ({ searchParams }) => {
  const { WagtailPagesProvider, WagtailPageTypes } = await createWagtailPagePreview({
    searchParams,
  })

  return (
    <WagtailPagesProvider defaultSettings={{ availableBlocks }}>
      <WagtailPageTypes />
    </WagtailPagesProvider>
  )
}

export default WagtailPagePreview
```

This setup is very similar to the `WagtailPage` created for rendering final pages. Keeping both setups similar ensures the preview page in the admin closely matches the published page. The only differences between them should be the use of `createWagtailPagePreview` instead of `createWagtailPage`. You can reduce redundancy between these two pages as much as needed for client projects.

### Customize Wagtail Components

This package can be used simply to load plain pages from Wagtail or for more advanced usage, customizing features or adding extra page models and blocks.

With this in mind, the package also functions as a framework for adding or overriding page types and blocks.

#### Adding Blocks

The process for overriding and creating new blocks is quite similar. The baseapp-frontend-template project includes a great example of overriding an existing block. Inside `apps/web/components/wagtail/blocks/`, you’ll find an example of overriding `RichTextBlock`, a basic block already provided by the package. Follow these steps to override or create blocks:

1. Create the component inside `apps/web/components/wagtail/blocks/`. This ensures everything related to Wagtail is grouped within a Wagtail folder.
2. The component interface must extend the `IPageBodyItem` interface. Typically, two interfaces are needed. Using `RichTextBlock` as an example:

   - `IRichTextBlock` extends `IPageBodyItem`, defines the block type value, and is used by the blocks factory.
   - `IRichTextBlockProps` is the second interface, extending `IRichTextBlock` and omitting the type from props. This is the interface used by the component itself.

   Follow this pattern for all blocks.

3. Implement the component code. It should receive `id` and `value` as props. With these two props, you should be able to render the component.
4. After creating the component, add it to the `availableBlocks` constant inside `apps/web/components/wagtail/blocks/index.ts`. The key for each entry in this object should be the block type, matching the block type defined in the backend.

The `availableBlocks` will then be imported into the page renderer and the page preview renderer to be passed to the `WagtailPageProvider`.

These are the only requirements for creating blocks; everything else that works is valid. **Remember, any block should ideally be portable to the package**, so ensure you follow the pattern and create clean components.

#### Adding Page Types

The baseapp-frontend-template doesn’t include an example of page types, as the baseapp-backend-template already creates the `base.StandardPage` page model, which has a page type registered in the frontend package.

However, if you want to add new page types or override existing ones, follow a similar pattern used for blocks. Create a folder `apps/web/components/wagtail/pageTypes/` and add each page type component inside it. Finally, export all page types in a constant named `availablePageTypes` within `apps/web/components/wagtail/pageTypes/index.ts`. The key for each entry should be the page type identifier, such as `base.StandardPage`, which follows the format: `<BE-App-Label>.<Page-Model-Name>`.

After that, pass the available page types to the provider in both the final page renderer and the page preview renderer, like this:

```tsx
// ...
import { availableBlocks } from 'components/wagtail/blocks'
import { availablePageTypes } from 'components/wagtail/pageTypes'

// ...
return (
    <WagtailPagesProvider defaultSettings={{ availableBlocks, availablePageTypes }}>
        <WagtailPageTypes />
    </WagtailPagesProvider>
)

// ...
```

If you have any uncertainties about how to create the page type component, follow the pattern used to create the `StandardPage` page type in the Wagtail package.

### Good Practices

Please try to add a Storybook story for each created block and cover it with Cypress tests. The goal is to make it as straightforward as possible to port any new block or page type to the package if needed.

**IMPORTANT:** All components sent thru the `defaultSettings={{ availableBlocks, availablePageTypes }}` must have `'use client'` at the top of the files. Server side components can't be forwarded that way, so if you don't add the client flag, the system will crash.

## Uninstallation

### Remove the Wagtail package from your project

To remove the wagtail package and the setup code from is very simple. Follow these steps:

1. Delete the `(wagtail)/` folder from `apps/web/app/(with-navigation)/(wagtail)` or wherever it's.

2. Delete the `wagtail/` folder from `apps/web/components/`.

3. Uninstall the package from your project by running:
   ```shell
   pnpm remove @baseapp-frontend/wagtail
   ```

## Testing

Components must be tested using Cypress. Follow the patterns in the package code to create Cypress tests for new blocks.

To run Cypress, use the following command inside the package folder:

```shell
pnpm cypress:open
```
