import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24 text-center">
      <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">
        404
      </p>
      <h1 className="text-4xl font-bold text-charcoal tracking-tight m-0 mb-4">
        Page Not Found
      </h1>
      <p className="text-base text-slate mb-8">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        to="/"
        className="text-sm font-medium px-5 py-2.5 bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-200 no-underline"
      >
        Back to Home
      </Link>
    </div>
  )
}
