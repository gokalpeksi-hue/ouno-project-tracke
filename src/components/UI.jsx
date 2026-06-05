import React from 'react'
import { DEPARTMENTS, STATUS_CONFIG, PRIORITY_CONFIG, USERS } from '../data/mockData'

export function OunoLogo({ size = 'md' }) {
  const sizes = { sm: { logo: 14, sub: 7.5, gap: 2 }, md: { logo: 17, sub: 8.5, gap: 2 }, lg: { logo: 28, sub: 11, gap: 3 } }
  const s = sizes[size]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: s.gap }}>
      <div style={{ fontSize: s.logo, fontWeight: 700, color: 'var(--red)', letterSpacing: '-0.04em', lineHeight: 1 }}>ouno</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <div style={{ width: 3, height: 3, borderRadius: '50%', background: 'var(--red)' }} />
        <div style={{ fontSize: s.sub, fontWeight: 600, color: 'var(--dark)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Project Tracker</div>
      </div>
    </div>
  )
}

export function Avatar({ userId, size = 28, style = {} }) {
  const user = USERS.find(u => u.id === userId)
  if (!user) return null
  const colors = ['#E8171A','#1D4ED8','#16A34A','#D97706','#7C3AED','#0F6E56']
  const color = colors[userId.charCodeAt(1) % colors.length]
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: color, color: '#fff',
      fontSize: size * 0.38, fontWeight: 600,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0, ...style
    }}>
      {user.initials}
    </div>
  )
}

export function StatusBadge({ status, size = 'sm' }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.active
  return (
    <span style={{
      fontSize: size === 'sm' ? 10.5 : 12, padding: '2px 8px',
      borderRadius: 6, fontWeight: 500, whiteSpace: 'nowrap',
      background: cfg.bg, color: cfg.color
    }}>{cfg.label}</span>
  )
}

export function PriorityBadge({ priority }) {
  const cfg = PRIORITY_CONFIG[priority] || PRIORITY_CONFIG.medium
  return (
    <span style={{
      fontSize: 10.5, padding: '2px 7px', borderRadius: 6, fontWeight: 500,
      background: cfg.bg, color: cfg.color
    }}>{cfg.label}</span>
  )
}

export function DeptBadge({ deptId, size = 'sm' }) {
  const dept = DEPARTMENTS.find(d => d.id === deptId)
  if (!dept) return null
  return (
    <span style={{
      fontSize: size === 'sm' ? 10.5 : 12,
      padding: '2px 8px', borderRadius: 6, fontWeight: 500,
      background: dept.bg, color: dept.color, whiteSpace: 'nowrap'
    }}>{dept.label}</span>
  )
}

export function ProgressBar({ value, color = 'var(--red)', height = 5 }) {
  return (
    <div style={{ height, background: 'var(--gray-100)', borderRadius: height, overflow: 'hidden' }}>
      <div style={{ height: '100%', width: `${value}%`, background: color, borderRadius: height, transition: 'width 0.6s cubic-bezier(0.4,0,0.2,1)' }} />
    </div>
  )
}

export function Tooltip({ children, title, items = [], position = 'above', align = 'center' }) {
  const posClass = position === 'below' ? 'below' : ''
  const alignClass = align === 'right' ? 'right' : ''
  return (
    <div className="tooltip-wrap">
      {children}
      <div className={`tooltip-box ${posClass} ${alignClass}`}>
        <div className="tt-title">{title}</div>
        {items.length > 0 && (
          <ul className="tt-list">
            {items.map((item, i) => <li key={i}>{item}</li>)}
          </ul>
        )}
      </div>
    </div>
  )
}

export function IconButton({ icon: Icon, onClick, tooltip, tooltipItems = [], size = 32, variant = 'ghost' }) {
  const btn = (
    <button onClick={onClick} style={{
      width: size, height: size, borderRadius: 'var(--radius-sm)',
      border: variant === 'ghost' ? '0.5px solid var(--gray-200)' : 'none',
      background: variant === 'red' ? 'var(--red)' : '#fff',
      color: variant === 'red' ? '#fff' : 'var(--gray-500)',
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      transition: 'all var(--transition)',
    }}
    onMouseEnter={e => { if (variant !== 'red') e.currentTarget.style.background = 'var(--gray-50)' }}
    onMouseLeave={e => { if (variant !== 'red') e.currentTarget.style.background = '#fff' }}>
      <Icon size={14} />
    </button>
  )
  if (!tooltip) return btn
  return <Tooltip title={tooltip} items={tooltipItems} position="below" align="right">{btn}</Tooltip>
}

