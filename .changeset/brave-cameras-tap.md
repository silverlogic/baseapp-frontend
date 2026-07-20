---
"@baseapp-frontend/design-system": patch
---

Fix Dropzone multi-file gallery: clicking the remove (×) icon or the image preview no longer bubbles to the dropzone root and re-opens the file picker; the remove button now has an explicit type="button" so it doesn't submit enclosing forms
