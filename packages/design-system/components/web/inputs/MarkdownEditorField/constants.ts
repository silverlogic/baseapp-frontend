import { ToolbarConfig } from './types'

export const DEFAULT_TOOLBAR_CONFIG: Required<ToolbarConfig> = {
  bold: true,
  italic: true,
  underline: true,
  strikethrough: true,
  code: true,
  numberedList: true,
  bulletList: true,
  checklist: true,
  link: true,
  insertTable: false,
  insertCodeBlock: false,
  insertImage: false,
  insertThematicBreak: false,
}

export const CODE_BLOCK_LANGUAGES: Record<string, string> = {
  css: 'css',
  txt: 'txt',
  sql: 'sql',
  html: 'html',
  sass: 'sass',
  scss: 'scss',
  bash: 'bash',
  json: 'json',
  js: 'javascript',
  ts: 'typescript',
  '': 'unspecified',
  tsx: 'TypeScript (React)',
  jsx: 'JavaScript (React)',
}
