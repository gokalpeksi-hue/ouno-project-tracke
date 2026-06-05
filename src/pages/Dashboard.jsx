import React, { useState } from 'react'
import { PROJECTS, USERS, STATUS_CONFIG } from '../data/mockData'
import { Card, StatCard, ProgressBar, StatusBadge, AiAlert, PhaseTimeline, Avatar, DeptBadge, Tooltip, Button } from '../components/UI'
import { Plus, Check, AlertTriangle, Clock, ChevronRight, Sparkles, Users, FileText, Zap } from 'lucide-react'

function TaskRow({ task, projectId }) {
  const [done, setDone] = useState(task.status === 'done')
  const user = USERS.find(u => u.id === task.assignee)
  const isLate = !done && new Date(task.dueDate) < new Date()
  const isToday = task.dueDate === new Date().toISOString().split('T')[0]
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 0', borderBottom: '0.5px solid var(--gray-100)',
      animation: 'fadeIn 0.2s ease'
    }}>
      <Tooltip title={done ? 'Tamamlandı' : 'Görevi tamamla'} items={done ? ['Geçmiş tarihe işlendi', 'Log kaydı oluşturuldu'] : ['Tamamlandı olarak işaretle', 'Tetikleyici ateşlenebilir']} position="below">
        <button onClick={() => setDone(!done)} style={{
          width: 17, height: 17, borderRadius: 4,
          border: done ? 'none' : '1.5px solid var(--gray-200)',
          background: done ? 'var(--red)' : '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', flexShrink: 0, transition: 'all 0.2s ease'
        }}>
          {done && <Check size={9} color="#fff" />}
        </button>
      </Tooltip>
      <span style={{ flex: 1, fontSize: 12.5, color: done ? 'var(--gray-300)' : 'var(--dark)', textDecoration: done ? 'line-through' : 'none' }}>
        {task.title}
      </span>
      <DeptBadge deptId={task.dept} />
      {user && <Avatar userId={task.assignee} size={20} />}
      <span style={{
        fontSize: 10.5,
        color: isLate ? 'var(--danger)' : isToday ? 'var(--red)' : 'var(--gray-400)',
        fontWeight: (isLate || isToday) ? 600 : 400
      }}>
        {isLate ? 'Gecikti' : isToday ? 'Bugün!' : task.dueDate?.slice(5)}
      </span>
    </div>
  )
}

function ProjectCard({ project, onClick, featured }) {
  const statusCfg = STATUS_CONFIG[project.status] || {}
  const barColor = project.status === 'on_track' ? '#16A34A' : project.status === 'blocked' ? '#DC2626' : project.status === 'pending_approval' ? '#D97706' : 'var(--red)'
  return (
    <Card onClick={onClick} featured={featured} style={{ cursor: 'pointer' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: project.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 }}>
          {project.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dark)' }}>{project.name}</div>
          <div style={{ fontSize: 11, color: 'var(--gray-400)', marginTop: 1 }}>{project.subtitle}</div>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <ProgressBar value={project.progress} color={barColor} />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 8 }}>
        <span style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--dark)' }}>{project.progress}%</span>
        <div style={{ display: 'flex' }}>
          {project.members.slice(0, 4).map((uid, i) => (
            <Avatar key={uid} userId={uid} size={18} style={{ marginLeft: i > 0 ? -5 : 0, border: '1.5px solid #fff' }} />
          ))}
          {project.members.length > 4 && (
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'var(--gray-100)', color: 'var(--gray-500)', fontSize: 9, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: -5, border: '1.5px solid #fff' }}>+{project.members.length - 4}</div>
          )}
        </div>
        <span style={{ fontSize: 10.5, color: 'var(--gray-400)' }}>Sprint {project.sprint}/{project.totalSprints}</span>
      </div>
    </Card>
  )
}

