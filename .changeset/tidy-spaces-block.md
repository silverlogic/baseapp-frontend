---
"@baseapp-frontend/components": patch
---

Prevent sending messages that contain only whitespace: reject markdown-escaped whitespace-only bodies (e.g. `&#x20;`) in the social upsert validation schema and run validation on the native MessageCreate submit
