/* eslint-disable
   no-underscore-dangle,
   class-methods-use-this,
   @typescript-eslint/no-use-before-define
   --
   Lexical's TextNode contract requires:
   - private fields prefixed with `__` (the `__profileId` etc. are part of the
     immutable-update protocol — getWritable()/clone() rely on these names)
   - inherited override methods (`isTextEntity`, `canInsertTextBefore`,
     `canInsertTextAfter`) that don't reference `this`
   - circular reference between `static importJSON` (inside the class) and the
     `$createMentionNode` factory (defined below the class for runtime hoisting).
   These are framework constraints, not style preferences. */
import { lexical } from '@mdxeditor/editor'
import type { EditorConfig, LexicalNode, NodeKey } from 'lexical'

import { MENTION_NODE_CLASS } from './constants'
import type { SerializedMentionNode } from './types'

const { TextNode, $applyNodeReplacement } = lexical

export class MentionNode extends TextNode {
  __profileId: string

  __urlPath: string

  __name: string

  static override getType(): string {
    return 'mention'
  }

  static override clone(node: MentionNode): MentionNode {
    return new MentionNode(node.__profileId, node.__urlPath, node.__name, node.__text, node.__key)
  }

  // NOTE: do NOT call setMode here. setMode() goes through getWritable()
  // which clones the node — clone() then calls `new MentionNode(...)` again,
  // hitting setMode() and recursing until the stack blows up.
  // Token mode is set in $createMentionNode after construction; subsequent
  // clones inherit __mode automatically via TextNode.afterCloneFrom().
  constructor(profileId: string, urlPath: string, name: string, text?: string, key?: NodeKey) {
    super(text ?? `@${name}`, key)
    this.__profileId = profileId
    this.__urlPath = urlPath
    this.__name = name
  }

  getProfileId(): string {
    return this.__profileId
  }

  getUrlPath(): string {
    return this.__urlPath
  }

  getName(): string {
    return this.__name
  }

  override createDOM(config: EditorConfig): HTMLElement {
    const dom = super.createDOM(config)
    dom.classList.add(MENTION_NODE_CLASS)
    dom.setAttribute('data-profile-id', this.__profileId)
    dom.setAttribute('data-url-path', this.__urlPath)
    return dom
  }

  override exportJSON(): SerializedMentionNode {
    return {
      ...super.exportJSON(),
      profileId: this.__profileId,
      urlPath: this.__urlPath,
      name: this.__name,
      type: MentionNode.getType(),
      version: 1,
    }
  }

  static override importJSON(json: SerializedMentionNode): MentionNode {
    const node = $createMentionNode({
      profileId: json.profileId,
      urlPath: json.urlPath,
      name: json.name,
    })
    node.setFormat(json.format)
    node.setDetail(json.detail)
    node.setStyle(json.style)
    return node
  }

  override isTextEntity(): true {
    return true
  }

  override canInsertTextBefore(): boolean {
    return false
  }

  override canInsertTextAfter(): boolean {
    return true
  }
}

export const $createMentionNode = ({
  profileId,
  urlPath,
  name,
}: {
  profileId: string
  urlPath: string
  name: string
}): MentionNode => {
  const node = new MentionNode(profileId, urlPath, name)
  node.setMode('token')
  return $applyNodeReplacement(node)
}

export const $isMentionNode = (node: LexicalNode | null | undefined): node is MentionNode =>
  node instanceof MentionNode