export default function Dashboard({ activeProject, onProjectChange }) {
  const [tab, setTab] = useState('all')
  const currentProject = PROJECTS.find(p => p.id === activeProject) || PROJECTS[0]
  const allTasks = PROJECTS.flatMap(p => p.tasks)
  const pendingTasks = allTasks.filter(t => t.status === 'pending')
  const criticalTasks = pendingTasks.filter(t => t.priority === 'critical')

  return (
    <div style={{ padding: 20, animation: 'fadeIn 0.25s ease' }}>
      {/* Page header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <h1 style={{ fontSize: 18, fontWeight: 600, color: 'var(--dark)' }}>Genel bakış</h1>
          <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>
            Cuma, 5 Haziran 2026 · {PROJECTS.length} aktif proje
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Tooltip title="Devam eden proje ekle" items={['Mevcut projeyi sisteme taşı', 'AI destekli hızlı import', 'Sprint durumunu belirle']} position="below" align="right">
            <Button variant="ghost" size="sm" icon={FileText}>Proje taşı</Button>
          </Tooltip>
          <Tooltip title="Yeni proje oluştur" items={['AI omurga motoru', 'Departman & ekip ata', 'Sprint döngüsünü kur']} position="below" align="right">
            <Button variant="primary" size="sm" icon={Plus}>Yeni proje</Button>
          </Tooltip>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 16 }}>
        <StatCard label="Aktif proje" value={PROJECTS.length} delta="↑ 1 bu ay" deltaType="up" />
        <StatCard label="Bekleyen görev" value={pendingTasks.length} delta={`${criticalTasks.length} kritik`} deltaType={criticalTasks.length > 0 ? 'down' : 'neutral'} />
        <StatCard label="Onay bekliyor" value="2" delta="YK + Hukuk" deltaType="down" />
        <StatCard label="Sprint günü kaldı" value="8" delta="Sprint 3" deltaType="up" />
      </div>

      {/* AI alert */}
      <AiAlert text={currentProject.aiAlert} onAction={() => {}} />

      {/* Projects grid */}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <h2 style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dark)' }}>Projeler</h2>
          <span style={{ fontSize: 11.5, color: 'var(--red)', cursor: 'pointer' }}>Tümünü gör →</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 10 }}>
          {PROJECTS.map(p => (
            <ProjectCard key={p.id} project={p} featured={p.id === currentProject.id} onClick={() => onProjectChange(p.id)} />
          ))}
          {/* New project placeholder */}
          <div style={{
            border: '1.5px dashed var(--gray-200)', borderRadius: 'var(--radius-lg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', gap: 8, cursor: 'pointer', minHeight: 100,
            transition: 'border-color var(--transition)'
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--red)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--gray-200)'}>
            <div style={{ width: 34, height: 34, borderRadius: 10, border: '1.5px dashed var(--gray-200)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Plus size={16} color="var(--gray-300)" />
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>Yeni proje başlat</div>
            <div style={{ fontSize: 10.5, color: 'var(--gray-300)' }}>AI omurga ile</div>
          </div>
        </div>
      </div>

      {/* Current project detail */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        {/* Tasks */}
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
            <h3 style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark)' }}>{currentProject.name} — Görevler</h3>
            <Tooltip title="Görev ekle" items={['Departmana ata', 'Öncelik belirle', 'Dosya ekle']} position="below" align="right">
              <button style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11.5, color: 'var(--red)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font)' }}>
                <Plus size={12} /> Görev ekle
              </button>
            </Tooltip>
          </div>
          {currentProject.tasks.slice(0, 6).map(t => <TaskRow key={t.id} task={t} projectId={currentProject.id} />)}
        </Card>

        {/* Project detail */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: currentProject.bg, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{currentProject.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dark)' }}>{currentProject.name}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-400)' }}>{currentProject.subtitle}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--red)' }}>{currentProject.progress}%</div>
                <div style={{ fontSize: 10, color: 'var(--gray-400)' }}>tamamlandı</div>
              </div>
            </div>
            <ProgressBar value={currentProject.progress} height={6} />
            <div style={{ marginTop: 14 }}>
              <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--gray-400)', letterSpacing: '.4px', marginBottom: 8, textTransform: 'uppercase' }}>Proje aşamaları</div>
              <PhaseTimeline phases={currentProject.phases} />
            </div>
            {currentProject.subProjects?.length > 0 && (
              <div style={{ marginTop: 14 }}>
                <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--gray-400)', letterSpacing: '.4px', marginBottom: 8, textTransform: 'uppercase' }}>Alt projeler</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {currentProject.subProjects.map(sp => (
                    <Tooltip key={sp.id} title={sp.name} items={[`Sprint ${sp.sprint}`, `${sp.progress}% tamamlandı`, sp.status === 'blocked' ? 'Bağımlılık bekleniyor' : 'Aktif']} position="below">
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 10px', background: 'var(--gray-50)', borderRadius: 8, cursor: 'default' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--dark)', marginBottom: 3 }}>{sp.name}</div>
                          <ProgressBar value={sp.progress} color={sp.color} height={3} />
                        </div>
                        <span style={{ fontSize: 10.5, fontWeight: 600, color: sp.color, minWidth: 30, textAlign: 'right' }}>{sp.progress}%</span>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </div>
            )}
          </Card>

          {/* Quick stats */}
          <Card>
            <div style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 8 }}>Ekip ({currentProject.members.length} üye)</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {currentProject.members.map(uid => {
                const u = USERS.find(x => x.id === uid)
                return u ? (
                  <Tooltip key={uid} title={u.name} items={[u.role, u.email]} position="below">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 8px', background: 'var(--gray-50)', borderRadius: 8 }}>
                      <Avatar userId={uid} size={20} />
                      <span style={{ fontSize: 11, color: 'var(--gray-600)' }}>{u.name.split(' ')[0]}</span>
                    </div>
                  </Tooltip>
                ) : null
              })}
              <Tooltip title="Üye davet et" items={['Mail daveti gönder', 'Rol belirle', 'Departman ata']} position="below">
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 8px', border: '1px dashed var(--gray-200)', borderRadius: 8, cursor: 'pointer', fontSize: 11, color: 'var(--gray-400)' }}>
                  <Plus size={11} /> Davet et
                </div>
              </Tooltip>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
