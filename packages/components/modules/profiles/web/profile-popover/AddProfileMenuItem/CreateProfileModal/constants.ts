import z from 'zod'

const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export const schema = z.object({
  name: z
    .string()
    .trim()
    .min(3, { message: 'Must have at least three character' })
    .max(255, { message: 'Must have at most 255 characters' }),
  urlPath: z
    .string()
    .regex(slugRegex, 'Must contain only lowercase letters, numbers, and hyphens')
    .max(500, { message: 'Must have at most 500 characters' }),
})
