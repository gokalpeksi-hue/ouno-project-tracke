import React, { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import Files from './pages/Files'
import AIAssistant from './pages/AIAssistant'

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [activeProject, setActiveProject] = useState('p1')
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 900 : false
  )

  useEffect(() => {
    const onResize = () => {
      const mobile = window.innerWidth < 900
      setIsMobile(mobile)
      if (!mobile) setMenuOpen(false)
    }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handleViewChange = (v) => { setActiveView(v); if (isMobile) setMenuOpen(false) }
  const handleProjectChange = (p) => { setActiveProject(p); if (isMobile) setMenuOpen(false) }

  const renderPage = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard activeProject={activeProject} onProjectChange={handleProjectChange} />
      case 'messages': return <Messages activeProject={activeProject} />
      case 'files': return <Files activeProject={activeProject} />
      case 'ai': return <AIAssistant activeProject={activeProject} />
      case 'tasks': return <Dashboard activeProject={activeProject} onProjectChange={handleProjectChange} />
      default: return <Dashboard activeProject={activeProject} onProjectChange={handleProjectChange} />
    }
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: 'var(--gray-50)', fontFamily: 'var(--font)'
    }}>
      <Sidebar
        activeView={activeView}
        onViewChange={handleViewChange}
        activeProject={activeProject}
        onProjectChange={handleProjectChange}
        isMobile={isMobile}
        menuOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        <Topbar
          activeProject={activeProject}
          onNewProject={() => handleViewChange('new')}
          isMobile={isMobile}
          onMenuToggle={() => setMenuOpen(o => !o)}
        />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
