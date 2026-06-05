import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Dashboard from './pages/Dashboard'
import Messages from './pages/Messages'
import Files from './pages/Files'
import AIAssistant from './pages/AIAssistant'

export default function App() {
  const [activeView, setActiveView] = useState('dashboard')
  const [activeProject, setActiveProject] = useState('p1')

  const renderPage = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard activeProject={activeProject} onProjectChange={setActiveProject} />
      case 'messages': return <Messages activeProject={activeProject} />
      case 'files': return <Files activeProject={activeProject} />
      case 'ai': return <AIAssistant activeProject={activeProject} />
      case 'tasks': return <Dashboard activeProject={activeProject} onProjectChange={setActiveProject} />
      default: return <Dashboard activeProject={activeProject} onProjectChange={setActiveProject} />
    }
  }

  return (
    <div style={{
      display: 'flex', height: '100vh', overflow: 'hidden',
      background: 'var(--gray-50)', fontFamily: 'var(--font)'
    }}>
      <Sidebar
        activeView={activeView}
        onViewChange={setActiveView}
        activeProject={activeProject}
        onProjectChange={setActiveProject}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Topbar activeProject={activeProject} onNewProject={() => setActiveView('new')} />
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {renderPage()}
        </main>
      </div>
    </div>
  )
}
