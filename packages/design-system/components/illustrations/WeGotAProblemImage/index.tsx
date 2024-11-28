import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const WeGotAProblemImage: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 200, color: 'primary.dark', ...sx }} {...props}>
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64.9001 84.9996C65.1001 84.9996 65.4001 84.9996 65.6001 84.8996C65.8001 84.7996 66.0001 84.6996 66.2001 84.4996C66.4001 84.2996 66.5001 84.0996 66.6001 83.8996C66.7001 83.6996 66.7001 83.4996 66.7001 83.1996C66.7001 82.9996 66.7001 82.6996 66.6001 82.4996C66.5001 82.2996 66.4001 82.0996 66.2001 81.8996C66.0001 81.6996 65.8001 81.5996 65.6001 81.4996C65.0001 81.1996 64.2001 81.3996 63.7001 81.8996C63.4001 82.1996 63.2001 82.6996 63.2001 83.0996C63.2001 83.5996 63.4001 83.9996 63.7001 84.2996C63.9001 84.7996 64.4001 84.9996 64.9001 84.9996ZM64.3001 82.6996C64.4001 82.5996 64.6001 82.4996 64.8001 82.4996C64.9001 82.4996 65.0001 82.4996 65.1001 82.5996C65.2001 82.5996 65.3001 82.6996 65.3001 82.7996C65.4001 82.8996 65.4001 82.9996 65.5001 82.9996C65.5001 83.0996 65.6001 83.1996 65.6001 83.2996C65.6001 83.3996 65.6001 83.4996 65.5001 83.5996C65.5001 83.6996 65.4001 83.7996 65.3001 83.7996C65.2001 83.8996 65.1001 83.8996 65.1001 83.9996C64.8001 84.0996 64.5001 83.9996 64.3001 83.7996C64.2001 83.6996 64.1001 83.4996 64.1001 83.2996C64.1001 83.0996 64.2001 82.7996 64.3001 82.6996Z"
        fill="currentColor"
      />
      <path
        d="M73.6001 95.1996C73.8001 95.3996 74.2001 95.5996 74.5001 95.6996C74.6001 95.6996 74.7001 95.6996 74.8001 95.6996C75.0001 95.6996 75.3001 95.6996 75.5001 95.5996C75.8001 95.4996 76.1001 95.1996 76.3001 94.9996C76.5001 94.6996 76.6001 94.3996 76.6001 93.9996C76.6001 93.4996 76.4001 93.0996 76.1001 92.7996C75.8001 92.4996 75.3001 92.2996 74.9001 92.2996C74.6001 92.2996 74.2001 92.3996 73.9001 92.5996C73.6001 92.7996 73.4001 93.0996 73.3001 93.3996C73.2001 93.6996 73.1001 94.0996 73.2001 94.3996C73.2001 94.6996 73.4001 94.9996 73.6001 95.1996ZM74.1001 93.6996C74.2001 93.5996 74.3001 93.3996 74.4001 93.3996C74.5001 93.3996 74.7001 93.2996 74.8001 93.2996C75.0001 93.2996 75.2001 93.3996 75.3001 93.4996C75.4001 93.5996 75.5001 93.7996 75.5001 93.9996C75.5001 94.0996 75.5001 94.2996 75.4001 94.3996C75.3001 94.4996 75.2001 94.5996 75.1001 94.6996C75.0001 94.7996 74.8001 94.7996 74.7001 94.6996C74.6001 94.6996 74.4001 94.5996 74.3001 94.4996C74.2001 94.3996 74.1001 94.2996 74.1001 94.0996C74.1001 93.9996 74.1001 93.7996 74.1001 93.6996Z"
        fill="currentColor"
      />
      <path
        d="M85.3001 86.1996C85.5001 86.3996 85.9001 86.5996 86.2001 86.6996C86.3001 86.6996 86.4001 86.6996 86.5001 86.6996C86.7001 86.6996 87.0001 86.6996 87.2001 86.5996C87.5001 86.4996 87.8001 86.1996 88.0001 85.9996C88.2001 85.6996 88.3001 85.3996 88.3001 84.9996C88.3001 84.4996 88.1001 84.0996 87.8001 83.7996C87.5001 83.4996 87.0001 83.2996 86.6001 83.2996C86.3001 83.2996 85.9001 83.3996 85.6001 83.5996C85.3001 83.7996 85.1001 84.0996 85.0001 84.3996C84.9001 84.6996 84.8001 85.0996 84.9001 85.3996C84.9001 85.5996 85.0001 85.8996 85.3001 86.1996ZM85.8001 84.5996C85.9001 84.4996 86.0001 84.2996 86.1001 84.2996C86.2001 84.2996 86.4001 84.1996 86.5001 84.1996C86.7001 84.1996 86.9001 84.2996 87.0001 84.3996C87.1001 84.4996 87.2001 84.6996 87.2001 84.8996C87.2001 84.9996 87.2001 85.1996 87.1001 85.2996C87.0001 85.3996 86.9001 85.4996 86.8001 85.5996C86.7001 85.6996 86.5001 85.6996 86.4001 85.5996C86.3001 85.5996 86.1001 85.4996 86.0001 85.3996C85.9001 85.2996 85.8001 85.1996 85.8001 84.9996C85.7001 84.8996 85.7001 84.7996 85.8001 84.5996Z"
        fill="currentColor"
      />
      <path
        d="M98.1001 96.7996C98.3001 96.9996 98.7001 97.1996 99.0001 97.2996C99.1001 97.2996 99.2001 97.2996 99.3001 97.2996C99.5001 97.2996 99.8001 97.2996 100 97.1996C100.3 97.0996 100.6 96.7996 100.8 96.5996C101 96.2996 101.1 95.9996 101.1 95.5996C101.1 95.0996 100.9 94.6996 100.6 94.3996C100.3 94.0996 99.8001 93.8996 99.4001 93.8996C99.1001 93.8996 98.7001 93.9996 98.4001 94.1996C98.1001 94.3996 97.9001 94.6996 97.8001 94.9996C97.7001 95.2996 97.6001 95.6996 97.7001 95.9996C97.7001 96.2996 97.8001 96.5996 98.1001 96.7996ZM98.6001 95.2996C98.7001 95.1996 98.8001 94.9996 98.9001 94.9996C99.0001 94.8996 99.2001 94.8996 99.3001 94.8996C99.5001 94.8996 99.7001 94.9996 99.8001 95.0996C99.9001 95.1996 100 95.3996 100 95.5996C100 95.6996 100 95.8996 99.9001 95.9996C99.8001 96.0996 99.7001 96.1996 99.6001 96.2996C99.5001 96.3996 99.3001 96.3996 99.2001 96.2996C99.1001 96.2996 98.9001 96.1996 98.8001 96.0996C98.7001 95.9996 98.6001 95.8996 98.6001 95.6996C98.6001 95.5996 98.6001 95.3996 98.6001 95.2996Z"
        fill="currentColor"
      />
      <path
        d="M108.8 85.9996C109 86.1996 109.2 86.3996 109.4 86.4996C109.6 86.5996 109.9 86.6996 110.1 86.6996H110.2C110.4 86.6996 110.7 86.6996 110.9 86.5996C111.2 86.4996 111.5 86.1996 111.7 85.9996C111.9 85.6996 112 85.3996 112 84.9996C112 84.4996 111.8 84.0996 111.5 83.7996C111.2 83.4996 110.7 83.2996 110.3 83.2996C110 83.2996 109.8 83.3996 109.6 83.4996C109.4 83.5996 109.2 83.7996 109 83.9996C108.8 84.1996 108.7 84.3996 108.7 84.6996C108.6 84.9996 108.6 85.1996 108.7 85.4996C108.5 85.4996 108.6 85.7996 108.8 85.9996ZM109.5 84.6996C109.5 84.5996 109.6 84.4996 109.6 84.3996C109.7 84.2996 109.8 84.1996 109.9 84.1996C110 84.1996 110.1 84.0996 110.2 84.0996C110.4 84.0996 110.6 84.1996 110.7 84.2996C110.8 84.3996 110.9 84.5996 110.9 84.7996C110.9 84.8996 110.9 85.0996 110.8 85.1996C110.7 85.2996 110.6 85.3996 110.5 85.4996C110.4 85.4996 110.3 85.5996 110.2 85.5996C110.1 85.5996 110 85.5996 109.9 85.4996C109.8 85.3996 109.7 85.3996 109.7 85.2996C109.6 85.1996 109.6 85.0996 109.6 84.9996C109.4 84.9996 109.4 84.7996 109.5 84.6996Z"
        fill="currentColor"
      />
      <path
        d="M122.4 86.6996C122.6 86.8996 122.8 87.0996 123 87.1996C123.2 87.2996 123.5 87.3996 123.7 87.3996H123.8C124 87.3996 124.3 87.3996 124.5 87.2996C124.8 87.1996 125.1 86.8996 125.3 86.6996C125.5 86.3996 125.6 86.0996 125.6 85.6996C125.6 85.1996 125.4 84.7996 125.1 84.4996C124.8 84.1996 124.3 83.9996 123.9 83.9996C123.6 83.9996 123.4 84.0996 123.2 84.1996C123 84.2996 122.8 84.4996 122.6 84.6996C122.4 84.8996 122.3 85.0996 122.3 85.3996C122.2 85.5996 122.2 85.8996 122.3 86.1996C122.1 86.1996 122.3 86.4996 122.4 86.6996ZM123.1 85.4996C123.1 85.3996 123.2 85.2996 123.2 85.1996C123.3 85.0996 123.4 84.9996 123.5 84.9996C123.6 84.9996 123.7 84.8996 123.8 84.8996C124 84.8996 124.2 84.9996 124.3 85.0996C124.4 85.1996 124.5 85.3996 124.5 85.5996C124.5 85.6996 124.5 85.8996 124.4 85.9996C124.3 86.0996 124.2 86.1996 124.1 86.2996C124 86.2996 123.9 86.3996 123.8 86.3996C123.7 86.3996 123.6 86.3996 123.5 86.2996C123.4 86.1996 123.3 86.1996 123.3 86.0996C123.2 85.9996 123.2 85.8996 123.2 85.7996C123.1 85.6996 123.1 85.5996 123.1 85.4996Z"
        fill="currentColor"
      />
      <path
        d="M138.9 85.3996C139.2 85.3996 139.4 85.3996 139.6 85.2996C139.8 85.1996 140 85.0996 140.2 84.8996C140.4 84.6996 140.5 84.4996 140.6 84.2996C140.7 84.0996 140.7 83.8996 140.7 83.5996C140.7 83.3996 140.7 83.0996 140.6 82.8996C140.5 82.6996 140.4 82.4996 140.2 82.2996C140 82.0996 139.8 81.9996 139.6 81.8996C139.4 81.7996 139.2 81.7996 138.9 81.7996C138.4 81.7996 138 81.9996 137.7 82.2996C137.4 82.5996 137.2 83.0996 137.2 83.4996C137.2 83.9996 137.4 84.3996 137.7 84.6996C138 85.1996 138.4 85.3996 138.9 85.3996ZM138.4 83.1996C138.5 83.0996 138.7 82.9996 138.9 82.9996C139 82.9996 139.1 82.9996 139.2 83.0996C139.3 83.0996 139.4 83.1996 139.4 83.2996C139.5 83.3996 139.5 83.4996 139.6 83.4996C139.6 83.5996 139.7 83.6996 139.7 83.7996C139.7 83.8996 139.7 83.9996 139.6 84.0996C139.6 84.1996 139.5 84.2996 139.4 84.2996C139.3 84.3996 139.2 84.3996 139.2 84.4996C139.1 84.4996 139 84.5996 138.9 84.5996C138.7 84.5996 138.5 84.4996 138.4 84.3996C138.3 84.2996 138.2 84.0996 138.2 83.8996C138.2 83.4996 138.2 83.2996 138.4 83.1996Z"
        fill="currentColor"
      />
      <path
        d="M130.8 98.1996C131 98.3996 131.2 98.5996 131.4 98.6996C131.6 98.7996 131.9 98.8996 132.1 98.8996H132.2C132.4 98.8996 132.7 98.8996 132.9 98.7996C133.2 98.6996 133.5 98.3996 133.7 98.1996C133.9 97.8996 134 97.5996 134 97.1996C134 96.9996 134 96.6996 133.9 96.4996C133.8 96.2996 133.7 96.0996 133.5 95.8996C133.3 95.6996 133.1 95.5996 132.9 95.4996C132.7 95.3996 132.5 95.3996 132.2 95.3996C132 95.3996 131.7 95.4996 131.5 95.5996C131.3 95.6996 131.1 95.8996 130.9 96.0996C130.7 96.2996 130.6 96.4996 130.6 96.7996C130.5 96.9996 130.5 97.2996 130.6 97.5996C130.5 97.6996 130.6 97.9996 130.8 98.1996ZM131.5 96.8996C131.5 96.7996 131.6 96.6996 131.6 96.5996C131.7 96.4996 131.8 96.3996 131.9 96.3996C132 96.3996 132.1 96.2996 132.2 96.2996C132.3 96.2996 132.4 96.2996 132.5 96.3996C132.6 96.3996 132.7 96.4996 132.7 96.5996C132.8 96.6996 132.8 96.7996 132.9 96.7996C132.9 96.8996 133 96.9996 133 97.0996C133 97.1996 133 97.3996 132.9 97.4996C132.8 97.5996 132.7 97.6996 132.6 97.7996C132.5 97.7996 132.4 97.8996 132.3 97.8996C132.2 97.8996 132.1 97.8996 132 97.7996C131.9 97.6996 131.8 97.6996 131.8 97.5996C131.7 97.4996 131.7 97.3996 131.7 97.2996C131.4 97.1996 131.4 96.9996 131.5 96.8996Z"
        fill="currentColor"
      />
      <path
        d="M157 54.4996C156.7 54.3996 156.5 54.4996 156.2 54.5996C156 54.6996 155.8 54.8996 155.7 55.0996C155.6 55.2996 155.6 55.4996 155.6 55.6996C155.6 55.8996 155.7 56.0996 155.8 56.1996C155.9 56.3996 156 56.4996 156.2 56.5996C156.4 56.6996 156.6 56.7996 156.7 56.7996C157 56.7996 157.3 56.6996 157.5 56.4996C157.7 56.2996 157.9 55.9996 157.9 55.6996C157.9 55.3996 157.8 55.1996 157.7 54.9996C157.5 54.6996 157.3 54.5996 157 54.4996Z"
        fill="currentColor"
      />
      <path
        d="M176.9 194H151.8C152.7 193.4 153.5 192.6 154 191.6C154.7 190.1 155.3 187.7 155.9 185.5C156.4 183.8 156.8 182 157.3 180.7C157.7 179.7 157.7 178.5 157.3 177.5C156.9 176.5 156.2 175.6 155.2 175.1L151.8 173.3C151.1 172.5 143.5 163.3 140.2 158.8C137.7 155.6 134.9 152.7 131.8 150.1C131.8 150 131.9 150 131.9 149.9C132 149.7 132 149.5 131.9 149.4L129.8 146C139.9 140.1 147.5 130.8 151.1 119.7C154.8 108.5 154.2 96.4996 149.6 85.6996C150.1 85.1996 150.6 84.6996 151 84.1996C151.1 84.0996 151.1 84.0996 151.1 83.9996C151.2 83.8996 151.2 83.7996 151.3 83.6996C152.6 83.7996 153.8 83.9996 155 84.1996C155.8 84.3996 157 84.7996 158.1 85.0996C159 85.3996 159.9 85.6996 160.6 85.8996C160.7 85.8996 160.8 85.8996 160.8 85.8996C161.1 85.8996 161.4 85.6996 161.5 85.4996C161.7 84.9996 161.4 84.4996 160.7 83.8996C160.9 83.8996 161.2 83.9996 161.4 83.9996C162.3 84.1996 163.3 84.2996 164.2 84.3996H164.3C164.7 84.3996 165 84.1996 165.1 83.7996C165.3 82.8996 164 82.2996 162.9 81.7996L162.5 81.5996C162.4 81.5996 162.3 81.4996 162.2 81.4996C162.4 81.4996 162.7 81.4996 162.9 81.4996C165.9 81.6996 166.4 81.1996 166.5 80.6996C166.6 79.9996 165.8 79.3996 163.5 78.5996C162.2 78.1996 156.5 77.2996 153.2 76.7996C153 76.6996 153 76.6996 153 76.6996C152.9 76.2996 154.4 74.9996 155 74.5996C155.4 74.1996 155.8 73.8996 156 73.5996C156.8 72.5996 157.3 71.8996 156.9 71.3996C156.6 70.9996 155.9 70.8996 153.5 71.9996C151.7 72.7996 148.6 73.9996 146 75.0996C144.9 74.5996 143.8 74.3996 142.9 74.4996C137.9 68.2996 131.4 63.3996 124.1 60.2996C124.1 60.2996 124.1 60.2996 124.1 60.1996C124.1 59.4996 123.9 58.8996 123.5 58.3996C123.3 58.1996 123.1 57.9996 122.9 57.7996C123.2 57.5996 123.4 57.3996 123.6 57.0996C124 56.5996 124.2 55.8996 124.2 55.1996C124.2 54.3996 123.9 53.6996 123.3 53.0996C123 52.7996 122.5 52.4996 122.1 52.2996C122.3 51.9996 122.4 51.6996 122.5 51.3996C122.6 50.7996 122.6 50.0996 122.4 49.5996C122.2 48.9996 121.8 48.4996 121.2 48.1996C120.7 47.8996 120.1 47.6996 119.5 47.6996C119.6 47.2996 119.6 46.8996 119.5 46.4996C119.4 45.7996 119 45.1996 118.5 44.7996C118 44.3996 117.3 44.0996 116.6 44.0996C116.2 44.0996 115.8 44.0996 115.4 44.2996C115.3 43.8996 115.2 43.4996 114.9 43.0996C114.5 42.4996 113.9 42.0996 113.3 41.7996C112.6 41.5996 111.9 41.5996 111.2 41.7996C110.9 41.8996 110.5 42.0996 110.3 42.3996C109.7 41.2996 108.5 40.6996 107.4 40.6996C106.3 40.6996 105.1 41.1996 104.6 42.3996C104.5 42.2996 104.3 42.1996 104.1 42.0996C103.6 41.7996 103.1 41.6996 102.6 41.6996C102.1 41.6996 101.5 41.7996 101.1 41.9996C100.6 42.1996 100.2 42.5996 99.9001 43.0996C99.7001 43.4996 99.5001 43.8996 99.4001 44.2996C99.0001 44.1996 98.6001 44.0996 98.2001 44.0996C97.5001 44.0996 96.9001 44.3996 96.3001 44.7996C95.8001 45.1996 95.4001 45.7996 95.3001 46.4996C95.2001 46.8996 95.2001 47.2996 95.3001 47.6996C94.9001 47.6996 94.5001 47.7996 94.1001 47.8996C93.5001 48.1996 92.9001 48.5996 92.6001 49.2996C92.3001 49.8996 92.1001 50.5996 92.2001 51.2996C92.3001 51.6996 92.4001 51.9996 92.6001 52.3996C92.2001 52.4996 91.8001 52.7996 91.5001 52.9996C91.0001 53.4996 90.6001 54.1996 90.5001 54.8996C90.4001 55.5996 90.6001 56.3996 91.0001 56.9996C91.2001 57.2996 91.5001 57.5996 91.7001 57.7996C91.4001 57.9996 91.1001 58.2996 90.9001 58.5996C90.8001 58.7996 90.7001 58.8996 90.6001 59.0996C79.9001 62.5996 70.8001 69.6996 64.8001 79.1996C64.1001 78.8996 63.5001 78.5996 62.8001 78.2996C62.6001 78.1996 62.4001 78.2996 62.2001 78.3996C61.8001 78.8996 61.4001 79.2996 61.1001 79.7996C60.6001 79.6996 60.1001 79.5996 59.6001 79.5996C56.0001 79.2996 52.4001 78.8996 48.9001 78.1996V48.9996H67.8001C68.5001 48.9996 69.2001 48.7996 69.8001 48.4996C70.4001 48.0996 70.9001 47.5996 71.3001 46.9996C71.7001 46.3996 71.8001 45.6996 71.8001 44.9996C71.8001 44.2996 71.6001 43.5996 71.3001 42.9996L50.9001 6.99961C50.5001 6.39961 50.0001 5.89961 49.4001 5.49961C48.2001 4.79961 46.6001 4.79961 45.4001 5.49961C44.8001 5.89961 44.3001 6.39961 43.9001 6.99961L23.1001 42.8996C22.7001 43.4996 22.6001 44.1996 22.6001 44.8996C22.6001 45.5996 22.8001 46.2996 23.1001 46.8996C23.5001 47.4996 24.0001 47.9996 24.6001 48.3996C25.2001 48.7996 25.9001 48.8996 26.6001 48.8996H45.5001V78.1996C45.5001 78.1996 45.5001 78.2996 45.4001 78.2996C45.3001 78.4996 45.3001 78.6996 45.5001 78.9996V84.6996C43.9001 85.3996 42.3001 86.0996 40.7001 86.8996C38.7001 88.1996 38.0001 88.9996 38.3001 89.5996C38.4001 89.8996 38.7001 90.0996 39.4001 90.0996C40.0001 90.0996 40.8001 89.9996 42.1001 89.5996C42.3001 89.4996 42.6001 89.4996 42.8001 89.3996C42.5001 89.5996 42.3001 89.7996 42.2001 89.8996C40.8001 90.9996 40.3001 91.6996 40.6001 92.2996C40.7001 92.4996 41.0001 92.6996 41.3001 92.6996C41.4001 92.6996 41.5001 92.6996 41.6001 92.6996C42.4001 92.3996 43.3001 91.9996 44.2001 91.6996C44.4001 91.5996 44.7001 91.4996 44.9001 91.3996C44.3001 92.1996 44.2001 92.7996 44.5001 93.1996C44.6001 93.3996 44.9001 93.4996 45.1001 93.4996C45.2001 93.4996 45.4001 93.4996 45.5001 93.3996C45.6001 93.3996 45.6001 93.2996 45.7001 93.2996V194H26.6001C26.3001 194 26.1001 194.2 26.1001 194.5C26.1001 194.8 26.3001 195 26.6001 195H176.9C177.2 195 177.4 194.8 177.4 194.5C177.4 194.2 177.2 194 176.9 194ZM94.7001 194L94.8001 193.9C95.1001 193.6 95.3001 193.2 95.4001 192.8C95.5001 192.4 95.6001 192 95.5001 191.6C95.3001 189.4 94.8001 187.2 94.1001 185.2C95.2001 178.6 96.8001 172.7 98.1001 167.9C99.4001 162.9 100.5 158.8 100.6 156C100.7 156 100.8 156 100.9 156C101.1 156 101.2 155.8 101.3 155.7L102.4 152.3C103.6 152.4 104.7 152.4 105.9 152.4C106.4 152.4 106.8 152.4 107.3 152.4C109.4 152.4 111.6 152.2 113.7 151.8C114.3 152.8 115 153.7 115.9 154.4L120.2 158.5C120.3 158.6 120.4 158.6 120.5 158.6C120.6 158.6 120.6 158.6 120.7 158.6C120.9 158.5 121.1 158.4 121.3 158.4L143.8 182.6C145.7 185.4 145.4 186.9 145.2 187.9C144.7 188.4 144.2 188.8 143.8 189.1C142.4 190.2 141.5 191 140.3 193.9H94.7001V194ZM49.3001 90.7996C49.7001 90.5996 50.0001 90.3996 50.3001 90.2996C51.9001 89.4996 53.6001 88.8996 55.3001 88.4996C55.4001 88.4996 55.6001 88.4996 55.7001 88.4996C55.8001 88.4996 55.8001 88.4996 55.9001 88.4996C56.6001 88.5996 57.3001 88.6996 58.0001 88.7996C58.0001 89.1996 57.9001 89.5996 57.9001 89.9996C57.9001 90.1996 58.0001 90.3996 58.2001 90.4996C58.8001 90.6996 59.3001 90.9996 59.8001 91.1996C58.5001 95.5996 57.9001 100.1 57.9001 104.7C57.9001 114.2 60.7001 123.3 65.9001 131.2C71.1001 139 78.3001 145 86.9001 148.7L86.0001 153C86.0001 153.2 86.1001 153.4 86.2001 153.5C86.4001 153.6 86.6001 153.7 86.8001 153.8L80.8001 184.9C75.8001 186.5 69.9001 190.8 66.4001 194.1H49.3001V90.7996ZM96.8001 101.3L87.1001 147.5C78.8001 143.9 71.8001 138 66.7001 130.5C61.6001 122.8 58.9001 113.8 58.8001 104.5C58.8001 100.1 59.4001 95.6996 60.6001 91.3996C64.1001 92.9996 66.5001 94.1996 69.0001 95.4996C70.6001 96.2996 72.2001 97.1996 74.2001 98.0996C75.5001 98.6996 76.9001 98.9996 78.3001 98.9996C78.4001 98.9996 78.6001 98.9996 78.7001 98.9996C80.2001 98.8996 81.7001 98.4996 83.1001 97.6996C86.8001 95.4996 90.0001 93.5996 93.4001 91.7996C94.3001 95.1996 95.4001 98.2996 96.8001 101.3ZM97.1001 156.3C97.9001 156.3 98.7001 156.2 99.6001 156.1C99.5001 158.8 98.5001 162.7 97.2001 167.6C95.9001 172.3 94.4001 178.2 93.2001 184.7C89.5001 185.7 85.6001 185.7 81.9001 184.7L87.8001 154.1C90.7001 155.6 93.9001 156.3 97.1001 156.3ZM111.7 147.7C112 148.8 112.4 149.9 113 151C110.6 151.4 108.2 151.6 105.8 151.5C104.7 151.5 103.7 151.5 102.6 151.4L108.1 134.1L111.7 147.7ZM139.4 159.3C142.6 163.6 149.7 172.3 150.9 173.7C149.6 177.7 148.1 179.1 144.1 181.7L122.1 158C124.1 157.2 125.9 156 127.6 154.6C127.7 154.6 127.7 154.6 127.8 154.5C127.9 154.5 127.9 154.4 127.9 154.3C129.1 153.2 130.2 152 131.2 150.7C134.3 153.4 137 156.2 139.4 159.3ZM127.6 153.5L123 148C122.8 147.8 122.5 147.8 122.3 147.9C122.1 148.1 122.1 148.4 122.2 148.6L126.8 154.1C125.1 155.5 123.2 156.6 121.2 157.3C121.2 157.3 121.2 157.3 121.1 157.3C120.9 157.4 120.7 157.5 120.5 157.5L116.4 153.6C114.6 151.9 113.3 149.7 112.6 147.2L108.6 132V131.9L103.9 114C103.8 113.7 103.6 113.6 103.3 113.6C103 113.7 102.9 113.9 102.9 114.2L107.6 132L100.3 154.8C98.8001 155 97.3001 155.1 95.9001 155L97.8001 148.1C97.9001 147.8 97.7001 147.6 97.5001 147.5C97.2001 147.4 97.0001 147.6 96.9001 147.8L95.0001 154.9C92.3001 154.6 89.6001 153.8 87.2001 152.4L97.9001 101.5C100.1 102.1 102.3 102.4 104.5 102.4C107.4 102.4 110.4 101.9 113.8 100.9C118.5 102.3 124 108.6 124.8 117.7L127.3 142.9C127.3 143 127.3 143 127.4 143.1L129 145.7L131.2 149.3C130 151.1 128.8 152.4 127.6 153.5ZM150.3 119.3C146.7 130.2 139.3 139.3 129.4 145.1L128.1 143L125.6 117.9C124.7 108.4 119.2 101.9 114 100.3C113.7 97.4996 113.9 94.6996 114.5 91.9996C116.5 93.4996 118.2 94.7996 119.9 95.9996C121.9 97.4996 123.9 98.9996 126.2 100.7C127.6 101.7 129.3 102.3 131.1 102.3C131.4 102.3 131.8 102.3 132.2 102.2C134.3 101.9 136.2 100.9 137.5 99.2996C141.3 94.6996 145.4 90.0996 148.9 86.3996C153.4 96.7996 153.9 108.5 150.3 119.3ZM159.4 83.9996C159.8 84.2996 160.2 84.4996 160.4 84.6996C159.9 84.4996 159.3 84.2996 158.7 84.0996C157.9 83.7996 157.1 83.5996 156.3 83.3996C156.7 83.3996 157.1 83.4996 157.4 83.4996C157.9 83.4996 158.3 83.5996 158.6 83.5996C158.9 83.6996 159.1 83.7996 159.4 83.9996ZM162.7 82.6996C163.2 82.8996 163.5 83.0996 163.8 83.1996C163.2 83.0996 162.5 82.9996 161.8 82.8996C160.7 82.6996 159.6 82.4996 158.7 82.4996C158.4 82.4996 157.9 82.4996 157.5 82.3996C156.5 82.2996 155.4 82.1996 154.2 82.1996C154.7 82.0996 155.1 81.9996 155.6 81.8996C156.9 81.6996 158.2 81.4996 159.5 81.4996C160.1 81.6996 161.4 82.1996 162.2 82.5996L162.7 82.6996ZM165.5 80.4996C165.2 80.5996 164.5 80.5996 163.1 80.5996C160.5 80.3996 157.9 80.4996 155.3 80.9996C153.4 81.3996 151.5 81.8996 149.6 82.5996C148.8 82.8996 148 83.0996 147.2 83.3996C145.8 82.7996 144.6 81.8996 143.7 80.6996C143 79.8996 142.3 78.7996 142.1 77.6996C142.2 77.6996 142.4 77.5996 142.5 77.4996C142.8 77.3996 143.3 77.1996 143.8 76.9996C144 76.9996 144.1 76.9996 144.3 76.9996C146.9 77.0996 150.7 77.4996 153.1 77.7996C158.7 78.5996 162.4 79.1996 163.3 79.4996C164.6 79.9996 165.2 80.2996 165.5 80.4996ZM154.1 72.9996C155.1 72.4996 155.7 72.2996 156.1 72.1996C156 72.3996 155.7 72.6996 155.5 72.9996C155.3 73.1996 155 73.4996 154.6 73.7996C153.3 74.8996 152.3 75.7996 152.3 76.5996C150.5 76.3996 148.4 76.1996 146.5 75.9996C146.5 75.9996 146.5 75.9996 146.6 75.9996C149.1 75.0996 152.3 73.7996 154.1 72.9996ZM142.1 74.9996C142 75.0996 141.8 75.1996 141.7 75.2996C137.6 78.7996 134 82.7996 130.8 87.0996C128.9 85.4996 120.9 78.9996 115.3 75.5996C113.1 74.2996 111.4 73.9996 110.2 74.1996C109.7 74.1996 109.3 74.2996 109 74.3996C109.4 74.1996 109.8 73.8996 110 73.4996C110.1 73.3996 110.2 73.1996 110.3 73.0996C110.6 73.3996 110.9 73.5996 111.2 73.6996C111.9 73.9996 112.6 73.9996 113.3 73.7996C114 73.5996 114.6 73.0996 115 72.5996C115.2 72.1996 115.4 71.7996 115.5 71.3996C115.9 71.4996 116.3 71.5996 116.7 71.5996C117.4 71.5996 118 71.2996 118.6 70.8996C119.1 70.4996 119.5 69.8996 119.7 69.1996C119.8 68.7996 119.8 68.3996 119.7 67.9996C120.1 67.9996 120.6 67.8996 121 67.6996C121.7 67.3996 122.2 66.8996 122.5 66.1996C122.8 65.5996 122.9 64.8996 122.7 64.2996C122.6 63.8996 122.5 63.5996 122.3 63.2996C122.8 63.0996 123.2 62.8996 123.6 62.4996C123.9 62.1996 124.1 61.7996 124.3 61.3996C131.1 64.3996 137.3 69.0996 142.1 74.9996ZM101.5 75.5996C102 75.1996 102.3 74.3996 102.4 73.5996L103.9 71.4996V71.0996C103.9 71.0996 103.9 70.9996 103.8 70.9996C103.8 70.9996 103.8 70.9996 103.7 70.8996H103.3C103.3 70.8996 100.1 71.8996 98.8001 70.4996C97.8001 69.3996 98.1001 67.1996 99.5001 63.8996C100.6 61.3996 101.8 59.9996 102.8 60.1996C103.9 60.3996 104.9 62.4996 105 64.1996C105 64.5996 105.1 65.1996 105.5 65.3996C106 65.5996 106.5 65.2996 107 64.7996C107.3 64.5996 107.6 64.4996 107.8 64.5996C108 64.6996 108.1 64.8996 108.1 65.1996C108.1 65.4996 108 66.4996 106.4 67.3996C105.5 67.8996 105.1 68.9996 105.6 73.1996C105.8 74.7996 106.1 75.4996 106.6 75.7996C107.1 76.0996 107.7 75.8996 108.4 75.6996C108.6 75.5996 108.8 75.5996 109 75.4996C106.4 78.9996 104.2 82.7996 102.6 86.7996C100.7 83.2996 99.0001 77.5996 98.4001 75.5996C98.9001 75.6996 99.5001 75.7996 100.1 75.8996C100.6 75.9996 101.1 75.8996 101.5 75.5996ZM107.4 74.7996C107.6 74.7996 107.8 74.7996 107.9 74.6996C107.5 74.7996 107.2 74.8996 107.1 74.8996C107.1 74.8996 107 74.7996 107 74.6996C107.1 74.6996 107.2 74.7996 107.4 74.7996ZM90.7001 60.1996C90.7001 60.3996 90.7001 60.4996 90.7001 60.6996C90.8001 61.3996 91.1001 62.0996 91.7001 62.5996C92.0001 62.8996 92.4001 63.0996 92.8001 63.1996C92.6001 63.4996 92.5001 63.8996 92.4001 64.2996C92.3001 64.9996 92.4001 65.6996 92.7001 66.2996C93.0001 66.8996 93.6001 67.3996 94.2001 67.6996C94.6001 67.8996 95.0001 67.8996 95.4001 67.8996C95.4001 68.1996 95.3001 68.3996 95.4001 68.6996C95.4001 69.1996 95.6001 69.7996 96.0001 70.1996C96.3001 70.5996 96.7001 70.9996 97.2001 71.1996C97.6001 71.3996 98.1001 71.4996 98.6001 71.4996C99.5001 72.0996 100.5 72.1996 101.5 72.0996C101.5 73.3996 101.3 74.4996 100.9 74.7996C100.8 74.8996 100.7 74.9996 100.4 74.8996C99.5001 74.6996 98.7001 74.5996 97.9001 74.4996H97.8001C95.2001 74.2996 93.7001 75.0996 91.8001 76.4996C87.6001 79.6996 79.5001 84.3996 78.0001 85.2996C73.6001 82.6996 70.2001 81.1996 66.3001 79.5996C71.9001 70.4996 80.6001 63.6996 90.7001 60.1996ZM63.1001 79.3996C64.0001 79.7996 64.8001 80.0996 65.7001 80.4996C69.7001 82.1996 73.1001 83.5996 77.6001 86.2996C77.8001 86.3996 77.9001 86.3996 78.1001 86.2996C78.2001 86.1996 87.6001 80.8996 92.3001 77.2996C93.9001 75.9996 95.2001 75.3996 97.3001 75.4996C97.8001 77.1996 100 84.4996 102.2 88.1996C102.3 88.2996 102.5 88.3996 102.6 88.3996C102.8 88.3996 103 88.2996 103 88.0996C104.7 83.3996 107.2 78.9996 110.3 75.0996C111.4 74.9996 112.8 75.2996 114.6 76.3996C121 80.2996 130.3 88.0996 130.4 88.1996C130.5 88.2996 130.6 88.2996 130.7 88.2996C130.7 88.2996 130.7 88.2996 130.8 88.2996C130.9 88.2996 131.1 88.1996 131.1 88.0996C134 84.0996 137.3 80.4996 140.9 77.1996C140.9 77.2996 140.9 77.2996 140.9 77.3996C140.9 77.4996 140.9 77.5996 141 77.6996C141.3 79.2996 142.4 80.7996 142.8 81.2996C143.8 82.5996 145.2 83.5996 146.7 84.2996C146.8 84.3996 146.9 84.3996 147 84.3996C147.4 84.5996 147.9 84.6996 148.3 84.7996C148.4 84.7996 148.6 84.7996 148.7 84.8996C148.6 84.9996 148.6 85.0996 148.5 85.0996C148.5 85.0996 148.5 85.0996 148.4 85.1996C144.7 88.9996 140.4 93.7996 136.4 98.6996C135.2 100.1 133.5 101.1 131.7 101.3C129.9 101.5 128 101.1 126.5 99.9996C124.2 98.2996 122.2 96.8996 120.2 95.2996C118.5 93.9996 116.6 92.5996 114.4 90.9996C114.7 89.9996 115 88.9996 115.3 87.9996C115.4 87.6996 115.3 87.4996 115 87.3996C114.7 87.2996 114.5 87.3996 114.4 87.6996C114 88.7996 113.6 89.8996 113.4 91.0996C113.4 91.1996 113.4 91.1996 113.4 91.2996C112.7 94.2996 112.5 97.3996 112.7 100.5C106.9 102.2 102.5 102.4 97.3001 101C94.7001 95.3996 93.1001 89.4996 92.7001 83.3996C92.7001 83.0996 92.5001 82.8996 92.2001 82.8996C91.9001 82.8996 91.7001 83.1996 91.7001 83.3996C91.9001 85.9996 92.2001 88.4996 92.8001 90.9996C89.3001 92.8996 86.0001 94.7996 82.2001 97.0996C81.0001 97.7996 79.7001 98.1996 78.3001 98.2996C76.9001 98.3996 75.6001 98.0996 74.3001 97.4996C72.3001 96.4996 70.7001 95.6996 69.1001 94.8996C66.1001 93.2996 63.2001 91.7996 58.4001 89.7996C58.4001 89.3996 58.5001 88.9996 58.5001 88.5996C58.5001 88.5996 58.5001 88.5996 58.5001 88.4996V88.3996C59.5001 84.9996 60.9001 81.8996 63.1001 79.3996ZM49.3001 81.5996C49.9001 81.9996 50.5001 82.2996 50.6001 82.5996C50.6001 82.5996 50.6001 82.6996 50.4001 82.7996C50.0001 82.8996 49.7001 83.0996 49.3001 83.1996V81.5996ZM51.5001 82.3996C51.3001 81.6996 50.4001 81.0996 49.0001 80.3996C48.9001 80.2996 48.7001 80.2996 48.6001 80.1996C48.1001 79.9996 47.7001 79.6996 47.5001 79.5996C47.3001 79.4996 47.0001 79.1996 46.7001 78.9996C47.1001 78.9996 47.7001 79.0996 48.8001 79.2996C51.5001 79.8996 54.3001 80.2996 57.1001 80.5996C55.2001 80.9996 53.3001 81.6996 51.5001 82.3996ZM25.1001 47.5996C24.6001 47.2996 24.3001 46.8996 24.0001 46.4996C23.7001 45.9996 23.6001 45.4996 23.6001 44.9996C23.6001 44.4996 23.7001 43.8996 24.0001 43.4996L44.7001 7.49961C45.0001 6.99961 45.4001 6.69961 45.9001 6.39961C46.8001 5.89961 48.0001 5.89961 48.9001 6.39961C49.4001 6.69961 49.7001 6.99961 50.0001 7.49961L70.7001 43.3996C71.0001 43.8996 71.1001 44.3996 71.1001 44.8996C71.1001 45.3996 71.0001 45.9996 70.7001 46.3996C70.4001 46.8996 70.1001 47.1996 69.6001 47.4996C69.1001 47.7996 68.6001 47.8996 68.1001 47.8996H48.8001L46.0001 47.9996H26.6001C26.1001 47.9996 25.6001 47.8996 25.1001 47.5996ZM41.7001 88.6996C40.4001 89.0996 39.7001 89.1996 39.4001 89.1996C39.6001 88.9996 40.1001 88.4996 41.2001 87.7996C47.0001 84.9996 53.0001 82.6996 59.2001 80.7996C59.8001 80.5996 60.4001 80.5996 61.0001 80.6996C59.6001 82.7996 58.7001 85.1996 58.3001 87.5996C55.4001 87.1996 52.4001 86.9996 49.5001 87.0996C46.7001 87.3996 44.2001 87.8996 41.7001 88.6996ZM43.6001 90.6996C43.0001 90.9996 42.3001 91.1996 41.7001 91.4996C41.9001 91.2996 42.2001 90.9996 42.6001 90.6996C43.0001 90.3996 44.5001 89.2996 45.3001 88.7996C46.6001 88.4996 47.9001 88.3996 49.3001 88.1996C49.8001 88.1996 50.4001 88.1996 50.9001 88.1996C49.6001 88.4996 48.4001 88.8996 47.3001 89.2996L46.4001 89.5996H46.2001C45.6001 89.8996 44.6001 90.2996 43.6001 90.6996ZM46.2001 91.1996C46.3001 91.0996 46.4001 90.9996 46.6001 90.7996L46.8001 90.5996L47.7001 90.2996C48.1001 90.1996 48.5001 89.9996 49.0001 89.8996C48.3001 90.2996 47.5001 90.7996 46.8001 91.1996C46.3001 91.4996 45.8001 91.7996 45.4001 92.0996C45.6001 91.7996 45.8001 91.4996 46.2001 91.1996Z"
        fill="currentColor"
      />
      <path
        d="M140.8 61.4996L146.7 60.2996C148.8 62.1996 151.4 63.4996 154.2 64.0996C155.2 64.2996 156.2 64.3996 157.1 64.3996C159.8 64.3996 162.5 63.6996 164.8 62.1996C167.9 60.2996 170 57.2996 170.7 53.8996C171.3 50.6996 170.6 47.2996 168.7 44.4996C166.5 41.2996 163 39.0996 159.1 38.2996C155.4 37.5996 151.6 38.2996 148.5 40.1996C145.4 42.0996 143.3 45.0996 142.6 48.4996C142.2 50.8996 142.4 53.3996 143.4 55.5996L140.3 60.6996C140.2 60.8996 140.2 61.0996 140.3 61.1996C140.4 61.4996 140.6 61.5996 140.8 61.4996ZM144.3 55.9996C144.4 55.8996 144.4 55.6996 144.3 55.4996C143.3 53.3996 143 50.9996 143.4 48.6996C144 45.4996 145.9 42.7996 148.8 40.9996C151.7 39.1996 155.2 38.5996 158.7 39.1996C162.4 39.8996 165.6 41.9996 167.7 44.8996C169.5 47.4996 170.1 50.5996 169.6 53.4996C169 56.6996 167.1 59.3996 164.2 61.1996C161.3 62.9996 157.8 63.5996 154.3 62.9996C151.6 62.4996 149.1 61.1996 147.1 59.2996C147 59.1996 146.9 59.1996 146.8 59.1996H146.7L141.7 60.1996L144.3 55.9996Z"
        fill="currentColor"
      />
      <path
        d="M154.7 47.8996C155 47.8996 155.2 47.5996 155.1 47.2996C155.1 46.9996 155.1 46.7996 155.2 46.4996C155.3 46.1996 155.4 45.9996 155.6 45.7996C155.8 45.5996 156 45.3996 156.3 45.2996C156.5 45.1996 156.8 45.0996 157.1 45.1996C157.8 45.1996 158.4 45.5996 158.7 46.1996C159.1 47.0996 158.8 48.2996 157.8 49.5996C156.8 50.9996 156.3 51.6996 156.3 52.7996C156.3 53.0996 156.5 53.2996 156.8 53.2996C157.1 53.2996 157.3 53.0996 157.3 52.7996C157.3 52.0996 157.6 51.5996 158.6 50.1996C160.3 47.9996 160 46.4996 159.6 45.6996C159.2 44.7996 158.3 44.1996 157.2 44.1996C156.8 44.1996 156.4 44.2996 156 44.3996C155.6 44.5996 155.3 44.7996 155 45.0996C154.7 45.3996 154.5 45.7996 154.4 46.1996C154.3 46.5996 154.2 46.9996 154.3 47.3996C154.2 47.6996 154.5 47.8996 154.7 47.8996Z"
        fill="currentColor"
      />
      <path
        d="M148 144.4C148 144.7 148.2 144.9 148.5 144.9H152.6C152.9 144.9 153.1 144.7 153.1 144.4C153.1 144.1 152.9 143.9 152.6 143.9H148.5C148.3 143.9 148 144.1 148 144.4Z"
        fill="currentColor"
      />
      <path
        d="M164.4 144.4C164.4 144.1 164.2 143.9 163.9 143.9H159.8C159.5 143.9 159.3 144.1 159.3 144.4C159.3 144.7 159.5 144.9 159.8 144.9H163.9C164.2 144.9 164.4 144.7 164.4 144.4Z"
        fill="currentColor"
      />
      <path
        d="M156.2 141.3C156.5 141.3 156.7 141.1 156.7 140.8V136.7C156.7 136.4 156.5 136.2 156.2 136.2C155.9 136.2 155.7 136.4 155.7 136.7V140.8C155.7 141 156 141.3 156.2 141.3Z"
        fill="currentColor"
      />
      <path
        d="M156.3 152.6C156.6 152.6 156.8 152.4 156.8 152.1V148C156.8 147.7 156.6 147.5 156.3 147.5C156 147.5 155.8 147.7 155.8 148V152.1C155.8 152.4 156 152.6 156.3 152.6Z"
        fill="currentColor"
      />
      <path
        d="M153.7 142.3C153.8 142.3 154 142.3 154.1 142.2C154.3 142 154.3 141.7 154.1 141.5L151.2 138.6C151 138.4 150.7 138.4 150.5 138.6C150.3 138.8 150.3 139.1 150.5 139.3L153.4 142.2C153.4 142.3 153.6 142.3 153.7 142.3Z"
        fill="currentColor"
      />
      <path
        d="M161.4 150.2C161.5 150.3 161.6 150.3 161.8 150.3C161.9 150.3 162.1 150.3 162.2 150.2C162.4 150 162.4 149.7 162.2 149.5L159.3 146.6C159.1 146.4 158.8 146.4 158.6 146.6C158.4 146.8 158.4 147.1 158.6 147.3L161.4 150.2Z"
        fill="currentColor"
      />
      <path
        d="M159.2 142.2L162.1 139.3C162.3 139.1 162.3 138.8 162.1 138.6C161.9 138.4 161.6 138.4 161.4 138.6L158.5 141.5C158.3 141.7 158.3 142 158.5 142.2C158.6 142.3 158.7 142.3 158.9 142.3C159.1 142.3 159.1 142.3 159.2 142.2Z"
        fill="currentColor"
      />
      <path
        d="M150.8 150.3C150.9 150.3 151.1 150.3 151.2 150.2L154.1 147.3C154.3 147.1 154.3 146.8 154.1 146.6C153.9 146.4 153.6 146.4 153.4 146.6L150.5 149.5C150.3 149.7 150.3 150 150.5 150.2C150.6 150.3 150.7 150.3 150.8 150.3Z"
        fill="currentColor"
      />
      <path
        d="M73.4001 29.6996C73.6001 29.8996 73.9001 30.0996 74.2001 30.0996C74.4001 30.1996 74.7001 30.1996 74.9001 30.1996C75.0001 30.1996 75.0001 30.1996 75.1001 30.1996C75.4001 30.1996 75.7001 30.0996 76.0001 29.8996C76.3001 29.7996 76.5001 29.5996 76.7001 29.2996C76.9001 29.0996 77.1001 28.7996 77.1001 28.4996C77.2001 28.1996 77.2001 27.8996 77.2001 27.5996C77.1001 26.9996 76.8001 26.3996 76.3001 25.9996C75.8001 25.5996 75.2001 25.3996 74.5001 25.4996C73.9001 25.5996 73.3001 25.8996 72.9001 26.3996C72.5001 26.8996 72.3001 27.4996 72.4001 28.1996C72.4001 28.4996 72.5001 28.7996 72.7001 29.0996C73.0001 29.2996 73.2001 29.4996 73.4001 29.6996ZM73.9001 26.9996C74.1001 26.6996 74.5001 26.4996 74.8001 26.4996H74.9001C75.2001 26.4996 75.5001 26.5996 75.8001 26.7996C76.1001 26.9996 76.3001 27.3996 76.3001 27.6996C76.3001 27.8996 76.3001 28.0996 76.2001 28.1996C76.1001 28.3996 76.1001 28.4996 75.9001 28.6996C75.8001 28.7996 75.6001 28.9996 75.5001 28.9996C75.3001 29.0996 75.2001 29.0996 75.0001 29.1996C74.8001 29.1996 74.6001 29.1996 74.5001 29.0996C74.3001 28.9996 74.2001 28.9996 74.0001 28.7996C73.9001 28.6996 73.7001 28.4996 73.7001 28.3996C73.6001 28.1996 73.6001 28.0996 73.5001 27.8996C73.6001 27.5996 73.7001 27.2996 73.9001 26.9996Z"
        fill="currentColor"
      />
      <path
        d="M65.3001 168.7H62.0001V165.4C62.0001 165.1 61.8001 164.9 61.5001 164.9C61.2001 164.9 61.0001 165.1 61.0001 165.4V168.7H57.7001C57.4001 168.7 57.2001 168.9 57.2001 169.2C57.2001 169.5 57.4001 169.7 57.7001 169.7H61.0001V173C61.0001 173.3 61.2001 173.5 61.5001 173.5C61.8001 173.5 62.0001 173.3 62.0001 173V169.7H65.3001C65.6001 169.7 65.8001 169.5 65.8001 169.2C65.8001 168.9 65.6001 168.7 65.3001 168.7Z"
        fill="currentColor"
      />
      <path
        d="M119.1 111.4C115.8 111.5 113 110 110.5 107C110.3 106.8 110 106.8 109.8 106.9C109.6 107.1 109.6 107.4 109.7 107.6C112.3 110.8 115.4 112.4 118.9 112.4H119C119.3 112.4 119.5 112.2 119.5 111.9C119.6 111.6 119.4 111.4 119.1 111.4Z"
        fill="currentColor"
      />
      <path
        d="M47.4001 39.7996C47.9001 39.7996 48.3001 39.5996 48.7001 39.2996C49.0001 38.9996 49.2001 38.4996 49.2001 37.9996C49.2001 37.4996 49.0001 37.0996 48.7001 36.6996C48.0001 35.9996 46.8001 35.9996 46.1001 36.6996C45.8001 36.9996 45.6001 37.4996 45.6001 37.9996C45.6001 38.4996 45.8001 38.8996 46.1001 39.2996C46.4001 39.5996 46.9001 39.7996 47.4001 39.7996ZM46.8001 37.3996C47.0001 37.1996 47.2001 37.1996 47.4001 37.1996C47.6001 37.1996 47.8001 37.2996 48.0001 37.3996C48.2001 37.4996 48.2001 37.7996 48.2001 37.9996C48.2001 38.1996 48.1001 38.3996 48.0001 38.5996C47.7001 38.8996 47.2001 38.8996 46.8001 38.5996C46.6001 38.3996 46.6001 38.1996 46.6001 37.9996C46.6001 37.7996 46.6001 37.5996 46.8001 37.3996Z"
        fill="currentColor"
      />
      <path
        d="M47.4001 32.4996C47.7001 32.4996 47.9001 32.2996 47.9001 31.9996V19.2996C47.9001 18.9996 47.7001 18.7996 47.4001 18.7996C47.1001 18.7996 46.9001 18.9996 46.9001 19.2996V31.9996C46.9001 32.2996 47.1001 32.4996 47.4001 32.4996Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default WeGotAProblemImage
