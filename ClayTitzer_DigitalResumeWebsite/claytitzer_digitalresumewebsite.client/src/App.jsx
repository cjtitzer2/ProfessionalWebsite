import { lazy, Suspense, Component } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import ScrollToTop from './components/ScrollToTop'

const Home = lazy(() => import('./pages/Home'))
const Career = lazy(() => import('./pages/Career'))
const Education = lazy(() => import('./pages/Education'))
const Skills = lazy(() => import('./pages/Skills'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 pb-24 text-center">
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
    <div className="max-w-7xl mx-auto px-6 md:px-10 pt-28 flex justify-center">
      <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
    </div>
  )
}

export default function App() {
  return (
    <HashRouter>
      <ScrollToTop />
      <Nav />
      <main>
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/career" element={<Career />} />
              <Route path="/education" element={<Education />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
    </HashRouter>
  )
}
