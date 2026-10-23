---
'@baseapp-frontend/components': patch
---

`useCreateGroupChatMutation` (`messages/native`) types its commit as taking callbacks only:
`variables` is optional and the config itself can be omitted, since the hook builds the variables
from `GroupChatProvider` and the current profile. Existing calls that pass `variables` still compile.
The config type is exported from `messages/native` as `CreateGroupChatCommitConfig`.
