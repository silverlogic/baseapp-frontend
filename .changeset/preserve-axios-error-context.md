---
"@baseapp-frontend/utils": patch
---

Preserve original Axios errors, response status and request configuration when camelizing JSON error bodies. Callers can reliably classify temporary failures and identify the request scope.
