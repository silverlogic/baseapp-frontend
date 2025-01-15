import Quill from 'quill'

/**
 * Generic function to format text based on a pattern and formatting options.
 * @param quill - The Quill editor instance.
 * @param pattern - The regex pattern to detect the text to be formatted.
 * @param format - The formatting options to apply.
 */
const formatText = (quill: Quill, pattern: RegExp, format: (match: RegExpExecArray) => any) => {
  const selection = quill.getSelection()
  if (!selection) return

  const [line] = quill.getLine(selection.index)
  const lineText = line?.domNode?.innerText || ''

  let match
  // eslint-disable-next-line no-cond-assign
  while ((match = pattern.exec(lineText))) {
    const start = match.index
    const end = start + match[0].length

    // @ts-ignore
    quill.deleteText(line.offset(start), end - start)
    // @ts-ignore
    quill.insertText(line.offset(start), match[1], format(match))
  }
}

const formatBold = (quill: Quill) => {
  const boldPattern = /\*\*(.+?)\*\*/g
  formatText(quill, boldPattern, () => ({ bold: true }))
}

const formatItalic = (quill: Quill) => {
  const italicPattern = /\*(.+?)\*/g
  formatText(quill, italicPattern, () => ({ italic: true }))
}

const formatUnderline = (quill: Quill) => {
  const underlinePattern = /__(.+?)__/g
  formatText(quill, underlinePattern, () => ({ underline: true }))
}

const formatLink = (quill: Quill) => {
  const linkPattern = /\[(.+?)\]\((.+?)\)/g
  formatText(quill, linkPattern, (match) => ({ link: match[2] }))
}

const formatUnorderedList = (quill: Quill) => {
  const unorderedListPattern = /^- (.+)/g
  formatText(quill, unorderedListPattern, () => ({ list: 'bullet' }))
}

const formatOrderedList = (quill: Quill) => {
  const orderedListPattern = /^\d+\. (.+)/g
  formatText(quill, orderedListPattern, () => ({ list: 'ordered' }))
}

export const formatMarkdown = (quill: Quill) => {
  formatBold(quill)
  formatItalic(quill)
  formatUnderline(quill)
  formatLink(quill)
  formatUnorderedList(quill)
  formatOrderedList(quill)
}

export const cleanEditorContent = (content: string) =>
  content.replace(/(<p><br><\/p>)+$/, '').trim()