export function Button({ children, onClick, variant = 'primary', size = 'md', icon: Icon, style: extraStyle = {} }) {
  const styles = {
    primary: { background: 'var(--red)', color: '#fff', border: 'none' },
    ghost: { background: '#fff', color: 'var(--gray-600)', border: '0.5px solid var(--gray-200)' },
    danger: { background: 'var(--danger-bg)', color: 'var(--danger)', border: 'none' },
  }
  const sizes = {
    sm: { padding: '5px 11px', fontSize: 12 },
    md: { padding: '7px 15px', fontSize: 13 },
    lg: { padding: '10px 20px', fontSize: 14 },
  }
  return (
    <button onClick={onClick} style={{
      ...styles[variant], ...sizes[size],
      borderRadius: 'var(--radius-md)', fontWeight: 500, fontFamily: 'var(--font)',
      display: 'inline-flex', alignItems: 'center', gap: 6, cursor: 'pointer',
      transition: 'all var(--transition)', ...extraStyle
    }}
    onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
    onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}>
      {Icon && <Icon size={13} />}
      {children}
    </button>
  )
}

export function Card({ children, style = {}, onClick, featured = false }) {
  return (
    <div onClick={onClick} style={{
      background: '#fff',
      border: featured ? '1.5px solid var(--red)' : '0.5px solid var(--gray-200)',
      borderRadius: 'var(--radius-lg)',
      padding: '14px 16px',
      boxShadow: 'var(--shadow-sm)',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'border-color var(--transition), box-shadow var(--transition)',
      ...style
    }}
    onMouseEnter={e => { if (onClick && !featured) { e.currentTarget.style.borderColor = 'var(--gray-300)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)' } }}
    onMouseLeave={e => { if (onClick && !featured) { e.currentTarget.style.borderColor = 'var(--gray-200)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)' } }}>
      {children}
    </div>
  )
}

export function AiAlert({ text, onAction }) {
  if (!text) return null
  return (
    <div style={{
      background: 'var(--red-light)', border: '1px solid var(--red-border)',
      borderRadius: 'var(--radius-md)', padding: '10px 14px',
      display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14,
      animation: 'fadeIn 0.3s ease'
    }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, background: 'var(--red)',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, flexShrink: 0
      }}>✦</div>
      <div style={{ flex: 1, fontSize: 12, color: '#991B1B', lineHeight: 1.5 }}>
        <strong style={{ color: 'var(--red)' }}>AI: </strong>{text}
      </div>
      {onAction && (
        <button onClick={onAction} style={{
          fontSize: 11, padding: '3px 9px', background: 'var(--red)',
          color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'var(--font)'
        }}>Detay →</button>
      )}
    </div>
  )
}

export function PhaseTimeline({ phases }) {
  const doneCount = phases.filter(p => p.status === 'done').length
  const pct = phases.length > 1 ? (doneCount / (phases.length - 1)) * 100 : 0
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', padding: '4px 0' }}>
      <div style={{ position: 'absolute', top: 10, left: 10, right: 10, height: 2, background: 'var(--gray-100)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: 10, left: 10, height: 2, width: `calc(${pct}% - 0px)`, background: 'var(--red)', zIndex: 1, transition: 'width 0.6s ease' }} />
      {phases.map(ph => (
        <Tooltip key={ph.id} title={`${ph.name} — ${ph.status === 'done' ? 'Tamamlandı' : ph.status === 'active' ? 'Devam ediyor' : 'Bekliyor'}`} items={[ph.date, ph.desc]} position="below">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, position: 'relative', cursor: 'default' }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%',
              background: ph.status === 'done' ? 'var(--red)' : ph.status === 'active' ? '#fff' : '#fff',
              border: ph.status === 'done' ? '2px solid var(--red)' : ph.status === 'active' ? '2.5px solid var(--red)' : '2px solid var(--gray-200)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: ph.status === 'active' ? '0 0 0 4px rgba(232,23,26,0.12)' : 'none',
              transition: 'all 0.3s ease'
            }}>
              {ph.status === 'done' && <span style={{ fontSize: 9, color: '#fff' }}>✓</span>}
              {ph.status === 'active' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--red)', display: 'block' }} />}
            </div>
            <div style={{
              fontSize: 9.5, marginTop: 5, textAlign: 'center', maxWidth: 52, lineHeight: 1.3,
              color: ph.status === 'done' ? 'var(--dark)' : ph.status === 'active' ? 'var(--red)' : 'var(--gray-400)',
              fontWeight: ph.status === 'active' ? 600 : ph.status === 'done' ? 500 : 400
            }}>{ph.name}</div>
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

export function StatCard({ label, value, delta, deltaType = 'neutral' }) {
  const deltaColor = deltaType === 'up' ? 'var(--success)' : deltaType === 'down' ? 'var(--danger)' : 'var(--gray-400)'
  return (
    <div style={{ background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', padding: '12px 14px' }}>
      <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--dark)', lineHeight: 1 }}>{value}</div>
      {delta && <div style={{ fontSize: 11, color: deltaColor, marginTop: 4 }}>{delta}</div>}
    </div>
  )
}
