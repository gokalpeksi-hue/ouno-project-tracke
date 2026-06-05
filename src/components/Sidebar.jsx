import React from 'react'
import { OunoLogo, Tooltip, Avatar } from './UI'
import { PROJECTS } from '../data/mockData'
import {
  LayoutDashboard, CheckSquare, Bell, MessageSquare,
  GitBranch, FileText, RotateCcw, Gavel, Plus, Sparkles, Settings
} from 'lucide-react'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Genel bakış', icon: LayoutDashboard, tooltip: 'Genel bakış', tooltipItems: ['Tüm projeleri gör', 'AI uyarılarını izle', 'Bugünkü görevler'] },
  { id: 'tasks', label: 'Görevlerim', icon: CheckSquare, badge: 5, tooltip: 'Görevlerim', tooltipItems: ['Atanan görevler', 'Bugün bitenler', 'Geciken görevler'] },
  { id: 'messages', label: 'Mesajlar', icon: MessageSquare, badge: 2, tooltip: 'Mesajlaşma', tooltipItems: ['Proje kanalları', 'WA köprüsü', 'AI mesaj özeti'] },
  { id: 'notifications', label: 'Bildirimler', icon: Bell, badge: 3, tooltip: 'Bildirimler', tooltipItems: ['Departman bildirimleri', 'Onay talepleri', 'Tetikleyici uyarıları'] },
]

const NAV_ITEMS_2 = [
  { id: 'phases', label: 'Aşamalar', icon: GitBranch, tooltip: 'Proje aşamaları', tooltipItems: ['Timeline görünümü', 'Milestone kayıtları', 'Bağımlılık haritası'] },
  { id: 'files', label: 'Dosyalar', icon: FileText, tooltip: 'Dosya merkezi', tooltipItems: ['PDF, Excel, görsel', 'Aşamaya bağla', 'Versiyon geçmişi'] },
  { id: 'sprints', label: 'Sprint', icon: RotateCcw, tooltip: 'Sprint yönetimi', tooltipItems: ['Sprint başlat/bitir', 'Backlog düzenle', 'Velocity raporu'] },
  { id: 'approvals', label: 'Onaylar', icon: Gavel, tooltip: 'Onay kapıları', tooltipItems: ['YK onay talepleri', 'Hukuk inceleme', 'Onay geçmişi & log'] },
]

const PROJECT_COLORS = ['var(--red)','#16A34A','#D97706']

export default function Sidebar({ activeView, onViewChange, activeProject, onProjectChange }) {
  return (
    <aside style={{
      width: 190, background: '#fff', borderRight: '1px solid var(--gray-100)',
      display: 'flex', flexDirection: 'column', height: '100%', flexShrink: 0
    }}>
      {/* Logo */}
      <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid var(--gray-100)' }}>
        <OunoLogo size="sm" />
      </div>

      {/* Main nav */}
      <div style={{ padding: '8px 0' }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--gray-300)', letterSpacing: '.6px', padding: '8px 16px 4px', textTransform: 'uppercase' }}>Ana menü</div>
        {NAV_ITEMS.map(item => (
          <Tooltip key={item.id} title={item.tooltip} items={item.tooltipItems} position="below" align="right">
            <button onClick={() => onViewChange(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '7.5px 16px', fontSize: 12.5, fontFamily: 'var(--font)',
              color: activeView === item.id ? 'var(--red)' : 'var(--gray-500)',
              background: activeView === item.id ? 'var(--red-light)' : 'transparent',
              border: 'none', borderRight: activeView === item.id ? '2px solid var(--red)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all var(--transition)', fontWeight: activeView === item.id ? 500 : 400,
              textAlign: 'left'
            }}>
              <item.icon size={14} />
              <span style={{ flex: 1 }}>{item.label}</span>
              {item.badge && (
                <span style={{ fontSize: 9.5, background: 'var(--red)', color: '#fff', padding: '1px 5px', borderRadius: 8, fontWeight: 600 }}>{item.badge}</span>
              )}
            </button>
          </Tooltip>
        ))}
      </div>

      {/* Projects */}
      <div style={{ padding: '4px 0' }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--gray-300)', letterSpacing: '.6px', padding: '8px 16px 4px', textTransform: 'uppercase' }}>Projelerim</div>
        {PROJECTS.map((p, i) => (
          <button key={p.id} onClick={() => { onProjectChange(p.id); onViewChange('dashboard') }} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 16px', fontSize: 12, fontFamily: 'var(--font)',
            color: activeProject === p.id ? 'var(--dark)' : 'var(--gray-500)',
            background: activeProject === p.id ? 'var(--gray-50)' : 'transparent',
            border: 'none', cursor: 'pointer', transition: 'all var(--transition)', textAlign: 'left',
            fontWeight: activeProject === p.id ? 500 : 400
          }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', background: PROJECT_COLORS[i], flexShrink: 0 }} />
            <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</span>
          </button>
        ))}
        <button onClick={() => onViewChange('new')} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 8,
          padding: '7px 16px', fontSize: 12, fontFamily: 'var(--font)',
          color: 'var(--gray-300)', background: 'transparent',
          border: 'none', cursor: 'pointer', textAlign: 'left'
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--gray-200)', flexShrink: 0 }} />
          <span>+ Yeni proje</span>
        </button>
      </div>

      {/* Project tools */}
      <div style={{ padding: '4px 0', borderTop: '1px solid var(--gray-100)', marginTop: 4 }}>
        <div style={{ fontSize: 9.5, fontWeight: 600, color: 'var(--gray-300)', letterSpacing: '.6px', padding: '8px 16px 4px', textTransform: 'uppercase' }}>Proje araçları</div>
        {NAV_ITEMS_2.map(item => (
          <Tooltip key={item.id} title={item.tooltip} items={item.tooltipItems} position="below" align="right">
            <button onClick={() => onViewChange(item.id)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 8,
              padding: '7px 16px', fontSize: 12, fontFamily: 'var(--font)',
              color: activeView === item.id ? 'var(--red)' : 'var(--gray-500)',
              background: activeView === item.id ? 'var(--red-light)' : 'transparent',
              border: 'none', borderRight: activeView === item.id ? '2px solid var(--red)' : '2px solid transparent',
              cursor: 'pointer', transition: 'all var(--transition)', textAlign: 'left'
            }}>
              <item.icon size={13} />
              <span>{item.label}</span>
            </button>
          </Tooltip>
        ))}
      </div>

      {/* Footer */}
      <div style={{ marginTop: 'auto', padding: '12px 12px', borderTop: '1px solid var(--gray-100)' }}>
        <button onClick={() => onViewChange('ai')} style={{
          width: '100%', padding: '8px 12px', background: 'var(--red)',
          color: '#fff', border: 'none', borderRadius: 'var(--radius-md)',
          fontSize: 12, fontWeight: 500, fontFamily: 'var(--font)',
          cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'center',
          transition: 'background var(--transition)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'var(--red-hover)'}
        onMouseLeave={e => e.currentTarget.style.background = 'var(--red)'}>
          <Sparkles size={13} /> AI asistan
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, padding: '0 2px' }}>
          <Avatar userId="u1" size={26} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--dark)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Ahmet Kaya</div>
            <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>Proje Lideri</div>
          </div>
          <Settings size={13} color="var(--gray-400)" style={{ cursor: 'pointer' }} />
        </div>
      </div>
    </aside>
  )
}
