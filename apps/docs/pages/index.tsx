import {
  ButtonWithLoading,
  PasswordField,
  ImageUploader,
} from '@baseapp-frontend/design-system-mui'
import { Divider, useTheme } from '@mui/material'
import { useState } from 'react'

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

        <ButtonWithLoading variant="contained" loading>
          button
        </ButtonWithLoading>
      </div>

      <Divider style={{ margin: theme.spacing(2, 0) }} />

      <div style={{ width: theme.spacing(48) }}>
        <h2>{`<PasswordField />`}</h2>
        <PasswordField />

        <PasswordField helperText="Type your password." />

        <PasswordField error helperText="Incorrect entry." />
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
    </div>
  )
}
