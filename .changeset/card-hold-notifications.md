---
'@baseapp-frontend/components': minor
---

Notifications: a failed card hold now shows in staff's notifications. `NOTIFICATION_VERB` gains `cardHoldFailed` (`PAYMENTS.CARD_HOLD_FAILED`), and `NotificationItemRenderer` renders it with the new `CardHoldNotification`: the backend's sentence, then the hold's `CardHoldStaffNotice` with Keep / Cancel. Once the hold is settled the notice renders nothing and the sentence stays. `NotificationItemFragment` spreads `CardHoldStaffNotice_cardHold` on a `CardHold` target. Replace it through `CardHoldNotification` / `CardHoldNotificationProps` (including `CardHoldStaffNotice` / `CardHoldStaffNoticeProps`). Needs a backend that sends the notification (`baseapp_payments` with `baseapp_notifications`). Native still ignores the verb.
