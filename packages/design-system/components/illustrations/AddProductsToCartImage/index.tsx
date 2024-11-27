import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const AddProductsToCartImage: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 200, color: 'primary.dark', ...sx }} {...props}>
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M137.1 30.5002C137.6 30.8002 138.1 30.9002 138.6 30.9002C138.7 30.9002 138.7 30.9002 138.8 30.9002C139.4 30.9002 140 30.6002 140.5 30.3002C141 29.9002 141.3 29.4002 141.5 28.8002C141.7 28.2002 141.7 27.6002 141.6 27.0002C141.4 26.2002 140.9 25.5002 140.2 25.1002C139.5 24.7002 138.7 24.6002 137.9 24.8002C137.3 25.0002 136.8 25.3002 136.4 25.7002C136 26.2002 135.7 26.7002 135.7 27.3002C135.6 27.9002 135.7 28.5002 136 29.1002C136.1 29.7002 136.5 30.2002 137.1 30.5002ZM137 26.4002C137.3 26.1002 137.6 25.9002 138 25.8002C138.2 25.8002 138.4 25.7002 138.5 25.7002C138.9 25.7002 139.2 25.8002 139.5 26.0002C140 26.3002 140.3 26.7002 140.5 27.3002C140.6 27.7002 140.6 28.1002 140.5 28.5002C140.4 28.9002 140.1 29.2002 139.8 29.5002C139.5 29.8002 139.1 29.9002 138.7 29.9002C138.3 29.9002 137.9 29.8002 137.5 29.6002C137.1 29.4002 136.9 29.1002 136.7 28.7002C136.5 28.3002 136.5 27.9002 136.5 27.5002C136.6 27.1002 136.8 26.7002 137 26.4002Z"
        fill="currentColor"
      />
      <path
        d="M145.9 29.5002C145.5 29.6002 145 29.8002 144.7 30.1002C144.4 30.4002 144.1 30.8002 143.9 31.2002C143.7 31.6002 143.6 32.1002 143.6 32.5002C143.6 32.9002 143.7 33.4002 143.9 33.8002C144.2 34.5002 144.8 35.0002 145.5 35.3002C145.9 35.4002 146.3 35.5002 146.6 35.5002C147 35.5002 147.3 35.4002 147.7 35.3002C148.4 35.0002 149 34.5002 149.4 33.8002C149.8 33.1002 149.8 32.3002 149.6 31.6002C149.4 30.8002 148.9 30.1002 148.2 29.7002C147.5 29.4002 146.7 29.2002 145.9 29.5002ZM147.8 30.6002C148.3 30.9002 148.6 31.3002 148.8 31.9002C148.9 32.4002 148.9 32.9002 148.6 33.4002C148.4 33.9002 148 34.2002 147.5 34.4002C147 34.6002 146.5 34.6002 146 34.4002C145.5 34.2002 145.1 33.8002 144.9 33.4002C144.8 33.1002 144.7 32.8002 144.7 32.5002C144.7 32.2002 144.8 31.9002 144.9 31.6002C145 31.3002 145.2 31.1002 145.5 30.9002C145.7 30.7002 146 30.6002 146.3 30.5002C146.5 30.5002 146.6 30.4002 146.8 30.4002C147.1 30.4002 147.4 30.4002 147.8 30.6002Z"
        fill="currentColor"
      />
      <path
        d="M138.2 37.7002C138.3 37.7002 138.4 37.8002 138.5 37.8002C138.7 37.8002 138.8 37.7002 138.9 37.6002L147.3 23.2002C147.4 23.0002 147.4 22.7002 147.1 22.5002C146.9 22.4002 146.6 22.4002 146.4 22.7002L138 37.0002C137.9 37.3002 138 37.6002 138.2 37.7002Z"
        fill="currentColor"
      />
      <path
        d="M178 110.1C177.9 109.5 177.7 108.9 177.4 108.4C176.9 107.6 176.2 107 175.4 106.6C174.7 106.3 174 106.2 173.2 106.2L166.6 73.7002L161.5 48.0002L167.7 42.5002C168.1 42.8002 168.5 43.0002 168.9 43.0002C169.1 43.0002 169.2 43.0002 169.4 43.0002C169.8 43.0002 170.2 42.9002 170.5 42.8002C171 42.6002 171.4 42.2002 171.7 41.7002C172 41.2002 172.1 40.7002 172.1 40.1002C172.1 39.5002 171.9 39.0002 171.6 38.6002C171.3 38.1002 170.8 37.8002 170.3 37.6002C169.7 37.4002 169 37.3002 168.4 37.5002C167.8 37.7002 167.3 38.1002 166.9 38.7002C166.6 39.2002 166.4 39.9002 166.5 40.5002C166.5 40.9002 166.7 41.3002 166.9 41.6002L160.5 47.3002C160.4 47.4002 160.3 47.6002 160.3 47.8002L163 61.4002L106.1 97.6002C106 97.7002 105.9 97.8002 105.9 98.0002C105.9 98.2002 105.9 98.3002 106.1 98.4002L128.4 118.5C128.5 118.6 128.6 118.6 128.7 118.6C128.8 118.6 128.9 118.6 128.9 118.5L170 96.1002L172 106.2C171.3 106.4 170.6 106.7 170.1 107.3C169.4 107.9 168.9 108.7 168.7 109.6C168.5 110.5 168.5 111.4 168.9 112.3C169 112.5 169.1 112.7 169.2 112.9L149 127C148.4 126.2 147.6 125.6 146.7 125.2C145.8 124.9 144.7 124.9 143.8 125.2C142.9 125.5 142 126.1 141.4 126.9C141 127.4 140.8 128 140.6 128.5C140.5 129.1 140.4 129.7 140.5 130.3C140.6 130.9 140.8 131.5 141.1 132C141.6 132.8 142.4 133.5 143.3 133.9C143.9 134.1 144.5 134.2 145 134.2C145.4 134.2 145.8 134.2 146.2 134.1C147.2 133.8 148 133.3 148.7 132.5C149.3 131.7 149.7 130.8 149.7 129.8C149.7 129.1 149.6 128.5 149.4 127.9L169.8 113.9C170 114.2 170.3 114.4 170.6 114.6C171.3 115.1 172.2 115.5 173.2 115.5C173.3 115.5 173.3 115.5 173.4 115.5C174.3 115.5 175.1 115.3 175.8 114.8C176.9 114.2 177.6 113.1 177.9 111.9C178 111.3 178.1 110.7 178 110.1ZM128.9 117.6L107.3 98.2002L163.3 62.5002L165.3 72.6002L169.8 95.1002L128.9 117.6Z"
        fill="currentColor"
      />
      <path
        d="M141.9 155.9C141.9 155.8 141.8 155.8 141.7 155.8C140.6 155.1 139.4 154.4 138.2 153.8C135.6 152.4 133.4 150.5 131.4 148.3L131 147.9C133.1 145.2 133.9 143 132.9 141.9C132.8 141.8 132.8 141.8 132.7 141.7C132.7 141.7 132.7 141.6 132.6 141.6L103.9 115.4C102.5 114.1 100.8 112.9 99.1 112C89.6 106.8 79.6 102.1 69.6 98.1002C69.5 97.7002 69.4 97.2002 69.2 96.8002C70.9 93.7002 72.4 90.5002 73.6 87.3002C74.2 87.7002 74.8 88.0002 75.4 88.4002C75.5 88.5002 75.5 88.5002 75.6 88.5002C77.8 89.8002 80.1 90.8002 82.5 91.6002C84.2 92.2002 86.1 92.3002 87.9 91.7002C94.6 89.7002 101.2 87.1002 107.5 84.1002C107.7 84.0002 107.8 83.8002 107.8 83.6002C107.8 83.5002 107.8 83.4002 107.7 83.2002C109.3 82.6002 114.9 80.6002 118.3 77.7002C119.3 78.0002 120.4 78.2002 121.5 78.3002C121.6 78.3002 121.8 78.3002 121.9 78.3002C124.9 78.3002 127.7 77.2002 129.9 75.3002C132.2 73.3002 133.7 70.4002 134 67.4002C134.3 64.3002 133.4 61.3002 131.6 58.8002C129.7 56.3002 127 54.7002 124 54.2002C120.9 53.7002 117.8 54.3002 115.2 56.0002C112.6 57.7002 110.8 60.3002 110 63.3002C109.3 66.2002 109.7 69.1002 111 71.7002C108.9 73.0002 106.7 74.3002 104.4 75.3002C104.3 75.2002 104.3 75.1002 104.2 75.0002C104.1 74.8002 103.8 74.8002 103.6 74.9002C98 77.5002 92.2 79.3002 86.1 80.5002C81.5 78.8002 77.1 76.6002 73 73.9002C73 73.9002 73 73.9002 72.9 73.8002C72.6 73.6002 72.3 73.4002 72 73.2002C70.7 72.3002 70.9 70.5002 71.3 69.3002C72.4 69.7002 73.4 69.7002 74.2 69.2002C75.7 68.3002 76.4 66.0002 76.5 62.3002C76.5 62.1002 76.5 61.8002 76.5 61.6002V61.3002C76.5 60.6002 76.5 59.7002 76.5 58.9002C76.7 58.0002 76.6 57.1002 76.5 56.2002C77 55.4002 77.2 54.5002 77.1 53.6002C77 52.6002 76.6 51.7002 75.9 51.0002C75.2 50.3002 74.3 49.9002 73.3 49.8002C72.4 49.7002 71.5 49.9002 70.7 50.4002C69.4 50.1002 68.1 50.2002 66.8 50.7002C66.4 50.1002 65.8 49.6002 65.1 49.2002C64.3 48.8002 63.4 48.5002 62.5 48.5002C61.6 48.5002 60.7 48.7002 59.9 49.2002C59.1 49.7002 58.4 50.3002 58 51.1002C57.5 51.9002 57.3 52.8002 57.3 53.7002C57.3 54.6002 57.5 55.5002 57.9 56.3002C58.3 57.1002 59 57.8002 59.7 58.3002C60.4 58.7002 61.1 59.0002 61.8 59.1002C62.1 60.7002 62.8 62.1002 63.9 63.2002C63.9 63.2002 67.3 67.3002 65.2 69.1002C64.4 69.4002 63.4 69.1002 62.3 68.1002C52 59.1002 44.9 52.0002 37.4 39.5002C37.4 39.4002 37.3 39.4002 37.3 39.4002C37.1 39.1002 36.8 38.9002 36.5 38.8002C36.2 38.7002 36 38.7002 35.7 38.7002C34.5 36.5002 33.2 33.4002 33.6 30.9002C34.2 27.7002 33.9 26.9002 33.3 26.7002C32.7 26.5002 32 27.0002 30.7 29.7002C30.3 28.5002 29.9 27.3002 29.6 26.0002C28.9 23.2002 28.2 22.9002 27.7 22.9002C27.2 23.0002 26.8 23.3002 26.7 25.6002C26 23.4002 25.4 22.6002 24.7 22.7002C24.3 22.8002 23.8 23.2002 24 25.6002C23.7 25.4002 23.5 25.4002 23.3 25.4002C23 25.5002 22.2 25.6002 22.7 29.2002C22.8 30.1002 23 30.9002 23.3 31.8002C23 31.7002 22.8 31.6002 22.5 31.8002C21.7 32.2002 22.2 33.5002 22.8 34.8002C24.2 37.8002 26.2 41.5002 27.7 44.1002C27.6 44.4002 27.5 44.7002 27.5 45.0002C27.5 45.3002 27.6 45.6002 27.7 45.9002C27.7 46.0002 27.7 46.0002 27.7 46.1002C32.3 55.4002 41.8 66.2002 53.7 76.0002C55.3 81.7002 56.7 87.5002 57.8 93.3002C56 94.8002 45.3 104 48.3 112.6C50.7 119.7 61.1 125.4 79.3 129.7C77.1 141.3 74.1 152.8 70.6 164C70.5 164.2 70.5 164.4 70.5 164.6C70.3 166.3 72.5 168 76.5 169.2L75.6 176.6C75.6 176.7 75.6 176.8 75.6 176.9C76.7 180.1 79.1 186.7 87.9 194.9C88 195 88.1 195 88.2 195H88.3C88.5 195 88.6 194.8 88.7 194.7C89.7 191.8 89.5 187.7 89.2 184.2V184.1C89 182.3 88.8 180.7 88.6 179.5C88.1 176.6 88.1 173.7 88.4 170.7V170.4C92 170.1 94.3 169 94.6 167.5C94.6 167.4 94.7 167.4 94.7 167.3C96.1 154.9 96.6 142.3 96.2 129.8L114.6 157C114.7 157.1 114.7 157.3 114.8 157.4C115.2 157.8 115.7 158 116.5 158C117.9 158 119.9 157.2 122.3 155.8L127.9 161.8C128 161.9 128 161.9 128.1 161.9C132.8 163.6 137.8 164.4 142.7 164.4C145.4 164.4 148 164.2 150.7 163.7C150.9 163.7 151 163.5 151.1 163.4C151.2 163.2 151.1 163 151 162.9C148.1 160.2 145.1 157.9 141.9 155.9ZM137.8 154.6C138.7 155.1 139.5 155.6 140.4 156.1C135.7 157.6 130.8 158.3 125.9 158.3L118.6 150.5C119.8 149.2 121.1 147.9 122 147.2C122.8 146.5 124.4 145.3 126.3 144.2L130.2 148.2L130.8 148.8C132.7 151.2 135.1 153.1 137.8 154.6ZM116.9 77.6002C116.9 77.4002 116.9 77.2002 116.8 76.9002C117 77.0002 117.2 77.1002 117.4 77.2002C117.2 77.4002 117.1 77.5002 116.9 77.6002ZM111.3 63.4002C112 60.6002 113.7 58.3002 116 56.7002C118.4 55.1002 121.2 54.5002 124 55.0002C126.8 55.5002 129.3 57.0002 131 59.3002C132.7 61.6002 133.5 64.4002 133.2 67.2002C132.9 70.0002 131.6 72.6002 129.4 74.5002C127.3 76.4002 124.5 77.4002 121.7 77.3002C118.9 77.2002 116.2 76.0002 114.2 74.0002L114.1 73.9002C114 73.8002 113.9 73.7002 113.8 73.5002C114.6 72.8002 116.8 70.8002 116.9 69.5002C117 69.0002 116.7 68.8002 116.6 68.7002C116 68.3002 114.9 69.0002 112.7 70.5002C112.5 70.7002 112.3 70.8002 112.1 70.9002C111 68.7002 110.6 66.0002 111.3 63.4002ZM112.2 72.2002C112.5 72.0002 112.9 71.7002 113.4 71.4002C114.1 70.9002 115.3 70.1002 115.9 69.8002C115.4 70.7002 114 72.1002 113 72.9002C112.9 73.0002 112.8 73.2002 112.8 73.3002C112.9 74.1002 112.4 75.5002 109.6 77.5002C109.4 77.7002 109.3 78.0002 109.5 78.2002C109.6 78.3002 109.8 78.4002 109.9 78.4002C110 78.4002 110.1 78.4002 110.2 78.3002C112 77.0002 113.2 75.8002 113.7 74.7002C114.3 75.3002 115 75.9002 115.8 76.3002C115.9 76.8002 116 77.2002 116 77.7002C116 77.9002 116.1 78.0002 116.3 78.1002C113.2 80.1002 109.3 81.6002 107.9 82.1002C107.5 79.9002 106.6 77.9002 105.4 76.0002C107.7 74.9002 110 73.6002 112.2 72.2002ZM63.9 70.1002C65.3 71.3002 66.6 72.3002 67.8 73.0002L63.5 73.4002L63.9 70.1002ZM72.4 74.6002L72.2 76.5002L70 74.1002C70.8 74.4002 71.6 74.6002 72.4 74.6002ZM73.9 68.3002C73.3 68.7002 72.5 68.6002 71.5 68.2002C71 67.9002 70.5 67.6002 70 67.2002C69.8 67.1002 69.6 67.1002 69.4 67.2002C69.2 67.3002 69.1 67.6002 69.2 67.8002L70.3 70.9002C70.3 71.9002 70.5 72.8002 71.1 73.5002C69.3 73.0002 67.3 71.8002 65.1 70.0002C65.3 70.0002 65.4 69.9002 65.6 69.9002C65.6 69.9002 65.7 69.9002 65.7 69.8002C65.7 69.8002 65.7 69.8002 65.8 69.8002C67.2 69.2002 68.2 67.5002 68.7 64.7002C68.8 64.3002 68.7 63.9002 68.6 63.5002C68.6 63.4002 68.5 63.4002 68.5 63.3002C67.4 62.0002 67.6 61.2002 67.7 60.9002C67.8 60.7002 68 60.5002 68.2 60.5002C68.4 60.5002 68.6 60.6002 68.7 60.9002C69 61.4002 69.3 61.9002 69.9 61.9002C70.4 61.9002 70.7 61.3002 70.8 61.1002C71.4 59.6002 73.3 58.0002 74.4 58.2002C75.3 58.4002 75.7 59.7002 75.7 61.8002V62.2002C75.7 66.4002 74.7 67.8002 73.9 68.3002ZM24.9 24.1002C25.1 24.4002 25.3 25.0002 25.7 26.0002C26.1 27.1002 26.4 28.1002 26.8 28.9002C26.9 29.6002 27 30.2002 27.1 30.8002C26.8 31.2002 26.6 31.6002 26.3 32.0002C25.7 30.1002 25.2 28.2002 25 26.2002C24.8 25.2002 24.8 24.5002 24.9 24.1002ZM23.5 26.8002C23.7 27.1002 24 27.8002 24.4 29.0002C24.4 29.0002 24.4 29.1002 24.5 29.1002C24.8 30.6002 25.2 32.0002 25.7 33.4002C25.5 33.9002 25.4 34.4002 25.3 34.9002C24.5 33.1002 24 31.2002 23.7 29.2002C23.4 28.0002 23.5 27.2002 23.5 26.8002ZM23 33.0002C23.3 33.2002 23.6 33.5002 23.8 33.9002C24.2 34.9002 24.6 35.9002 25 36.9002C25.1 37.1002 25.2 37.2002 25.4 37.2002C25.6 37.2002 25.8 37.1002 25.9 36.9002C25.9 36.9002 25.9 36.9002 25.9 36.8002C25.9 36.8002 25.9 36.8002 25.9 36.7002C26 35.7002 26.2 34.7002 26.5 33.8002C26.6 33.7002 26.6 33.6002 26.6 33.5002C27.1 32.4002 27.7 31.3002 28.5 30.4002C28.7 30.2002 28.7 29.9002 28.5 29.7002C28.3 29.5002 28 29.5002 27.8 29.7002C27.8 29.7002 27.8 29.7002 27.7 29.8002C27.6 29.5002 27.6 29.2002 27.5 28.8002C27.5 28.8002 27.5 28.8002 27.5 28.7002C27.4 28.0002 27.4 27.3002 27.4 26.6002C27.4 25.2002 27.5 24.5002 27.6 24.2002C27.8 24.5002 28 25.1002 28.3 26.3002C28.7 27.9002 29.2 29.5002 29.8 31.1002C28.8 34.2002 28.4 39.3002 28.4 39.5002C28.4 39.8002 28.6 40.0002 28.9 40.0002C29.2 40.0002 29.4 39.8002 29.4 39.5002C29.4 39.4002 29.9 33.0002 31.2 30.3002C32 28.7002 32.5 28.0002 32.7 27.7002C32.7 28.1002 32.7 28.9002 32.4 30.5002C31.7 34.8002 35.3 40.3002 36.2 41.5002C35.7 42.4002 34.7 43.5002 33.5 44.4002C32.2 45.3002 30.7 45.9002 29.6 46.0002C29.4 45.6002 28.9 44.8002 28.3 43.8002C28.3 43.7002 28.2 43.7002 28.2 43.6002C26.8 41.1002 24.7 37.2002 23.3 34.3002C23.2 33.7002 23.1 33.2002 23 33.0002ZM29.2 47.1002C29.3 47.1002 29.4 47.1002 29.5 47.1002H29.6C29.6 47.1002 29.6 47.1002 29.7 47.1002C31 47.1002 32.8 46.4002 34.4 45.3002C36 44.2002 37.2 42.8002 37.6 41.5002C44.9 53.1002 51.8 60.0002 61.8 68.5002C62.2 68.9002 62.6 69.1002 63 69.3002L62.4 73.7002C62.4 73.8002 62.4 74.0002 62.5 74.1002C62.6 74.2002 62.7 74.3002 62.9 74.3002L68.5 73.8002L72.2 77.9002C72.3 78.0002 72.4 78.1002 72.6 78.1002C72.7 78.1002 72.7 78.1002 72.8 78.1002C73 78.0002 73.1 77.9002 73.1 77.7002L73.4 75.0002C77.4 77.6002 81.8 79.7002 86.3 81.3002C86.4 81.3002 86.5 81.3002 86.6 81.3002C92.6 80.1002 98.5 78.3002 104.1 75.8002C105.6 77.9002 106.6 80.3002 107 82.8002V82.9002C107 83.0002 107 83.1002 107 83.2002C100.8 86.1002 94.4 88.6002 87.9 90.6002C86.4 91.1002 84.7 91.0002 83.1 90.5002C80.8 89.7002 78.5 88.7002 76.4 87.5002L75 82.0002C75 81.4002 75 80.9002 75 80.3002C75 80.0002 74.8 79.8002 74.5 79.8002C74.2 79.8002 74 80.1002 74 80.3002C74.1 82.3002 73.8 84.3002 73.1 86.2002C71.9 89.6002 70.4 92.9002 68.6 96.0002L58.5 93.1002C57.8 89.3002 57 85.5002 56 81.8002L57.4 78.4002C57.5 78.2002 57.4 78.0002 57.3 77.8002L54.2 75.3002C43.1 66.2002 34 56.0002 29.2 47.1002ZM87.1 170.3V170.6C86.8 173.6 86.9 176.6 87.3 179.6C87.4 180.5 87.6 181.7 87.8 183.1C83.8 180.1 80.1 176.6 76.8 172.8L78 162.4C80 162.3 82 162.4 83.5 162.6C84.9 162.8 86.4 163.1 87.9 163.5C87.2 169.6 87.2 170 87.1 170.3ZM93.6 165.3C91.1 162.7 83.7 161.6 83.6 161.6C81.4 161.3 74.9 160.9 71.9 162.5C74 155.8 75.8 149.1 77.5 142.2L82.3 130C82.4 129.9 82.3 129.7 82.3 129.6C82.2 129.5 82.1 129.4 82 129.3L79.9 128.8C57.3 123.6 50.6 117 49 112.3C46.3 104.4 56.7 95.3002 58.2 94.1002L68.4 97.1002C68.5 97.6002 68.7 98.0002 68.8 98.5002C68.8 98.6002 68.8 98.7002 68.9 98.7002C69.3 100.4 69.7 102.1 69.9 103.8C69.3 103.4 68.6 103.1 68 102.7C67.8 102.6 67.5 102.7 67.3 102.9C67.2 103.1 67.3 103.4 67.5 103.6C76 108.3 84.1 113.8 91.6 120C92.5 120.8 93.3 121.7 93.8 122.8C94.3 123.9 94.7 125 94.7 126.3C95.4 139.2 95 152.3 93.6 165.3ZM95.8 126.1C95.7 124.7 95.4 123.4 94.8 122.2C94.2 121 93.3 119.9 92.3 119.1C85.7 113.6 78.5 108.6 71 104.3C70.8 102.6 70.5 100.9 70.1 99.2002C79.9 103.2 89.5 107.8 98.8 112.8C100.5 113.7 102 114.8 103.4 116.1L130.8 141.1C129.8 141.2 128.6 141.7 127 142.5C126.7 142.7 126.4 142.9 126 143C125.9 143 125.9 143.1 125.8 143.1C123.8 144.3 122 145.7 121.2 146.4C120.3 147.1 118.9 148.5 117.5 150.1C117.5 150.1 117.5 150.1 117.4 150.1L117.3 150.2C115.9 151.8 114.6 153.6 114.2 155L95.8 127.8C95.9 127.3 95.8 126.7 95.8 126.1Z"
        fill="currentColor"
      />
      <path
        d="M53.9 142.5L49.3 141.3L50.5 136.7C50.6 136.4 50.4 136.2 50.1 136.1C49.8 136 49.6 136.2 49.5 136.5L48.3 141.1L43.7 139.9C43.4 139.8 43.2 140 43.1 140.3C43 140.6 43.2 140.8 43.5 140.9L48 142L46.8 146.6C46.7 146.9 46.9 147.1 47.2 147.2H47.3C47.5 147.2 47.7 147.1 47.8 146.8L49 142.2L53.6 143.4H53.7C53.9 143.4 54.1 143.3 54.2 143C54.3 142.8 54.1 142.6 53.9 142.5Z"
        fill="currentColor"
      />
      <path
        d="M87.2 32.3002L96.6 34.7002H96.7C96.9 34.7002 97.1 34.6002 97.2 34.3002L100.7 20.7002C100.7 20.5002 100.7 20.4002 100.6 20.2002L98 17.3002C99.1 15.6002 98.8 13.7002 98.6 12.0002C98.3 9.60017 98 7.50017 100.8 5.90017C101 5.80017 101.1 5.50017 101 5.20017C100.9 5.00017 100.6 4.90017 100.3 5.00017C96.9 7.00017 97.3 9.70017 97.6 12.2002C97.8 13.8002 98 15.3002 97.3 16.6002L96.8 16.0002C96.7 15.8002 96.5 15.8002 96.3 15.9002L90.8 17.8002C90.6 17.9002 90.5 18.0002 90.5 18.1002L87 31.7002C87 31.8002 87 32.0002 87.1 32.1002C87 32.2002 87.1 32.3002 87.2 32.3002Z"
        fill="currentColor"
      />
      <path
        d="M117.7 64.1002L121.4 66.2002L119.3 70.0002C119.2 70.2002 119.2 70.5002 119.5 70.7002C119.6 70.7002 119.7 70.8002 119.7 70.8002C119.9 70.8002 120 70.7002 120.1 70.5002L122.2 66.7002L126 68.8002C126.1 68.8002 126.2 68.9002 126.2 68.9002C126.4 68.9002 126.5 68.8002 126.6 68.6002C126.7 68.4002 126.7 68.1002 126.4 67.9002L122.6 65.8002L124.7 62.1002C124.8 61.9002 124.8 61.6002 124.5 61.4002C124.3 61.3002 124 61.3002 123.8 61.6002L121.7 65.3002L118 63.2002C117.8 63.1002 117.5 63.1002 117.3 63.4002C117.4 63.6002 117.5 63.9002 117.7 64.1002Z"
        fill="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default AddProductsToCartImage