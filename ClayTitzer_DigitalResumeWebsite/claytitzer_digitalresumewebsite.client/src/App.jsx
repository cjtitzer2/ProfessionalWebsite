import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'

const Home = lazy(() => import('./pages/Home'))
const Career = lazy(() => import('./pages/Career'))
const Education = lazy(() => import('./pages/Education'))
const About = lazy(() => import('./pages/About'))

export default function App() {
  return (
    <BrowserRouter>
      <Nav />
      <main>
        <Suspense>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/career" element={<Career />} />
            <Route path="/education" element={<Education />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  )
}
