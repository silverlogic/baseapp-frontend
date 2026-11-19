---
"@baseapp-frontend/components": minor
---

Notifications: card holds that need staff now show in the notifications list. `NOTIFICATION_VERB` gains `cardHoldFailed` (`PAYMENTS.CARD_HOLD_FAILED`) and `cardHoldPartiallyPaid` (`PAYMENTS.CARD_HOLD_PARTIALLY_PAID`), and `NotificationItemRenderer` renders both with the new `CardHoldNotification`: the backend's sentence, then the hold's `CardHoldStaffNotice` with its actions (Keep / Cancel / Retry hold, or Mark paid). Once the hold is settled the notice renders nothing and the sentence stays. `NotificationItemFragment` spreads `CardHoldStaffNotice_cardHold` on a `CardHold` target. Replace it through `CardHoldNotification` / `CardHoldNotificationProps` (including `CardHoldStaffNotice` / `CardHoldStaffNoticeProps`). Needs a backend that sends these notifications (`baseapp_payments` with `baseapp_notifications`). Native still ignores both verbs.
