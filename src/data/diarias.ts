export type Portal = 'G1' | 'GE' | 'Globo.com' | 'GloboPlay' | 'GSHOW'

export type Formato =
  | 'Billboard (Desktop)'
  | 'Stickyad (Mobile)'
  | 'Retângulo Médio (Mobile)'
  | 'Touchpoint Bottom (Mobile e Desktop)'
  | 'Meia Página (Desktop)'
  | 'In-stream Vídeo'

export interface Produto {
  id: string
  nome: string
  portal: Portal
  formatos: Formato[]
  cobertura: 'Nacional' | 'Regional'
  regioes?: string[]
}

export const PORTAIS: { id: Portal; label: string; icon: string; tagline: string }[] = [
  { id: 'G1',        label: 'G1',        icon: 'public',       tagline: 'Principal portal de notícias' },
  { id: 'GE',        label: 'GE',        icon: 'sports_soccer',tagline: 'Globo Esporte — futebol e esportes' },
  { id: 'Globo.com', label: 'Globo.com', icon: 'language',     tagline: 'Portal principal da Globo' },
  { id: 'GloboPlay', label: 'GloboPlay', icon: 'smart_display', tagline: 'Streaming de vídeo on demand' },
  { id: 'GSHOW',     label: 'Gshow',     icon: 'star',         tagline: 'Entretenimento e celebridades' },
]

export const PORTAL_COLORS: Record<Portal, { border: string; bg: string; text: string; iconBg: string }> = {
  'G1':        { border: 'border-red-300',    bg: 'bg-red-50',     text: 'text-red-700',    iconBg: 'bg-red-100' },
  'GE':        { border: 'border-blue-300',   bg: 'bg-blue-50',    text: 'text-blue-800',   iconBg: 'bg-blue-100' },
  'Globo.com': { border: 'border-orange-300', bg: 'bg-orange-50',  text: 'text-orange-700', iconBg: 'bg-orange-100' },
  'GloboPlay': { border: 'border-gray-700',   bg: 'bg-gray-900',   text: 'text-white',      iconBg: 'bg-gray-700' },
  'GSHOW':     { border: 'border-purple-300', bg: 'bg-purple-50',  text: 'text-purple-700', iconBg: 'bg-purple-100' },
}

export const FORMATO_ICON: Record<Formato, string> = {
  'Billboard (Desktop)':                  'web_asset',
  'Stickyad (Mobile)':                    'stay_current_portrait',
  'Retângulo Médio (Mobile)':             'crop_portrait',
  'Touchpoint Bottom (Mobile e Desktop)': 'touch_app',
  'Meia Página (Desktop)':               'vertical_split',
  'In-stream Vídeo':                      'smart_display',
}

export const FORMATO_ACCEPT: Record<Formato, string> = {
  'Billboard (Desktop)':                  'image/*',
  'Stickyad (Mobile)':                    'image/*',
  'Retângulo Médio (Mobile)':             'image/*',
  'Touchpoint Bottom (Mobile e Desktop)': 'image/*',
  'Meia Página (Desktop)':               'image/*',
  'In-stream Vídeo':                      'video/*',
}

export const PRODUTOS: Produto[] = [
  // ── G1 ─────────────────────────────────────────────────────────────
  { id: 'g1-nac-1',  nome: 'Diária Nacional 1',   portal: 'G1', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Stickyad (Mobile)'] },
  { id: 'g1-nac-2',  nome: 'Diária Nacional 2',   portal: 'G1', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)'] },
  { id: 'g1-reg',    nome: 'Diária Regional',      portal: 'G1', cobertura: 'Regional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)'],
    regioes: ['DF', 'MG', 'PE', 'RJ', 'SP'] },
  { id: 'g1-touch',  nome: 'Diária Touchpoint',    portal: 'G1', cobertura: 'Nacional',
    formatos: ['Touchpoint Bottom (Mobile e Desktop)'] },
  { id: 'g1-home',   nome: 'Diária Homeday',       portal: 'G1', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)', 'Touchpoint Bottom (Mobile e Desktop)', 'Stickyad (Mobile)'] },

  // ── GE ─────────────────────────────────────────────────────────────
  { id: 'ge-nac-1',  nome: 'Diária Nacional 1',   portal: 'GE', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Stickyad (Mobile)'] },
  { id: 'ge-nac-2',  nome: 'Diária Nacional 2',   portal: 'GE', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)'] },
  { id: 'ge-nac-3',  nome: 'Diária Nacional 3',   portal: 'GE', cobertura: 'Nacional',
    formatos: ['Meia Página (Desktop)', 'Retângulo Médio (Mobile)'] },
  { id: 'ge-touch',  nome: 'Diária Touchpoint',   portal: 'GE', cobertura: 'Nacional',
    formatos: ['Touchpoint Bottom (Mobile e Desktop)'] },
  { id: 'ge-home',   nome: 'Diária Homeday',      portal: 'GE', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Meia Página (Desktop)', 'Retângulo Médio (Mobile)', 'Touchpoint Bottom (Mobile e Desktop)', 'Stickyad (Mobile)'] },

  // ── Globo.com ───────────────────────────────────────────────────────
  { id: 'gc-prem',   nome: 'Diária Super Premium', portal: 'Globo.com', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)'] },
  { id: 'gc-touch',  nome: 'Diária Touchpoint',    portal: 'Globo.com', cobertura: 'Nacional',
    formatos: ['Touchpoint Bottom (Mobile e Desktop)'] },
  { id: 'gc-reg',    nome: 'Diária Regional',       portal: 'Globo.com', cobertura: 'Regional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)'],
    regioes: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'] },
  { id: 'gc-home',   nome: 'Diária Homeday',        portal: 'Globo.com', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)', 'Touchpoint Bottom (Mobile e Desktop)'] },

  // ── GloboPlay ───────────────────────────────────────────────────────
  { id: 'gp-prime',  nome: 'Primeiríssima', portal: 'GloboPlay', cobertura: 'Nacional',
    formatos: ['In-stream Vídeo'] },
  { id: 'gp-seg',    nome: 'Segundíssima',  portal: 'GloboPlay', cobertura: 'Nacional',
    formatos: ['In-stream Vídeo'] },

  // ── GSHOW ───────────────────────────────────────────────────────────
  { id: 'gs-home',   nome: 'Diária Homeday', portal: 'GSHOW', cobertura: 'Nacional',
    formatos: ['Billboard (Desktop)', 'Retângulo Médio (Mobile)', 'Touchpoint Bottom (Mobile e Desktop)'] },
]
