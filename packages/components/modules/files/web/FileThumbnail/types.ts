export interface FileThumbnailProps {
  /** Image preview URL; when present (and the file is an image) it is shown cover-fit. */
  src?: string | null
  /** MIME type, used to pick the fallback icon tile. */
  contentType?: string | null
  alt?: string
  /** Square size in px (Figma chip = 40). */
  size?: number
}
