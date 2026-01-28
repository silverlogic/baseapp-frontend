import { FC } from "react"

import { SvgIcon, SvgIconProps } from "@mui/material"

const ArrowIosForwardIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
    <SvgIcon sx={{ fontSize: 24, ...sx }} {...props}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.99981 18.9999C9.76616 19.0004 9.53972 18.919 9.35981 18.7699C9.1553 18.6004 9.02666 18.3564 9.00227 18.0919C8.97788 17.8274 9.05975 17.564 9.22981 17.3599L13.7098 11.9999L9.38981 6.62994C9.22204 6.42335 9.14354 6.1584 9.17169 5.89376C9.19985 5.62912 9.33233 5.38662 9.53981 5.21994C9.74898 5.03591 10.0254 4.94747 10.3026 4.97594C10.5797 5.00442 10.8324 5.14722 10.9998 5.36994L15.8298 11.3699C16.1331 11.7389 16.1331 12.2709 15.8298 12.6399L10.8298 18.6399C10.6263 18.8854 10.318 19.0191 9.99981 18.9999Z" fill="currentColor"/>
        </svg>
    </SvgIcon>
)

export default ArrowIosForwardIcon