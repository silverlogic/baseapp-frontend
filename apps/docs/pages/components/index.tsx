import { useState } from 'react'

import {
  ButtonWithLoading,
  CheckboxField,
  ImageUploader,
  PasswordField,
} from '@baseapp-frontend/design-system-mui'

import { Divider, useTheme } from '@mui/material'

export default function Docs() {
  const [images, setImages] = useState([])
  const theme = useTheme()
  return (
    <div>
      <h1>Components demo</h1>
      <Divider style={{ margin: theme.spacing(2, 0) }} />

      <h2>{`<ButtonWithLoading>`}</h2>
      <div style={{ width: theme.spacing(48), display: 'flex', flexDirection: 'column' }}>
        <ButtonWithLoading variant="contained" style={{ margin: theme.spacing(2, 0) }}>
          button
        </ButtonWithLoading>

        <ButtonWithLoading variant="contained" isLoading>
          button
        </ButtonWithLoading>
      </div>

      <Divider style={{ margin: theme.spacing(2, 0) }} />

      <div style={{ width: theme.spacing(48) }}>
        <h2>{`<PasswordField />`}</h2>
        <PasswordField name="password" />

        <PasswordField name="password" helperText="Type your password." />

        <PasswordField name="password" error helperText="Incorrect entry." />
      </div>

      <Divider style={{ margin: theme.spacing(2, 0) }} />

      <h2>{`<ImageUploader />`}</h2>
      <div style={{ width: theme.spacing(48) }}>
        <ImageUploader
          images={images}
          setImages={setImages}
          name="imageUploeader"
          ImageProps={{ style: { outline: '1px solid blue' } }}
          buttonLabel="Upload your image here"
          buttonRemoveLabel="Remove"
        />
      </div>

      <Divider style={{ margin: theme.spacing(2, 0) }} />

      <CheckboxField name="checkbox" label="Checkbox" />
    </div>
  )
}
