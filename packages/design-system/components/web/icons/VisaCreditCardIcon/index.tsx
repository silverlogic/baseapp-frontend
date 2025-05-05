import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const VisaCreditCardIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'action.active', ...sx }} {...props}>
    <svg
      width="36"
      height="24"
      viewBox="0 0 36 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <rect y="-0.00976562" width="35.6289" height="24" fill="url(#pattern0_0_8928)" />
      <defs>
        <pattern id="pattern0_0_8928" patternContentUnits="objectBoundingBox" width="1" height="1">
          <use xlinkHref="#image0_0_8928" transform="scale(0.00694444 0.0103093)" />
        </pattern>
        <image
          id="image0_0_8928"
          width="144"
          height="97"
          preserveAspectRatio="none"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAABhCAYAAAA5iCgEAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAncSURBVHgB7Z1NTBVXFMfPM91o1FjdAU0gqQViNJAIupOPaNJuIHErVBbdYErdaeICWJhgd5rgol1IkC0FNm1CouIOYVHrBqgmvkVhp0U0uqTzn/euGYY7c8+9d+a9oueXTB7ojG/mzv+ej3vOjAVisr29fST4aAm2nmDrCDb8Xk/Cp0CxvD0NtseFQmGWe2DBtEMgnPrg46dgu0wl0QifPpvBBhGNBmIqpu2YKqBAPMPBx1US4XzOjAQiGk36S62AylZnhkouSxCKwdaps0a7BFQWzyOS+EbYSZE0ItohIBGPYKBIMRHFBfSSRDxCOsjUICIE2rRP/Wk5YK4nQUgHcfFV9Utogcqu6yUJAp8GuDJlgYZJEOwIrVChvML8LwmCHYiBGmCBOkgQ7IHh6YWAekgQ3DgHAdWTILjRghgI8Y/UugQXNiGgbRIER/aRIHggAhK8EAEJXoiABC9EQIIXIiDBCxGQ4IUISPBCBCR4IQISvBABCV6IgAQvRECCFyIgwQsRkOCFCEjw4guyZHb2Ca2vvyIfmprqqL39OB06tJ9c2dh4TTMzi6x9e3vPUm3t0Y+/P3jwjLa2PqQeU1d3lNrajpMNq6v/0PLyi/BzdXU9/I53796Hn4cP76eDBw+E54HrxvU3NtaGn768ffshvCema8riu+JYdyQODf0aDtLW1nvyAQN57dpF6u4+RS5AyDduTBn3q609RvPzIzv+7MSJH43H9faeoZs3Lxn3w82bnFygqalHxhuoA8Lq6jpFfX2dwcSqJVvu31+gu3d/N343RLu4+DNljbUFunPnh/Bzefl5OMtmZxfDT1vW11+HYpyYGLKe6QCDxqGr6+SO39fWeOcK65CGr3AUOBaTASKyFdD4+B/sccD5wjLC+meJtYAUuOnY+vo6QjHMzS0GA7Fk7d4wCBMTdgJaWnoeficHzOydx/7NOi7N3GPCDA39wj4HDrY3Fi6cKx4Fxi1rAWUSRMMdDQ5+F7oKmH24DS6wZLbMzT1h7Qc3FI19AMdawtwnDTSOHxi4nal4MF7x8zQxPm4nHsC1vjZknoXhpkFIV658yz4GppULZh5MPvdc4qytmb8ryZXguyEeH5elw+Qu48AduUw8l2NM5JbGwyJxYxsbAcEMc8Csjn8/Bn5lxTwLk6zP5cvZiwe0tX1ttT+ySBcLiGOyPv9c14F0FkCHTRDO9fuDg7st4MoKT6g64ZeWL7JzW1Gam+3iEtvYJwrHAtvgHERz4FsgnoC4wTOsD7KaOFwTrrNAyLY4HD58IAjcz4XX3thYF6bpio2NV+H54zpwLlgOAdiPi00CoQOTyCXrTSJXASEwxACazCbXhXGDZ7iE6I1TqBuWhi6gRezDcX049t69ocSAuKbmWLipG6iyV925JsEdgySyDqRzL2XoLEEctZKahk3wjPhLB8d86wJarsAvXTpnlU2p7JWLzRgkkXUgnbuAsnJj3OAZ1kd3EzHzOAGkLqDlxk55Yyrd6BKHOFkH0v8bAZksEDcGQd3L5d9X2Aa0UaamFkIrkRcm94XEgbOanaUVyl1AsAYcs54Wn8B6cGOQpMyPa8F0AS13YRSzG6m+r5vRwckCMVk5K817SkCAEwelxSeTkzzro0vdFZxMD4OvC2htrBJuMoq82LK0RiZRKtfNsfhZLkdURECcWZHkmxFgP3z4jDikDR5n1iWZfwTWtqkvbvj588OZCAnHm85fuW6V+aax5ywQt2VDZ4U4vTtAV/dS8APwZJH093eQC0pIKBq7wql7Ra28aV2Jk/VyqYiAUJxsbjYHd7psx6fupeCuvqYFoLhB3JV1HVg9vnBh2NoacVJ3nFfU6lQykK5YS+vp02YXEF/k4phuABeZ7r7MC4hpFXjF9esXvdoh4KZhjdBHxIVjPePC5nQeuvRw6aiYgFwuituygJ6k9H/XvQIfBSKbnr7m7M4Ut25Ns0Vkqnvp1n448dqeExAvO9jplznWJy11ByV/b3YbNkEyWnFt+57iQBgmYXPqXrqFTwjdtHRi0wGRRsUEhIsy3aRocMetfptaIXwKqGlAtKh7ucZFuNaxsd9S9+HUvZKsL2essxBRRR/rsQnufOteCp8WDhOY5bBE8/OjTkIqVeT1AucEz7CAScLnjPWeExAnnYdv5gbPyIxMppoTQCctIHKJCslWiElBMif+S1s45VjULOKgXNs54qgblbaug4viBs+cYJaTwtfU2PUjJwEh4SkTxDfcdZ+km8iZQHDxMzN6KwUXZYIzuUxUVECIg7DIlTY4MKtovDLBqTz7VOB9gFtVj/2Y0PXncOM/n85EgLFWDz26UvFHm003i5s1pZlvBTf+8anAJ5HUFRBH94Amt/MgC3xbXCsuoKwer+XEGtwMLMsWT8WbN7wnd+PBLrfzICt8e52qYIGOe5lMkFb3isKZXWkWcWxsml1Hi8NtPY0Hu9zOg6zwbXGtyts5bJrIdXDaQH0f4QEQwcDAnbCGhWfQOWkvvhePbHOXIaKZaRYtq7b41sQqGkQrurtPOp94UstqHN/1n2gAjpgM1gjAemICwPVE3y5SWphbt7queCLgau18UG00rl6hKgLyKUhyg1NucJgkxqR2Bwx22gKgDfFEwDercgVj5RoHVkVAKg6ybe421b2i+Fbg87YGKEFErwVNc5zsE4+M29zspaUXRmH6PCtWFQEBnDCaxWzo6Wln7+tbgc+qWq0DwkFrSBRudb6n56zVo0N40NEkIEy2/v5OcqFqr7hzWbzjui8Eo74V+DxeRABgeeIvruKWbrjxXxS04+bZ4lo1AbW3f2O1Pzd1B9wiYdKaVB7uC+4XZY645QHc0g13AsXJs8W1agLizIwoNtVun0d4AG52qfvQ7rUrOmA1SoXWkUSLx7UAnKdbdOTZ4lq1GAhgYPNot4Cl6u1Nj5cOHTqQKGAcD1ej3r6GLAWihGXD70l9zYg3amq+DG9YU9NXQbxyhuU+UMw1FXRhLV1TbRxrtsoFckH+229H1BtYFXhpwueICEjwQl40LnghAhK8EAEJXoiABC9EQIIXIiDBCxGQ4IUISPBCBCR4AQFtkiC4sQkBFUkQ3ChCQH+RILjxFAJaIEFw4zGq8UeCH14G2xESBDsa9hUKBQTRcyQIdkwE2imGbWiBFWoJPv4kQeDTAAGF60DBD0+Dj9skCDxuQzz44WMjbDkWghWqJ0FIphhsreXQZ2cndSCieiqJSAJqQQdE06qsD9hRyij/RSfJ6rSwG2iiMyoeoH2Wo2yJ8KKaehKEktvaJR6gLaaWd2wlCayFkgZadeIBxqfJytZoJNi+J+FzYiHYRgPhLKTtxH4csSykjmDroZJrayHhU6JIJdGgNjqhsixByJX/AD+btoEA9FG8AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  </SvgIcon>
)

export default VisaCreditCardIcon
