import React, { useState } from 'react'
import { PROJECTS, USERS } from '../data/mockData'
import { Avatar, Card, DeptBadge, AiAlert } from '../components/UI'
import { Send, Paperclip, Hash, MessageSquare } from 'lucide-react'

const CHANNELS = [
  { id: 'general', label: 'Genel', icon: Hash },
  { id: 'yazilim', label: 'Yazılım', icon: Hash },
  { id: 'hukuk', label: 'Hukuk & Onaylar', icon: Hash },
  { id: 'wa', label: 'WhatsApp Köprüsü', icon: MessageSquare },
]

export default function Messages({ activeProject }) {
  const project = PROJECTS.find(p => p.id === activeProject) || PROJECTS[0]
  const [activeChannel, setActiveChannel] = useState('general')
  const [newMsg, setNewMsg] = useState('')
  const [messages, setMessages] = useState(project.messages)

  const send = () => {
    if (!newMsg.trim()) return
    setMessages(prev => [...prev, {
      id: 'new_' + Date.now(), sender: 'u1', text: newMsg, time: new Date().toLocaleTimeString('tr',{hour:'2-digit',minute:'2-digit'}), channel: activeChannel
    }])
    setNewMsg('')
  }

  const filtered = messages.filter(m => m.channel === activeChannel)

  return (
    <div style={{ display: 'flex', height: '100%', animation: 'fadeIn 0.25s ease' }}>
      {/* Channel list */}
      <div style={{ width: 200, background: '#fff', borderRight: '1px solid var(--gray-100)', padding: '16px 0', flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--gray-300)', letterSpacing: '.6px', padding: '0 14px 8px', textTransform: 'uppercase' }}>{project.name}</div>
        {CHANNELS.map(ch => (
          <button key={ch.id} onClick={() => setActiveChannel(ch.id)} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 8,
            padding: '7px 14px', fontSize: 12.5, fontFamily: 'var(--font)',
            color: activeChannel === ch.id ? 'var(--red)' : 'var(--gray-500)',
            background: activeChannel === ch.id ? 'var(--red-light)' : 'transparent',
            border: 'none', borderRight: activeChannel === ch.id ? '2px solid var(--red)' : '2px solid transparent',
            cursor: 'pointer', textAlign: 'left', fontWeight: activeChannel === ch.id ? 500 : 400,
          }}>
            <ch.icon size={13} />
            {ch.label}
            {ch.id === 'wa' && <span style={{ marginLeft: 'auto', fontSize: 9, background: '#E1F5EE', color: '#0F6E56', padding: '1px 5px', borderRadius: 5, fontWeight: 600 }}>WA</span>}
          </button>
        ))}
        <div style={{ margin: '12px 14px 0', padding: '10px 12px', background: 'var(--gray-50)', borderRadius: 8 }}>
          <div style={{ fontSize: 10.5, fontWeight: 600, color: 'var(--gray-500)', marginBottom: 4 }}>WA Köprüsü</div>
          <div style={{ fontSize: 10.5, color: 'var(--gray-400)', lineHeight: 1.5 }}>WA'dan bu hatta mesaj at → projeye otomatik düşer</div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--gray-100)', background: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Hash size={14} color="var(--gray-400)" />
          <span style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--dark)' }}>{CHANNELS.find(c => c.id === activeChannel)?.label}</span>
          <span style={{ fontSize: 11, color: 'var(--gray-400)', marginLeft: 8 }}>{project.members.length} üye</span>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--gray-300)', fontSize: 13 }}>
              Henüz mesaj yok. İlk mesajı gönder.
            </div>
          )}
          {filtered.map(msg => {
            const user = USERS.find(u => u.id === msg.sender)
            const isWA = msg.source === 'whatsapp'
            const isMe = msg.sender === 'u1'
            return (
              <div key={msg.id} style={{ display: 'flex', gap: 10, flexDirection: isMe ? 'row-reverse' : 'row', animation: 'fadeIn 0.2s ease' }}>
                {!isMe && !isWA && <Avatar userId={msg.sender} size={28} style={{ flexShrink: 0, marginTop: 2 }} />}
                {isWA && (
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#E1F5EE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#0F6E56', flexShrink: 0 }}>WA</div>
                )}
                <div style={{ maxWidth: '75%' }}>
                  {!isMe && (
                    <div style={{ fontSize: 11, color: 'var(--gray-400)', marginBottom: 3 }}>
                      {isWA ? msg.senderName : user?.name}
                      {isWA && <span style={{ fontSize: 10, background: '#E1F5EE', color: '#0F6E56', padding: '0px 5px', borderRadius: 4, marginLeft: 6 }}>WhatsApp</span>}
                    </div>
                  )}
                  <div style={{
                    padding: '8px 12px', borderRadius: isMe ? '10px 0 10px 10px' : '0 10px 10px 10px',
                    background: isMe ? 'var(--red-light)' : isWA ? '#E1F5EE' : '#fff',
                    border: `0.5px solid ${isMe ? 'var(--red-border)' : isWA ? 'rgba(15,110,86,0.2)' : 'var(--gray-200)'}`,
                    fontSize: 13, color: 'var(--dark)', lineHeight: 1.5
                  }}>
                    {msg.text}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--gray-300)', marginTop: 3, textAlign: isMe ? 'right' : 'left' }}>{msg.time}</div>
                </div>
              </div>
            )
          })}
          {/* AI suggestion */}
          {activeChannel === 'general' && (
            <div style={{ background: 'var(--red-light)', border: '1px solid var(--red-border)', borderRadius: 8, padding: '8px 12px', display: 'flex', gap: 8, fontSize: 12, color: '#991B1B' }}>
              <span style={{ fontWeight: 600 }}>✦ AI:</span>
              <span>WA mesajında "teslimat Cuma" ifadesi tespit edildi → Takvim güncellemesi: İthalat Sprint 3 bitiş tarihi Cuma olarak işaretlensin mi?</span>
              <button style={{ marginLeft: 'auto', fontSize: 11, background: 'var(--red)', color: '#fff', border: 'none', borderRadius: 5, padding: '2px 8px', cursor: 'pointer', fontFamily: 'var(--font)', whiteSpace: 'nowrap' }}>Uygula</button>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--gray-100)', background: '#fff', display: 'flex', gap: 8 }}>
          <input
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder={`#${CHANNELS.find(c => c.id === activeChannel)?.label} kanalına yaz...`}
            style={{
              flex: 1, padding: '8px 12px', border: '0.5px solid var(--gray-200)',
              borderRadius: 'var(--radius-md)', fontSize: 13, fontFamily: 'var(--font)',
              background: 'var(--gray-50)', color: 'var(--dark)', outline: 'none'
            }}
          />
          <button onClick={send} style={{
            width: 36, height: 36, borderRadius: 'var(--radius-md)',
            background: 'var(--red)', color: '#fff', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
