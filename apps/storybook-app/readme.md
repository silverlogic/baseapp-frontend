## Storybook

How to run:

```bash
yarn storybook
```

### Paths for stories files

Path for stories file:

```bash
...components/MyComponentFolder/stories.@(js|jsx|ts|tsx)
```

### Basic skeleton for a Storybook stories file

```bash
import type { Meta, StoryObj } from '@storybook/react'
import { MY_COMPONENT } from 'MY_COMPONENT_PATH'

const meta: Meta<typeof MY_COMPONENT> = {
  title: 'TITLE_OF_THE_FOLDER_SHOWN_ON_STORYBOOK',
  component: MY_COMPONENT,
}

export default meta
type Story = StoryObj<typeof MY_COMPONENT>

export const NAME_OF_COMPONENT_TO_BE_SHOWN_ON_STORYBOOK: Story = {
  args: {
    DEFAULT_PROPS_FOR_COMPONENT for example:
    label: 'My Default Label'
  },
}
```

## Demo

Example on how it's being used on this app:

https://www.loom.com/share/5ab78c9cae6b4361a1381bf974e0eb67
