import Link from 'next/link'

export default function Docs() {
  return (
    <div>
      <h1>Welcome to the baseapp implementation docs!</h1>
      <h2>Pages:</h2>
      <ul>
        <li>
          <Link href="/components">Components</Link>
        </li>
        <li>
          <Link href="/auth">Auth hooks</Link>
        </li>
      </ul>
    </div>
  )
}
