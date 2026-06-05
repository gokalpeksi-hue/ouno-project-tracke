export const DEPARTMENTS = [
  { id: 'urun', label: 'Ürün yönetimi', color: '#7C3AED', bg: '#F5F3FF' },
  { id: 'paz', label: 'Pazarlama', color: '#0F6E56', bg: '#E1F5EE' },
  { id: 'satis', label: 'Satış', color: '#0F6E56', bg: '#E1F5EE' },
  { id: 'ithal', label: 'İthalat', color: '#92400E', bg: '#FAEEDA' },
  { id: 'finans', label: 'Finans', color: '#166534', bg: '#F0FDF4' },
  { id: 'teknik', label: 'Teknik servis', color: '#9A3412', bg: '#FAECE7' },
  { id: 'yazilim', label: 'Yazılım ekibi', color: '#1D4ED8', bg: '#EFF6FF' },
  { id: 'hukuk', label: 'Hukuk', color: '#6B21A8', bg: '#FDF4FF' },
  { id: 'yk', label: 'Yönetim kurulu', color: '#374151', bg: '#F7F7F8' },
]

export const ROLES = [
  { id: 'yk_baskani', label: 'YK Başkanı', level: 1 },
  { id: 'admin', label: 'Admin', level: 2 },
  { id: 'proje_lideri', label: 'Proje Lideri', level: 3 },
  { id: 'proje_baslatici', label: 'Proje Başlatıcı', level: 3 },
  { id: 'uye', label: 'Üye', level: 4 },
]

export const USERS = [
  { id: 'u1', name: 'Ahmet Kaya', initials: 'AK', role: 'proje_lideri', dept: 'urun', email: 'ahmet@ouno.com' },
  { id: 'u2', name: 'Mert Erdoğan', initials: 'ME', role: 'uye', dept: 'ithal', email: 'mert@ouno.com' },
  { id: 'u3', name: 'Selin Çelik', initials: 'SC', role: 'uye', dept: 'yazilim', email: 'selin@ouno.com' },
  { id: 'u4', name: 'Elif Kara', initials: 'EK', role: 'uye', dept: 'paz', email: 'elif@ouno.com' },
  { id: 'u5', name: 'Can Arslan', initials: 'CA', role: 'uye', dept: 'yazilim', email: 'can@ouno.com' },
  { id: 'u6', name: 'Zeynep Yıldız', initials: 'ZY', role: 'admin', dept: 'finans', email: 'zeynep@ouno.com' },
]

