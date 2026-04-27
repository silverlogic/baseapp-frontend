import type { LexicalVisitor, MdastImportVisitor } from '@mdxeditor/editor'
import type { ElementNode } from 'lexical'
import type * as Mdast from 'mdast'

import { $createMentionNode, $isMentionNode } from './MentionNode'
import { MENTION_MARKDOWN_PROTOCOL } from './constants'
import { stripMentionProtocol } from './utils'

export const MdastMentionLinkVisitor: MdastImportVisitor<Mdast.Nodes> = {
  testNode: (node) =>
    node.type === 'link' &&
    typeof node.url === 'string' &&
    node.url.startsWith(MENTION_MARKDOWN_PROTOCOL),
  priority: 1,
  visitNode: ({ mdastNode, lexicalParent }) => {
    const link = mdastNode as Mdast.Link
    const profileId = stripMentionProtocol(link.url)
    const urlPath = typeof link.title === 'string' ? link.title : ''
    const firstChild = link.children?.[0]
    const textValue = firstChild && firstChild.type === 'text' ? firstChild.value : ''
    const name = textValue.startsWith('@') ? textValue.slice(1) : textValue
    // MentionNode is a leaf (token-mode TextNode subclass) — append directly
    // and DON'T step into it. Using `addAndStepInto` would make mdxeditor try
    // to recurse into the link's text children with our MentionNode as the
    // parent, but it has no `.append` (it's not an ElementNode) → crash.
    ;(lexicalParent as ElementNode).append($createMentionNode({ profileId, urlPath, name }))
  },
}

// Defensive sanitization on export so the parse regex
// (`/\[@([^\]]+)\]\(mention:\/\/([^)\s"]+)(?:\s+"([^"]*)")?\)/g`) cannot be
// fooled by hostile or unusual inputs. Profile.name and URLPath.path are
// product-controlled today, but this keeps the round-trip resilient if either
// ever loosens.
const sanitizeName = (name: string): string => name.replace(/[\]\\]/g, '')
const sanitizeUrlPath = (urlPath: string): string => urlPath.replace(/["\\]/g, '')

export const LexicalMentionVisitor: LexicalVisitor = {
  testLexicalNode: $isMentionNode,
  priority: 1,
  visitLexicalNode: ({ lexicalNode, mdastParent, actions }) => {
    if (!$isMentionNode(lexicalNode)) return
    const link: Mdast.Link = {
      type: 'link',
      url: `${MENTION_MARKDOWN_PROTOCOL}${lexicalNode.getProfileId()}`,
      title: sanitizeUrlPath(lexicalNode.getUrlPath()),
      children: [{ type: 'text', value: `@${sanitizeName(lexicalNode.getName())}` }],
    }
    actions.appendToParent(mdastParent, link as Mdast.RootContent)
  },
}
