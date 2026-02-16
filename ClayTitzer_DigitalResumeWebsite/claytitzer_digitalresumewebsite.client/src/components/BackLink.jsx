import { Link } from 'react-router-dom'

export default function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-2 text-sm text-slate hover:text-accent transition-colors duration-200 no-underline mb-8 group"
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-200 group-hover:-translate-x-1"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      Back to Home
    </Link>
  )
}
