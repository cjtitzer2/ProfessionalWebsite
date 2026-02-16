import { useEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'

const routes = ['/', '/career', '/education', '/skills', '/playbooks', '/about', '/contact']
const routeLabels = {
  '/': 'Home Flow',
  '/career': 'Delivery',
  '/education': 'Learning',
  '/skills': 'Stack',
  '/playbooks': 'Patterns',
  '/about': 'Approach',
  '/contact': 'Connect',
}

const stages = ['Intake', 'Validate', 'Route', 'Execute', 'Recover']

function getScrollProgress() {
  const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  const ratio = window.scrollY / maxScroll
  return Math.max(0, Math.min(1, ratio))
}

export default function AutomationArtifact() {
  const location = useLocation()
  const [scrollProgress, setScrollProgress] = useState(0)

  const routeIndex = useMemo(
    () => Math.max(0, routes.indexOf(location.pathname)),
    [location.pathname]
  )
  const routeLabel = routeLabels[location.pathname] ?? 'Automation'
  const activeStage = (routeIndex + Math.floor(scrollProgress * stages.length)) % stages.length

  useEffect(() => {
    const syncScroll = () => setScrollProgress(getScrollProgress())
    syncScroll()
    window.addEventListener('scroll', syncScroll, { passive: true })
    window.addEventListener('resize', syncScroll)
    return () => {
      window.removeEventListener('scroll', syncScroll)
      window.removeEventListener('resize', syncScroll)
    }
  }, [])

  return (
    <div
      className="automation-artifact-shell"
      style={{
        '--scroll-progress': `${scrollProgress}`,
        '--route-index': `${routeIndex}`,
      }}
      aria-hidden="true"
    >
      <div className="automation-artifact-object">
        <div className="artifact-orbit artifact-orbit-outer">
          <span className="artifact-node" />
          <span className="artifact-node" />
          <span className="artifact-node" />
          <span className="artifact-node" />
        </div>
        <div className="artifact-orbit artifact-orbit-inner">
          <span className="artifact-node artifact-node-accent" />
          <span className="artifact-node artifact-node-accent" />
          <span className="artifact-node artifact-node-accent" />
        </div>
        <div className="artifact-core">
          <span className="artifact-core-label">{routeLabel}</span>
        </div>
      </div>

      <div className="artifact-stage-list">
        {stages.map((stage, index) => (
          <span
            key={stage}
            className={`artifact-stage ${index === activeStage ? 'artifact-stage-active' : ''}`}
          >
            {stage}
          </span>
        ))}
      </div>
    </div>
  )
}
