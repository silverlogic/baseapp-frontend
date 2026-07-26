export async function uploadChunk(
  chunk: Blob,
  presignedUrl: string,
  abortSignal?: AbortSignal,
  onProgress?: (loaded: number, total: number) => void,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    // Set up progress tracking
    if (onProgress) {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          onProgress(event.loaded, event.total)
        }
      })
    }

    // Handle successful completion
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const etag = xhr.getResponseHeader('ETag')?.replace(/"/g, '')
        if (!etag) {
          reject(new Error('No ETag in response'))
        } else {
          resolve(etag)
        }
      } else {
        reject(new Error(`Chunk upload failed: ${xhr.status} ${xhr.statusText}`))
      }
    })

    // Handle errors
    xhr.addEventListener('error', () => {
      reject(new Error('Chunk upload failed: Network error'))
    })

    // Handle abort
    xhr.addEventListener('abort', () => {
      reject(new Error('Chunk upload aborted'))
    })

    // Connect abort signal
    if (abortSignal) {
      abortSignal.addEventListener('abort', () => {
        xhr.abort()
      })
    }

    // Start the upload
    xhr.open('PUT', presignedUrl)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.send(chunk)
  })
}
