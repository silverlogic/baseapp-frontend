import Drawer from './Drawer'
import Placeholder from './Placeholder'
import { SocialInputDrawerType } from './types'
import { useTextInputProperties } from './utils'

/* 
This component will display a SocialInput inside a BottomSheet.
- The BottomSheet will appear in front of whatever content is on your page,
and potentially hide the bottom of it. You can use the Placeholder component
to ensure that only blank space is hidden (see below).
- If your page is scrollable and you want to be able to scroll all content into view, 
add the Placeholder at the end of the scrollable view (it reserves some blank space 
that will be hidden behind the BottomSheet, so all your content remains visible).
- By default, the BottomSheet consumes gestures and might block any buttons from being 
pressable, even when they are visible on the screen (not hidden behind the Bottom Sheet).
If you want the buttons to remain pressable, you need to use gorhom's TouchableOpacity instead.

**Example usage**:
const ExampleComponent = () => {
  // logic for setting up a form
  const form = ...
  const text = form.watch('someField') || ''
  
  const { 
    textHeight,         // pass to the Placeholder
    onTextHeightChange, // pass to the Drawer
    isFocused,          // can be used for custom logic
    onFocusChange,      // pass to the Drawer
    keyboardHeight      // pass to both Drawer and Placeholder
  } = SocialInputDrawer.useTextInputProperties()
  
  // You can add some custom logic for when to show the handle.
  // In this case, it is displayed when the input is focused or non-empty.
  const showHandle = isFocused || text !== ''
  
  return (
    <>
      <ScrollView>
        // Your content here. Use <TouchableOpacity> instead of button
        // components like <IconButton> to ensure they remain pressable.

        <SocialInputDrawer.Placeholder
          keyboardHeight={keyboardHeight}
          showHandle={showHandle}
          textHeight={textHeight}
        />
      </ScrollView>
      <SocialInputDrawer.Drawer
        form={form}
        keyboardHeight={keyboardHeight}
        onFocusChange={onFocusChange}
        onTextHeightChange={onTextHeightChange}
        ref={ref}
        showHandle={showHandle}
        submit={onSubmit}
      />
    </>
  )
}
*/

const SocialInputDrawer: SocialInputDrawerType = {
  Drawer,
  Placeholder,
  useTextInputProperties,
}

export default SocialInputDrawer
