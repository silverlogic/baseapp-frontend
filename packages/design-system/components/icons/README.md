# Creating Customizable SVG Icons from Figma

If you've designed an SVG icon in Figma and want to integrate it into our design system, follow the steps below to ensure it's fully customizable and consistent with our system:

## 1. Export the SVG from Figma

- In Figma, select the icon you want to export.
- Navigate to the right sidebar and click on the "Export" section.
- Choose the "SVG" format from the dropdown.
- Click the "Export [Your Icon Name]" button.
- Save the SVG to a location you'll remember.

## 2. Organize Icons in the Design System

- Navigate to the `design-system/icons` directory in your project.
- Create a new folder named after your icon, (e.g., `CustomIcon`).
- This folder will contain all the necessary files related to your icon, including the SVG.

## 3. Embed SVG within the `SvgIcon` Component

- Inside the folder you just created, create a new React component file (e.g., `index.tsx`).
- Use the `SvgIcon` component to embed your SVG. Here's an example structure:

```tsx
import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const CustomIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'grey.800', ...sx }} {...props}>
    {/* Paste your SVG content here. */}
  </SvgIcon>
)

export default CustomIcon
```

## 4. Ensure Color Customizability

- In the pasted SVG content, locate any attributes like `stroke="#123456"`.
- Replace the color value with `currentColor`. This allows the SVG to inherit the font color from its parent component, ensuring it's customizable.
- Icons with multiple colors will require a different approach.

**Example:**

Before:

```tsx
path stroke="#123456"
```

After:

```tsx
path stroke="currentColor"
```

## 5. Use the `sx` prop for Styling

When you want to use your new icon component in your application, make sure to set both the size (`fontSize`) and `color` using the `sx` prop on the `SvgIcon` component.

**For example:**

```tsx
import { FC } from 'react'

import { SvgIcon, SvgIconProps } from '@mui/material'

const ProfileIcon: FC<SvgIconProps> = ({ sx, ...props }) => (
  <SvgIcon sx={{ fontSize: 24, color: 'grey.800', ...sx }} {...props}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        ...
        stroke="currentColor"
      />
      <path
        ...
        stroke="currentColor"
      />
      <path
        ...
        stroke="currentColor"
      />
    </svg>
  </SvgIcon>
)

export default ProfileIcon
```
