import { lazy, Suspense, Component } from 'react'
import { HashRouter, Routes, Route, Link } from 'react-router-dom'
import Nav from './components/Nav'

const Home = lazy(() => import('./pages/Home'))
const Career = lazy(() => import('./pages/Career'))
const Education = lazy(() => import('./pages/Education'))
const About = lazy(() => import('./pages/About'))
const NotFound = lazy(() => import('./pages/NotFound'))

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-4xl mx-auto px-6 pt-28 pb-24 text-center">
          <p className="font-mono text-xs text-gold tracking-widest uppercase mb-2">Error</p>
          <h1 className="text-4xl font-bold text-charcoal tracking-tight m-0 mb-4">
            Something went wrong
          </h1>
          <p className="text-base text-slate mb-8">
            The page failed to load. Please try refreshing.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-sm font-medium px-5 py-2.5 bg-accent text-white rounded-sm hover:bg-accent-hover transition-colors duration-200 cursor-pointer border-none"
          >
            Refresh Page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

function LoadingFallback() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-28 flex justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <Nav />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/career" element={<Career />} />
              <Route path="/education" element={<Education />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </HashRouter>
  )
}
