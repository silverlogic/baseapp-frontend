/**
 * Converts a File from a form field to a Base64 string.
 */
export const toBase64 = (file: Blob | File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
  })
