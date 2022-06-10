import React, { useState } from 'react'
import type { FormikProps } from 'formik'

export interface ILabelFormFieldProps extends React.FC<any> {
  label?: string
  input: HTMLInputElement
  showError: boolean
  errorMessage?: string
  helperText?: string
}

export interface IInputBaseComponentProps
  extends React.HTMLAttributes<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> {
  // Accommodate arbitrary additional props coming from the `IInputProps` prop
  [arbitrary: string]: any;
}

export interface IInputProps extends IInputBaseComponentProps {
  component?: React.ElementType<IInputBaseComponentProps> | React.FC<any>
  formik: FormikProps<any>
  templateComponent?: React.FC<any>
  name: string
  label?: string
  helperText?: string
}

export function LabeledFormField({label, input, showError, errorMessage, helperText} : ILabelFormFieldProps) {
  return <p>
    <label>
      <>
        {label}<br />
        {input}
      </>
    </label>
    {showError && <span>{errorMessage}</span>}
    {helperText && <strong>{helperText}</strong>}
  </p>
}

export function LabeledCheckboxField({label, input, showError, errorMessage, helperText} : ILabelFormFieldProps) {
  return <p>
    <label><>{input} {label}</></label>
    {showError && <span>{errorMessage}</span>}
    {helperText && <strong>{helperText}</strong>}
  </p>
}

export function InputField({component: Component = "input", templateComponent: TemplateComponent = LabeledFormField, name, label, formik, helperText, ...props} : IInputProps) {
  const showError = formik.errors?.[name] && formik.touched?.[name]
  return <TemplateComponent
    label={label}
    errorMessage={formik.errors?.[name]}
    showError={showError}
    helperText={helperText}
    input={
      <Component
        name={name}
        onChange={formik.handleChange}
        value={formik.values?.[name]}
        {...props}
      />
    }
  />
}

export function CheckboxField(props: any) {
  return <InputField type="checkbox" templateComponent={LabeledCheckboxField} {...props} />
}

export function PasswordField({component: Component = "input", templateComponent: TemplateComponent = LabeledFormField, name = "password", label = "Password", formik, helperText, ...props} : IInputProps) {
  const [viewPassword, setViewPassword] = useState(false)
  const showError = formik.errors?.[name] && formik.touched?.[name]
  const inputType = viewPassword ? 'text' : 'password'

  return <TemplateComponent
    label={label}
    errorMessage={formik.errors?.[name]}
    showError={showError}
    helperText={helperText}
    input={<React.Fragment>
      <Component
        name={name}
        onChange={formik.handleChange}
        value={formik.values?.[name]}
        type={inputType}
        {...props}
      />

      <button
        type="button"
        onClick={() => setViewPassword((state) => !state)}
      >{viewPassword ? "hide" : "show"}</button>

    </React.Fragment>
    }
  />
}
