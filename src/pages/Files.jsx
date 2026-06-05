import React, { useState, useRef } from 'react'
import { PROJECTS } from '../data/mockData'
import { Card, Tooltip, DeptBadge } from '../components/UI'
import { Upload, FileText, Table, Image, Eye, Download, MoreHorizontal, X } from 'lucide-react'

const FILE_ICONS = {
  pdf: { icon: FileText, bg: '#FEE2E2', color: '#DC2626' },
  excel: { icon: Table, bg: '#DCFCE7', color: '#16A34A' },
  image: { icon: Image, bg: '#EFF6FF', color: '#2563EB' },
}

export default function Files({ activeProject }) {
  const project = PROJECTS.find(p => p.id === activeProject) || PROJECTS[0]
  const [files, setFiles] = useState(project.files)
  const [dragging, setDragging] = useState(false)
  const [filter, setFilter] = useState('all')
  const inputRef = useRef()

  const handleFiles = (fileList) => {
    const allowed = ['pdf', 'xlsx', 'xls', 'jpg', 'jpeg', 'png']
    Array.from(fileList).forEach(f => {
      const ext = f.name.split('.').pop().toLowerCase()
      if (!allowed.includes(ext)) return
      const type = ['xlsx', 'xls'].includes(ext) ? 'excel' : ['jpg', 'jpeg', 'png'].includes(ext) ? 'image' : 'pdf'
      const size = f.size > 1024 * 1024 ? (f.size / 1024 / 1024).toFixed(1) + ' MB' : Math.round(f.size / 1024) + ' KB'
      setFiles(prev => [{
        id: 'f_' + Date.now(), name: f.name, type, dept: 'yazilim',
        size, uploader: 'u1', date: new Date().toISOString().split('T')[0]
      }, ...prev])
    })
  }

  const filtered = filter === 'all' ? files : files.filter(f => f.type === filter)

  return (
    <div style={{ padding: 20, animation: 'fadeIn 0.25s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 600, color: 'var(--dark)' }}>Dosyalar — {project.name}</h1>
          <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{files.length} dosya · PDF, Excel, JPG, PNG</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {['all','pdf','excel','image'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{
              padding: '5px 11px', fontSize: 11.5, borderRadius: 'var(--radius-sm)',
              border: '0.5px solid var(--gray-200)',
              background: filter === f ? 'var(--red)' : '#fff',
              color: filter === f ? '#fff' : 'var(--gray-500)',
              cursor: 'pointer', fontFamily: 'var(--font)', fontWeight: filter === f ? 500 : 400
            }}>
              {f === 'all' ? 'Tümü' : f === 'pdf' ? 'PDF' : f === 'excel' ? 'Excel' : 'Görsel'}
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
        style={{
          border: `1.5px dashed ${dragging ? 'var(--red)' : 'var(--gray-200)'}`,
          borderRadius: 'var(--radius-lg)', padding: '24px',
          textAlign: 'center', cursor: 'pointer', marginBottom: 16,
          background: dragging ? 'var(--red-light)' : '#fff',
          transition: 'all var(--transition)'
        }}
      >
        <input ref={inputRef} type="file" multiple accept=".pdf,.xlsx,.xls,.jpg,.jpeg,.png" style={{ display: 'none' }} onChange={e => handleFiles(e.target.files)} />
        <Upload size={22} color={dragging ? 'var(--red)' : 'var(--gray-300)'} style={{ margin: '0 auto 8px' }} />
        <div style={{ fontSize: 13, color: dragging ? 'var(--red)' : 'var(--gray-500)', fontWeight: 500 }}>Sürükle bırak veya tıkla</div>
        <div style={{ fontSize: 11.5, color: 'var(--gray-400)', marginTop: 4 }}>Aşamaya veya göreve bağlayabilirsin</div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {[['PDF','#DC2626'], ['Excel','#16A34A'], ['JPG','#2563EB'], ['PNG','#7C3AED']].map(([label, color]) => (
            <span key={label} style={{ fontSize: 10.5, padding: '2px 8px', borderRadius: 5, background: 'var(--gray-50)', color, fontWeight: 600, border: '0.5px solid var(--gray-200)' }}>{label}</span>
          ))}
        </div>
      </div>

      {/* Bağla seçiciler */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-400)', display: 'block', marginBottom: 4 }}>Dosyayı bağla</label>
          <select style={{ width: '100%', padding: '7px 10px', fontSize: 12.5, border: '0.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)', background: '#fff', color: 'var(--dark)', fontFamily: 'var(--font)' }}>
            <option>Projeye genel</option>
            {project.subProjects?.map(sp => <option key={sp.id}>{sp.name}</option>)}
            {project.phases?.map(ph => <option key={ph.id}>{ph.name} aşaması</option>)}
          </select>
        </div>
        <div style={{ flex: 1 }}>
          <label style={{ fontSize: 11, color: 'var(--gray-400)', display: 'block', marginBottom: 4 }}>Dosya tipi</label>
          <select style={{ width: '100%', padding: '7px 10px', fontSize: 12.5, border: '0.5px solid var(--gray-200)', borderRadius: 'var(--radius-md)', background: '#fff', color: 'var(--dark)', fontFamily: 'var(--font)' }}>
            <option>Seç...</option>
            <option>Sözleşme</option>
            <option>Teknik döküman</option>
            <option>Bütçe / Finans</option>
            <option>Sunum / Rapor</option>
            <option>Fotoğraf / Görsel</option>
          </select>
        </div>
      </div>

      {/* File list */}
      <Card>
        <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 10 }}>
          {filtered.length} dosya {filter !== 'all' ? `(${filter})` : ''}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--gray-300)', fontSize: 13 }}>
            Henüz dosya yok
          </div>
        )}
        {filtered.map(f => {
          const cfg = FILE_ICONS[f.type] || FILE_ICONS.pdf
          const Icon = cfg.icon
          return (
            <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderBottom: '0.5px solid var(--gray-100)' }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon size={14} color={cfg.color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--dark)' }}>{f.name}</div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center', marginTop: 2 }}>
                  <DeptBadge deptId={f.dept} />
                  <span style={{ fontSize: 10.5, color: 'var(--gray-400)' }}>{f.size} · {f.date}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 4 }}>
                <Tooltip title="Önizle" items={['Tarayıcıda aç', 'Tam ekran']} position="below" align="right">
                  <button style={{ width: 28, height: 28, borderRadius: 6, border: '0.5px solid var(--gray-200)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Eye size={12} color="var(--gray-500)" />
                  </button>
                </Tooltip>
                <Tooltip title="İndir" items={['Orijinal dosyayı indir']} position="below" align="right">
                  <button style={{ width: 28, height: 28, borderRadius: 6, border: '0.5px solid var(--gray-200)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <Download size={12} color="var(--gray-500)" />
                  </button>
                </Tooltip>
                <Tooltip title="Daha fazla" items={['Yeni versiyon yükle', 'Göreve bağla', 'Arşivle']} position="below" align="right">
                  <button style={{ width: 28, height: 28, borderRadius: 6, border: '0.5px solid var(--gray-200)', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                    <MoreHorizontal size={12} color="var(--gray-500)" />
                  </button>
                </Tooltip>
              </div>
            </div>
          )
        })}
      </Card>
    </div>
  )
}
