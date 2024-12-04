import useCurrentProfile from '../../..'

const TestComponent = () => {
  const profile = useCurrentProfile().currentProfile

  if (!profile) {
    return null
  }

  return (
    <>
      <span id="profile-id">{profile.id}</span>
    </>
  )
}

export default TestComponent