export const PROJECTS = [
  {
    id: 'p1',
    name: 'SenseEyes',
    subtitle: 'Akıllı güvenlik ekosistemi',
    type: 'ecosystem',
    icon: '👁️',
    color: '#E8171A',
    bg: '#FFF0F0',
    progress: 38,
    status: 'at_risk',
    sprint: 3,
    totalSprints: 5,
    startDate: '2026-02-10',
    endDate: '2026-09-30',
    priority: 'high',
    members: ['u1','u2','u3','u4','u5'],
    leaderId: 'u1',
    departments: ['urun','ithal','yazilim','finans','teknik','hukuk','yk'],
    subProjects: [
      {
        id: 'sp1', name: 'Akıllı kapı', progress: 60, status: 'active', sprint: 3,
        dept: 'yazilim', color: '#E8171A',
      },
      {
        id: 'sp2', name: 'Akıllı kamera', progress: 25, status: 'at_risk', sprint: 1,
        dept: 'yazilim', color: '#D97706',
      },
      {
        id: 'sp3', name: 'Merkezi platform', progress: 10, status: 'blocked', sprint: 0,
        dept: 'yazilim', color: '#DC2626',
      },
    ],
    tasks: [
      { id: 't1', title: 'Tedarikçi seçimi', dept: 'ithal', assignee: 'u2', status: 'done', dueDate: '2026-03-15', priority: 'high' },
      { id: 't2', title: 'Gümrük belgesi onayı', dept: 'ithal', assignee: 'u2', status: 'pending', dueDate: '2026-06-05', priority: 'critical' },
      { id: 't3', title: 'API entegrasyon testi', dept: 'yazilim', assignee: 'u3', status: 'pending', dueDate: '2026-06-12', priority: 'high' },
      { id: 't4', title: 'Hukuk: sözleşme inceleme', dept: 'hukuk', assignee: null, status: 'pending', dueDate: '2026-06-01', priority: 'critical' },
      { id: 't5', title: 'YK bütçe onayı', dept: 'yk', assignee: null, status: 'done', dueDate: '2026-02-20', priority: 'high' },
      { id: 't6', title: 'Sprint 3 planlama', dept: 'yazilim', assignee: 'u1', status: 'done', dueDate: '2026-05-20', priority: 'medium' },
      { id: 't7', title: 'Teknik servis kurulum planı', dept: 'teknik', assignee: 'u5', status: 'pending', dueDate: '2026-06-20', priority: 'medium' },
      { id: 't8', title: 'Pazarlama lansman materyali', dept: 'paz', assignee: 'u4', status: 'pending', dueDate: '2026-07-01', priority: 'medium' },
    ],
    files: [
      { id: 'f1', name: 'tedarikci-sozlesmesi-v2.pdf', type: 'pdf', dept: 'hukuk', size: '245 KB', uploader: 'u2', date: '2026-06-02' },
      { id: 'f2', name: 'senseeyes-butce-mayis.xlsx', type: 'excel', dept: 'finans', size: '88 KB', uploader: 'u1', date: '2026-05-28' },
      { id: 'f3', name: 'kapi-kurulum-foto.jpg', type: 'image', dept: 'teknik', size: '1.2 MB', uploader: 'u3', date: '2026-06-01' },
    ],
    messages: [
      { id: 'm1', sender: 'u1', text: 'Akıllı Kapı Sprint 3 başladı. İthalat ekibinden gümrük onayı bekliyoruz.', time: '14:32', channel: 'general' },
      { id: 'm2', sender: 'u2', text: 'Sabah gümrükten dökümanlar geldi, sisteme yüklüyorum.', time: '14:45', channel: 'general' },
      { id: 'm3', sender: 'u3', text: 'Yüklediğinde haber ver, API entegrasyonunu test edeceğiz.', time: '14:47', channel: 'general' },
      { id: 'm4', text: 'Tedarikçiden teyit geldi, ürünler yola çıktı. Teslimat Cuma.', time: '15:03', channel: 'general', source: 'whatsapp', senderName: 'Selin C.' },
    ],
    aiAlert: 'İthalat 3 gün geride — Yazılım Sprint 4 bloke olabilir. Hukuk sözleşmesi 5 gündür onaysız.',
    phases: [
      { id: 'ph1', name: 'Planlama', status: 'done', date: 'Şub 2026', desc: 'YK onayı alındı, bütçe 320k TL' },
      { id: 'ph2', name: 'Tedarik', status: 'done', date: 'May 2026', desc: '3 sözleşme imzalandı, ürünler depoda' },
      { id: 'ph3', name: 'Geliştirme', status: 'active', date: 'Haz 2026', desc: 'Sprint 3, API entegrasyon %60' },
      { id: 'ph4', name: 'Test & Kurulum', status: 'pending', date: 'Tem 2026', desc: 'Teknik servis sorumlu' },
      { id: 'ph5', name: 'Lansman', status: 'pending', date: 'Eyl 2026', desc: 'Eylül 2026 hedefi' },
    ]
  },
  {
    id: 'p2',
    name: 'Kampanya B',
    subtitle: 'Yaz lansmanı kampanyası',
    type: 'project',
    icon: '📢',
    color: '#16A34A',
    bg: '#F0FDF4',
    progress: 72,
    status: 'on_track',
    sprint: 4,
    totalSprints: 4,
    startDate: '2026-03-01',
    endDate: '2026-07-15',
    priority: 'medium',
    members: ['u4','u1'],
    leaderId: 'u4',
    departments: ['paz','satis','yazilim'],
    subProjects: [],
    tasks: [
      { id: 't9', title: 'Pazar araştırması', dept: 'paz', assignee: 'u4', status: 'done', dueDate: '2026-03-20', priority: 'high' },
      { id: 't10', title: 'Lansman kopyası yazımı', dept: 'paz', assignee: 'u4', status: 'pending', dueDate: '2026-06-09', priority: 'high' },
      { id: 't11', title: 'Dijital kampanya setup', dept: 'yazilim', assignee: 'u3', status: 'done', dueDate: '2026-05-30', priority: 'medium' },
    ],
    files: [],
    messages: [
      { id: 'm5', sender: 'u4', text: 'Lansman takvimi onaylandı. Sprint 4 başlıyoruz.', time: '10:15', channel: 'general' },
    ],
    aiAlert: null,
    phases: [
      { id: 'ph6', name: 'Araştırma', status: 'done', date: 'Mar 2026', desc: 'Pazar analizi tamamlandı' },
      { id: 'ph7', name: 'Strateji', status: 'done', date: 'Nis 2026', desc: 'Kampanya stratejisi onaylandı' },
      { id: 'ph8', name: 'Üretim', status: 'active', date: 'Haz 2026', desc: 'İçerik üretimi devam ediyor' },
      { id: 'ph9', name: 'Yayın', status: 'pending', date: 'Tem 2026', desc: 'Temmuz lansmanı hedefleniyor' },
    ]
  },
  {
    id: 'p3',
    name: 'Web sitesi',
    subtitle: 'Yeniden tasarım projesi',
    type: 'project',
    icon: '🌐',
    color: '#D97706',
    bg: '#FFFBEB',
    progress: 45,
    status: 'pending_approval',
    sprint: 2,
    totalSprints: 3,
    startDate: '2026-04-01',
    endDate: '2026-07-30',
    priority: 'medium',
    members: ['u5','u3'],
    leaderId: 'u5',
    departments: ['yazilim','paz','finans'],
    subProjects: [],
    tasks: [
      { id: 't12', title: 'UX tasarım onayı', dept: 'urun', assignee: 'u1', status: 'pending', dueDate: '2026-06-07', priority: 'high' },
      { id: 't13', title: 'Frontend geliştirme', dept: 'yazilim', assignee: 'u5', status: 'pending', dueDate: '2026-06-25', priority: 'high' },
      { id: 't14', title: 'SEO optimizasyonu', dept: 'paz', assignee: 'u4', status: 'pending', dueDate: '2026-07-10', priority: 'medium' },
    ],
    files: [],
    messages: [],
    aiAlert: 'UX onayı 2 gündür bekliyor. Finans onayı alınmadı.',
    phases: [
      { id: 'ph10', name: 'Tasarım', status: 'done', date: 'Nis 2026', desc: 'Wireframe tamamlandı' },
      { id: 'ph11', name: 'Geliştirme', status: 'active', date: 'Haz 2026', desc: 'Frontend sprint devam ediyor' },
      { id: 'ph12', name: 'Test', status: 'pending', date: 'Tem 2026', desc: 'QA ve performans testi' },
    ]
  }
]

export const STATUS_CONFIG = {
  on_track: { label: 'Yolunda', color: '#16A34A', bg: '#F0FDF4' },
  at_risk: { label: 'Risk var', color: '#D97706', bg: '#FFFBEB' },
  blocked: { label: 'Bloke', color: '#DC2626', bg: '#FEF2F2' },
  pending_approval: { label: 'Onay bekliyor', color: '#2563EB', bg: '#EFF6FF' },
  done: { label: 'Tamamlandı', color: '#16A34A', bg: '#F0FDF4' },
  active: { label: 'Aktif', color: '#E8171A', bg: '#FFF0F0' },
}

export const PRIORITY_CONFIG = {
  critical: { label: 'Kritik', color: '#DC2626', bg: '#FEF2F2' },
  high: { label: 'Yüksek', color: '#E8171A', bg: '#FFF0F0' },
  medium: { label: 'Normal', color: '#D97706', bg: '#FFFBEB' },
  low: { label: 'Düşük', color: '#6B7280', bg: '#F7F7F8' },
}
