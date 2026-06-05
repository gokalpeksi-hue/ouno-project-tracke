import React, { useState } from 'react'
import { PROJECTS } from '../data/mockData'
import { Card } from '../components/UI'
import { Sparkles, ChevronRight, AlertTriangle, CheckCircle, Clock, Zap } from 'lucide-react'

const AI_INSIGHTS = [
  { id: 1, type: 'warning', icon: AlertTriangle, title: 'İthalat 3 gün geride', desc: 'Yazılım Sprint 4 bloke olabilir. Gümrük belgesi bugün teslim edilmeli.', project: 'SenseEyes', action: 'Göreve git' },
  { id: 2, type: 'critical', icon: AlertTriangle, title: 'Hukuk onayı 5 gündür bekliyor', desc: 'Tedarikçi sözleşmesi inceleme adımı kritik yolda. YK eskalasyon gerekebilir.', project: 'SenseEyes', action: 'Eskalasyon gönder' },
  { id: 3, type: 'info', icon: Zap, title: 'Kampanya B Sprint 4 tamamlanmak üzere', desc: '%72 tamamlandı. Lansman için son 2 görev kaldı. Pazarlama ekibine hatırlatma gönderilsin mi?', project: 'Kampanya B', action: 'Hatırlatma gönder' },
  { id: 4, type: 'success', icon: CheckCircle, title: 'SenseEyes ithalat aşaması bitti', desc: 'Ürünler depoya girdi. Yazılım ekibine otomatik bildirim gönderildi.', project: 'SenseEyes', action: 'Görüntüle' },
]

const TYPE_STYLES = {
  warning: { bg: '#FFFBEB', border: 'rgba(217,119,6,0.2)', icon: '#D97706', badge: '#D97706', badgeBg: '#FFFBEB' },
  critical: { bg: '#FEF2F2', border: 'rgba(220,38,38,0.2)', icon: '#DC2626', badge: '#DC2626', badgeBg: '#FEF2F2' },
  info: { bg: '#FFF0F0', border: 'rgba(232,23,26,0.2)', icon: 'var(--red)', badge: 'var(--red)', badgeBg: '#FFF0F0' },
  success: { bg: '#F0FDF4', border: 'rgba(22,163,74,0.2)', icon: '#16A34A', badge: '#16A34A', badgeBg: '#F0FDF4' },
}

