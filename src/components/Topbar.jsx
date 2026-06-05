import React from 'react'
import { OunoLogo, Tooltip, IconButton, Avatar } from './UI'
import { Search, Bell, Plus, Settings } from 'lucide-react'
import { PROJECTS } from '../data/mockData'

export default function Topbar({ activeProject, onNewProject }) {
  const project = PROJECTS.find(p => p.id === activeProject)
  return (
    <header style={{
      background: '#fff', borderBottom: '1px solid var(--gray-100)',
      height: 52, display: 'flex', alignItems: 'center',
      padding: '0 20px', gap: 14, flexShrink: 0
    }}>
      <div style={{ width: 1, height: 22, background: 'var(--gray-100)' }} />
      <span style={{ fontSize: 13, color: 'var(--gray-400)' }}>
        {project ? project.name : 'Genel bakış'}
      </span>

      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 7,
          background: 'var(--gray-50)', border: '0.5px solid var(--gray-200)',
          borderRadius: 'var(--radius-md)', padding: '5px 12px', cursor: 'text'
        }}>
          <Search size={12} color="var(--gray-400)" />
          <span style={{ fontSize: 12, color: 'var(--gray-300)' }}>Ara...</span>
          <span style={{ fontSize: 10, color: 'var(--gray-300)', background: 'var(--gray-100)', padding: '1px 5px', borderRadius: 4, fontFamily: 'var(--mono)' }}>⌘K</span>
        </div>

        {/* New project */}
        <Tooltip title="Yeni proje" items={['AI omurga ile başlat', 'Departman & ekip ata', 'Sprint döngüsü kur']} position="below" align="right">
          <button onClick={onNewProject} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            padding: '6px 12px', background: 'var(--red)', color: '#fff',
            border: 'none', borderRadius: 'var(--radius-md)',
            fontSize: 12, fontWeight: 500, fontFamily: 'var(--font)', cursor: 'pointer',
            transition: 'background var(--transition)'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'var(--red-hover)'}
          onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}>
            <Plus size={13} /> Yeni proje
          </button>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Bildirimler" items={['3 yeni bildirim', 'Onay talepleri', 'AI uyarıları']} position="below" align="right">
          <div style={{ position: 'relative' }}>
            <button style={{
              width: 32, height: 32, borderRadius: 'var(--radius-sm)',
              border: '0.5px solid var(--gray-200)', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
            }}>
              <Bell size={14} color="var(--gray-500)" />
            </button>
            <span style={{
              position: 'absolute', top: 4, right: 4, width: 7, height: 7,
              borderRadius: '50%', background: 'var(--red)', border: '1.5px solid #fff'
            }} />
          </div>
        </Tooltip>

        <Avatar userId="u1" size={30} />
      </div>
    </header>
  )
}
