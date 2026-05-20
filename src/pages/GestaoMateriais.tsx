import { useState } from 'react'
import MIcon from '../components/MIcon'

type Status = 'Aprovado' | 'Em análise' | 'Reprovado'
type Thumb = 'dark-banner' | 'light-banner' | 'photo' | 'split'

interface Card {
  name: string
  format: string
  tag: string
  status: Status
  thumb: Thumb
  video?: string
}

const CARDS: Card[] = [
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Billboard',             tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'dark-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Super Leaderboard',     tag: 'Clube Orfeu', status: 'Em análise', thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Retângulo médio',       tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'dark-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Especial publicitário', tag: 'Clube Orfeu', status: 'Reprovado',  thumb: 'photo' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Super Leaderboard',     tag: 'Clube Orfeu', status: 'Em análise', thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'In-stream vídeo',       tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'photo',       video: '1:40' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Carrosel',              tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'split' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Maxiboard',             tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Carrosel',              tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'split' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Maxiboard',             tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'light-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'Billboard',             tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'dark-banner' },
  { name: 'Nome-do-criativo-enviado-pelo-...', format: 'In-stream vídeo',       tag: 'Clube Orfeu', status: 'Aprovado',   thumb: 'photo',       video: '1:40' },
]

const thumbBg: Record<Thumb, string> = {
  'dark-banner':  'bg-[#1B3A2D]',
  'light-banner': 'bg-[#e8f0ea]',
  'photo':        'bg-gradient-to-br from-[#c4a882] to-[#7a5230]',
  'split':        'bg-gradient-to-r from-[#1B3A2D] via-[#1B3A2D] to-[#2d5a42]',
}

const statusStyles: Record<Status, string> = {
  'Aprovado':   'text-green-600',
  'Em análise': 'text-amber-600',
  'Reprovado':  'text-red-600',
}

/* ── Sub-components ──────────────────────────────────────────────── */

function Subheader() {
  const [channel, setChannel] = useState<'digital' | 'tv'>('digital')

  return (
    <div className="flex items-center gap-8 px-8 py-5 border-b border-gray-200 flex-wrap">
      {/* Client */}
      <div className="flex items-center gap-5 flex-shrink-0">
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-gray-400 font-medium">Cliente</span>
          <span className="text-sm font-semibold text-gray-900">Café Orfeu</span>
        </div>
        <div className="w-px h-9 bg-gray-200" />
        <div className="flex flex-col gap-0.5">
          <span className="text-[11px] text-gray-400 font-medium">CNPJ</span>
          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-900">12.345.678/0001-00.</span>
            <button className="text-gray-500 hover:text-gray-700">
              <MIcon name="expand_more" size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Channel tabs */}
      <div className="flex items-center gap-2 flex-1 justify-center">
        {([
          { id: 'digital', icon: 'desktop_windows', label: 'Digital' },
          { id: 'tv',      icon: 'tv',              label: 'TV Aberta/Assinatura' },
        ] as const).map(({ id, icon, label }) => (
          <button
            key={id}
            onClick={() => setChannel(id)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13.5px] font-medium border transition-colors ${
              channel === id
                ? 'bg-blue-50 border-blue-200 text-blue-600'
                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
          >
            <MIcon name={icon} size={18} />
            {label}
          </button>
        ))}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button className="text-[13.5px] font-medium text-violet-600 hover:underline">
          Conferir guia de envio
        </button>
        <button className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-[13.5px] font-semibold transition-colors">
          <MIcon name="add" size={18} />
          Novo Envio
        </button>
      </div>
    </div>
  )
}

function Tabs({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  return (
    <div className="flex items-end px-8 border-b border-gray-200">
      {[
        { id: 'envios',    icon: 'send',   label: 'Envios' },
        { id: 'criativos', icon: 'layers', label: 'Criativos' },
      ].map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex items-center gap-1.5 px-4 py-3 text-[13.5px] font-medium border-b-2 -mb-px transition-colors ${
            active === id
              ? 'text-blue-600 border-blue-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          <MIcon name={icon} size={18} />
          {label}
        </button>
      ))}
    </div>
  )
}

function Filters() {
  return (
    <div className="flex items-center gap-2 px-8 py-4">
      <div className="flex items-center gap-2 flex-1">
        <input type="checkbox" className="w-4 h-4 accent-blue-600 cursor-pointer" />
        {['Referência', 'Tag', 'Formato', 'Status'].map((label) => (
          <button
            key={label}
            className="flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-full text-[13px] font-medium text-gray-700 hover:bg-gray-50"
          >
            {label}
            <MIcon name="expand_more" size={16} className="text-gray-400" />
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="relative">
          <MIcon name="search" size={18} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Procurar"
            className="pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg text-[13px] text-gray-700 outline-none focus:border-blue-500 w-48"
          />
        </div>
        <div className="flex border border-gray-300 rounded-lg overflow-hidden">
          {[
            { icon: 'grid_view', id: 'grid' },
            { icon: 'view_list', id: 'list' },
          ].map(({ icon, id }, i) => (
            <button
              key={id}
              className={`flex items-center justify-center p-1.5 text-gray-500 hover:bg-gray-50 ${i === 0 ? 'bg-gray-100 text-gray-700' : ''} ${i > 0 ? 'border-l border-gray-300' : ''}`}
            >
              <MIcon name={icon} size={20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function CardItem({ name, format, tag, status, thumb, video }: Card) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
        <input type="checkbox" className="w-3.5 h-3.5 accent-blue-600 cursor-pointer flex-shrink-0" />
        <span className="flex-1 text-[12.5px] font-medium text-gray-900 truncate min-w-0">{name}</span>
        <button className="text-gray-500 hover:bg-gray-100 rounded p-0.5 flex-shrink-0">
          <MIcon name="more_vert" size={20} />
        </button>
      </div>

      {/* Thumbnail */}
      <div className="relative w-full pb-[56.25%] overflow-hidden">
        <div className={`absolute inset-0 ${thumbBg[thumb]}`} />
        {video && (
          <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/55 text-white text-[11px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm z-10">
            <MIcon name="play_arrow" size={13} />
            {video}
          </div>
        )}
        <span className="absolute bottom-2 right-2 bg-black/55 text-white text-[11px] font-medium px-1.5 py-0.5 rounded backdrop-blur-sm z-10">
          {format}
        </span>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-3 pt-2 pb-2.5 gap-2">
        <div className="flex items-center gap-1 text-[12px] text-gray-500 min-w-0">
          <MIcon name="sell" size={15} className="flex-shrink-0" />
          <span className="truncate">{tag}</span>
        </div>
        <div className="text-[12px] font-semibold flex-shrink-0">
          {status === 'Reprovado' ? (
            <span className="text-red-600">
              Reprovado{' '}
              <button className="underline">Ver detalhes</button>
            </span>
          ) : (
            <span className={statusStyles[status]}>{status}</span>
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────────────── */
export default function GestaoMateriais() {
  const [tab, setTab] = useState('criativos')

  return (
    <div className="flex flex-col min-h-full">
      <Subheader />
      <Tabs active={tab} onChange={setTab} />
      <Filters />

      <div className="grid grid-cols-4 gap-6 px-8 pb-8">
        {CARDS.map((card, i) => <CardItem key={i} {...card} />)}
      </div>

      <div className="flex justify-center pb-10">
        <button className="px-6 py-2 border border-gray-300 rounded-full text-[13.5px] font-medium text-gray-700 hover:bg-gray-50">
          Carregar mais
        </button>
      </div>
    </div>
  )
}
