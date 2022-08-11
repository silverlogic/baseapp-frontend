export function fontSize(fontSizeInPx: number, defaultFontSize = 16): string {
  /*
    - This should be used when you have a font-size value in px as reference 
      (i.e figma) to convert it to rem values instead;
    - Should used just for 'font-size' property
    - This can be useful when changing globaly the 'font-size' for accessibilty reasons;
    - <body> should use this same default font-size value, 16px is usualy the default;
    - avoid changing the defaultFontSize value.
  */
  return `${fontSizeInPx / defaultFontSize}rem`
}