export default function AIAssistant({ activeProject }) {
  const project = PROJECTS.find(p => p.id === activeProject) || PROJECTS[0]
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState(null)
  const [step, setStep] = useState(0)

  const DEMO_RESPONSES = [
    `**SenseEyes projesi analizi:**\n\nProje %38 tamamlandı, Sprint 3 aktif. Kritik yolda 2 engel var:\n\n1. Hukuk sözleşme onayı → 5 gündür bekliyor\n2. İthalat 3 gün geride → Yazılım Sprint 4 etkilenecek\n\nÖnerilen aksiyon: Hukuk departmanına eskalasyon, ithalat ekibine bugün son tarih.`,
    `**AI omurga önerisi — Web Sitesi Projesi:**\n\nProje tipi: Yazılım geliştirme + Pazarlama\nTespit edilen departmanlar: Yazılım, Pazarlama, Finans, YK\n\nÖnerilen sıra:\n1. YK onayı (bütçe)\n2. Yazılım (geliştirme)\n3. Pazarlama (SEO + içerik)\n4. Finans (kapanış)\n\nSprint önerisi: 3 sprint × 2 hafta`,
    `**Bugünkü öncelikler:**\n\n🔴 Kritik: Gümrük belgesi yüklenmesi (bugün son tarih)\n🔴 Kritik: Hukuk sözleşme onayı (gecikti)\n🟡 Yüksek: API entegrasyon testi (12 Haz)\n🟡 Yüksek: Web sitesi UX onayı (7 Haz)\n\nToplam 4 kritik aksiyon bekliyor.`
  ]

  const ask = () => {
    if (!prompt.trim()) return
    setLoading(true)
    setResponse(null)
    setTimeout(() => {
      setResponse(DEMO_RESPONSES[step % DEMO_RESPONSES.length])
      setStep(s => s + 1)
      setLoading(false)
    }, 1200)
    setPrompt('')
  }

  const QUICK_PROMPTS = [
    'Bugün ne yapmalıyım?',
    `${project.name} projesini analiz et`,
    'Geciken görevleri listele',
    'Yeni proje için omurga oluştur',
  ]

  return (
    <div style={{ padding: 20, animation: 'fadeIn 0.25s ease' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={20} color="#fff" />
        </div>
        <div>
          <h1 style={{ fontSize: 17, fontWeight: 600, color: 'var(--dark)' }}>AI Asistan</h1>
          <p style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 1 }}>Proje analizi, omurga önerisi, gecikme tespiti</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Chat */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card>
            <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 10 }}>Sor</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
              {QUICK_PROMPTS.map(q => (
                <button key={q} onClick={() => setPrompt(q)} style={{
                  fontSize: 11.5, padding: '4px 10px', borderRadius: 6,
                  border: '0.5px solid var(--gray-200)', background: 'var(--gray-50)',
                  color: 'var(--gray-600)', cursor: 'pointer', fontFamily: 'var(--font)',
                  transition: 'all var(--transition)'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-light)'; e.currentTarget.style.color = 'var(--red)'; e.currentTarget.style.borderColor = 'var(--red-border)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'var(--gray-50)'; e.currentTarget.style.color = 'var(--gray-600)'; e.currentTarget.style.borderColor = 'var(--gray-200)' }}>
                  {q}
                </button>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && ask()}
                placeholder="Proje hakkında sor..."
                style={{
                  flex: 1, padding: '8px 12px', border: '0.5px solid var(--gray-200)',
                  borderRadius: 'var(--radius-md)', fontSize: 13, fontFamily: 'var(--font)',
                  background: 'var(--gray-50)', color: 'var(--dark)', outline: 'none'
                }}
              />
              <button onClick={ask} style={{
                padding: '8px 14px', background: 'var(--red)', color: '#fff',
                border: 'none', borderRadius: 'var(--radius-md)', fontSize: 12.5,
                fontWeight: 500, fontFamily: 'var(--font)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 5
              }}>
                <Sparkles size={12} /> Sor
              </button>
            </div>
          </Card>

          {loading && (
            <Card>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sparkles size={13} color="#fff" />
                </div>
                <div style={{ display: 'flex', gap: 4 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--red)', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                  ))}
                </div>
              </div>
            </Card>
          )}

          {response && (
            <Card style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--red)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={13} color="#fff" />
                </div>
                <div style={{ fontSize: 12.5, color: 'var(--dark)', lineHeight: 1.7, whiteSpace: 'pre-line' }}>{response}</div>
              </div>
            </Card>
          )}
        </div>

        {/* Insights */}
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 10 }}>Proaktif uyarılar</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {AI_INSIGHTS.map(insight => {
              const s = TYPE_STYLES[insight.type]
              const Icon = insight.icon
              return (
                <div key={insight.id} style={{
                  background: s.bg, border: `1px solid ${s.border}`,
                  borderRadius: 'var(--radius-md)', padding: '11px 13px',
                  display: 'flex', gap: 10, animation: 'slideIn 0.25s ease'
                }}>
                  <Icon size={16} color={s.icon} style={{ flexShrink: 0, marginTop: 1 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--dark)', marginBottom: 2 }}>{insight.title}</div>
                    <div style={{ fontSize: 11.5, color: 'var(--gray-500)', lineHeight: 1.4, marginBottom: 6 }}>{insight.desc}</div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: 10.5, background: s.badgeBg, color: s.badge, padding: '1px 7px', borderRadius: 5, fontWeight: 500 }}>{insight.project}</span>
                      <button style={{ fontSize: 11, color: s.icon, background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 3, fontFamily: 'var(--font)' }}>
                        {insight.action} <ChevronRight size={10} />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
