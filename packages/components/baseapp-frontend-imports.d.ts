/**
 * @fileoverview
 * This file is a dedicated `.d.ts` declarations file that explicitly imports from
 * numerous subpaths within our monorepo packages (e.g. `@baseapp-frontend/components`,
 * `@baseapp-frontend/design-system`).
 *
 * Purpose:
 *  - Provide the code editor with a “preview” of all available
 *    subpath imports, even if no file in our workspace has imported them yet.
 *  - Ensure auto-import suggestions display these subpaths immediately, without
 *    waiting for an existing import to reveal them.
 *
 * In other words, we’re “seeding” the TypeScript language service with references
 * to many subpaths in our monorepo. By listing them here, we avoid the scenario where
 * the editor only autocompletes subpaths that are already imported elsewhere.
 */
// @baseapp-frontend/design-system
import '@baseapp-frontend/design-system/components/common'
import '@baseapp-frontend/design-system/components/native/appbars'
import '@baseapp-frontend/design-system/components/native/buttons'
import '@baseapp-frontend/design-system/components/native/displays'
import '@baseapp-frontend/design-system/components/native/drawers'
import '@baseapp-frontend/design-system/components/native/icons'
import '@baseapp-frontend/design-system/components/native/images'
import '@baseapp-frontend/design-system/components/native/inputs'
import '@baseapp-frontend/design-system/components/native/typographies'
import '@baseapp-frontend/design-system/components/native/views'
import '@baseapp-frontend/design-system/components/web/animate'
import '@baseapp-frontend/design-system/components/web/avatars'
import '@baseapp-frontend/design-system/components/web/buttons'
import '@baseapp-frontend/design-system/components/web/dialogs'
import '@baseapp-frontend/design-system/components/web/displays'
import '@baseapp-frontend/design-system/components/web/drawers'
import '@baseapp-frontend/design-system/components/web/dropzones'
import '@baseapp-frontend/design-system/components/web/icons'
import '@baseapp-frontend/design-system/components/web/illustrations'
import '@baseapp-frontend/design-system/components/web/images'
import '@baseapp-frontend/design-system/components/web/inputs'
import '@baseapp-frontend/design-system/components/web/logos'
import '@baseapp-frontend/design-system/components/web/popovers'
import '@baseapp-frontend/design-system/components/web/scrollbars'
import '@baseapp-frontend/design-system/components/web/typographies'
import '@baseapp-frontend/design-system/hooks/common'
import '@baseapp-frontend/design-system/hooks/native'
import '@baseapp-frontend/design-system/hooks/web'
import '@baseapp-frontend/design-system/providers/common'
import '@baseapp-frontend/design-system/providers/native'
import '@baseapp-frontend/design-system/providers/web'
import '@baseapp-frontend/design-system/styles/common'
import '@baseapp-frontend/design-system/styles/native'
import '@baseapp-frontend/design-system/styles/web'
import '@baseapp-frontend/design-system/utils/common'
import '@baseapp-frontend/design-system/utils/native'
import '@baseapp-frontend/design-system/utils/web'
