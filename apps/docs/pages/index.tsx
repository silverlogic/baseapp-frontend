import Link from 'next/link'

export default function Docs() {
  return (
    <div>
      <h1>Welcome to the baseapp implementation docs!</h1>
      <h2>Pages:</h2>
      <ul>
        <li>
          <Link href="/components">
            <a>Components</a>
          </Link>
        </li>
        <li>
          <Link href="/auth">
            <a>Auth hooks</a>
          </Link>
        </li>
      </ul>
    </div>
  )
}
