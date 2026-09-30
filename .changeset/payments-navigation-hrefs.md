---
"@baseapp-frontend/components": major
---

**Breaking:** the payments components take destinations instead of click handlers, so
they render links rather than buttons that push. Links prefetch on hover and give a
client-side transition; every one of these destinations is known at render, so none of
them needed a handler.

- `SubscriptionCard`: `onManageClick` / `onSubscribeClick` → `manageHref` /
  `subscribeHref`
- `ConfirmationSubscriptionModal`: `planDetails` → `planDetailsHref`. A project passing
  its own modal to `CheckoutComponent` has to update its props to match.
- `FreePlanComponent`: `onPlanChange` → `planChangeUrl` (internal, listed for
  completeness)

`AvailableSubscriptions` and `CheckoutComponent` are unchanged — they still take
`manageSubscriptionUrl` and `planDetailsUrl`, so a project using only those needs no
change.
