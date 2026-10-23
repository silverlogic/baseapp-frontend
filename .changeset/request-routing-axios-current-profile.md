---
"@baseapp-frontend/utils": minor
---

`createAxiosInstance` takes a new `withCurrentProfile` option (default `false`). When on, each request sends the `Current-Profile` header with the id from the `CurrentProfile` cookie (secure store on mobile, request cookies during server rendering), the way `baseAppFetch` and the GraphQL environment already do, so REST calls made through axios act as the profile the user switched to. No header is sent without a current profile, and a header the caller set is kept. Existing instances, including the exported `axios` and `axiosForFiles`, are unchanged.
