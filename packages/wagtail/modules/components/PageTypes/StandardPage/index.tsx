'use client'

import { FC } from 'react'

import { Container } from '@mui/material'

import { IPageType } from '../types'

const StandardPage: FC<IPageType> = ({ children }) => <Container>{children}</Container>

export default StandardPage
