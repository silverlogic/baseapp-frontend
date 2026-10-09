let counter = 0

// Client-side uniqueness only (upload store keys, per-composer scopes) — never an
// identifier the backend trusts, so a counter beats a PRNG here.
export const nextLocalId = () => {
  counter += 1
  return `${Date.now()}-${counter}`
}
