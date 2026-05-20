import { useState, useRef } from 'react'
import { useAppStore } from '../store/useAppStore'
import MIcon from '../components/MIcon'
import {
  PORTAIS, PRODUTOS, PORTAL_COLORS, FORMATO_ICON, FORMATO_ACCEPT,
  type Portal, type Produto, type Formato,
} from '../data/diarias'

/* ── Types ────────────────────────────────────────────────────────── */
type StepId = 'portal' | 'produto' | 'regiao' | 'data' | 'criativo' | 'revisao'

interface FluxoState {
  portal: Portal | null
  produto: Produto | null
  regioes: string[]
  datas: string[]
  criativos: Partial<Record<Formato, string>>
}

const INITIAL: FluxoState = { portal: null, produto: null, regioes: [], datas: [], criativos: {} }

const ALL_STEPS: { id: StepId; label: string }[] = [
  { id: 'portal',   label: 'Portal' },
  { id: 'produto',  label: 'Produto' },
  { id: 'regiao',   label: 'Região' },
  { id: 'data',     label: 'Data' },
  { id: 'criativo', label: 'Criativos' },
  { id: 'revisao',  label: 'Revisão' },
]

function getActiveSteps(produto: Produto | null) {
  return ALL_STEPS.filter(s => s.id !== 'regiao' || produto?.cobertura === 'Regional')
}

function canProceed(step: StepId, s: FluxoState): boolean {
  switch (step) {
    case 'portal':   return s.portal !== null
    case 'produto':  return s.produto !== null
    case 'regiao':   return s.regioes.length > 0
    case 'data':     return s.datas.length > 0
    case 'criativo': return !!s.produto && s.produto.formatos.every(f => !!s.criativos[f])
    case 'revisao':  return true
  }
}

const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
const WEEKDAYS  = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

/* ── Stepper ──────────────────────────────────────────────────────── */
function Stepper({ steps, current }: { steps: { id: StepId; label: string }[]; current: StepId }) {
  const currentIdx = steps.findIndex(s => s.id === current)
  return (
    <div className="flex items-center gap-0 px-8 py-5 border-b border-gray-100 bg-white overflow-x-auto">
      {steps.map(({ id, label }, i) => {
        const done    = i < currentIdx
        const active  = id === current
        return (
          <div key={id} className="flex items-center flex-shrink-0">
            {i > 0 && (
              <div className={`w-8 h-px mx-1 ${done ? 'bg-blue-500' : 'bg-gray-200'}`} />
            )}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold flex-shrink-0 ${
                done   ? 'bg-blue-500 text-white' :
                active ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                         'bg-gray-100 text-gray-400'
              }`}>
                {done ? <MIcon name="check" size={14} /> : i + 1}
              </div>
              <span className={`text-[13px] font-medium whitespace-nowrap ${
                active ? 'text-blue-700' : done ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

/* ── Step 1 — Portal ──────────────────────────────────────────────── */
function StepPortal({ value, onChange }: { value: Portal | null; onChange: (p: Portal) => void }) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Selecione o portal</h2>
      <p className="text-sm text-gray-500 mb-6">Escolha em qual portal Globo seu anúncio será exibido.</p>
      <div className="grid grid-cols-3 gap-4">
        {PORTAIS.map(({ id, label, icon, tagline }) => {
          const c       = PORTAL_COLORS[id]
          const selected = value === id
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              className={`flex flex-col items-start p-5 rounded-xl border-2 text-left transition-all ${
                selected
                  ? `${c.border} ${c.bg} shadow-sm`
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                selected ? c.iconBg : 'bg-gray-100'
              }`}>
                <MIcon name={icon} size={22} className={selected ? c.text : 'text-gray-500'} />
              </div>
              <span className={`text-[15px] font-bold mb-0.5 ${selected ? c.text : 'text-gray-800'}`}>
                {label}
              </span>
              <span className={`text-[12px] leading-relaxed ${selected ? c.text : 'text-gray-400'}`}>
                {tagline}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 2 — Produto ─────────────────────────────────────────────── */
function StepProduto({ portal, value, onChange }: { portal: Portal; value: Produto | null; onChange: (p: Produto) => void }) {
  const produtos = PRODUTOS.filter(p => p.portal === portal)
  const c        = PORTAL_COLORS[portal]

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Selecione o produto</h2>
      <p className="text-sm text-gray-500 mb-6">
        Produtos disponíveis para <span className={`font-semibold ${c.text.replace('text-','text-')}`}>{portal}</span>.
      </p>
      <div className="flex flex-col gap-3">
        {produtos.map(produto => {
          const selected = value?.id === produto.id
          return (
            <button
              key={produto.id}
              onClick={() => onChange(produto)}
              className={`flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all ${
                selected
                  ? `${c.border} ${c.bg} shadow-sm`
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              {/* Radio */}
              <div className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
              }`}>
                {selected && <div className="w-2 h-2 rounded-full bg-white" />}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[14px] font-semibold ${selected ? 'text-gray-900' : 'text-gray-800'}`}>
                    {produto.nome}
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    produto.cobertura === 'Nacional'
                      ? 'bg-green-50 text-green-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}>
                    {produto.cobertura}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {produto.formatos.map(f => (
                    <span key={f} className="flex items-center gap-1 text-[12px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                      <MIcon name={FORMATO_ICON[f]} size={13} />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              {/* Format count */}
              <span className="flex-shrink-0 text-[12px] font-medium text-gray-400">
                {produto.formatos.length} formato{produto.formatos.length > 1 ? 's' : ''}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 3 — Região ──────────────────────────────────────────────── */
function StepRegiao({ produto, value, onChange }: { produto: Produto; value: string[]; onChange: (r: string[]) => void }) {
  const available = produto.regioes ?? []
  const toggle    = (r: string) => onChange(value.includes(r) ? value.filter(x => x !== r) : [...value, r])
  const allSelected = value.length === available.length

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Selecione a(s) região(ões)</h2>
      <p className="text-sm text-gray-500 mb-2">
        A <strong>{produto.nome}</strong> está disponível nas seguintes regiões:
      </p>

      <div className="flex items-center gap-3 mb-5">
        <button
          onClick={() => onChange(allSelected ? [] : [...available])}
          className="text-[13px] font-medium text-blue-600 hover:underline"
        >
          {allSelected ? 'Limpar seleção' : 'Selecionar todas'}
        </button>
        {value.length > 0 && (
          <span className="text-[12px] text-gray-400">{value.length} selecionada{value.length > 1 ? 's' : ''}</span>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {available.map(r => {
          const sel = value.includes(r)
          return (
            <button
              key={r}
              onClick={() => toggle(r)}
              className={`px-4 py-2 rounded-lg border-2 text-[13px] font-semibold transition-colors ${
                sel
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {r}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Calendar ─────────────────────────────────────────────────────── */
function Calendar({ selected, onChange }: { selected: string[]; onChange: (d: string[]) => void }) {
  const today = new Date(); today.setHours(0, 0, 0, 0)
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))

  const year  = view.getFullYear()
  const month = view.getMonth()
  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDays    = new Date(year, month, 0).getDate()

  type Cell = { date: Date; outside: boolean }
  const cells: Cell[] = []
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ date: new Date(year, month - 1, prevDays - i), outside: true })
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ date: new Date(year, month, d), outside: false })
  let trail = 1
  while (cells.length % 7 !== 0)
    cells.push({ date: new Date(year, month + 1, trail++), outside: true })

  const toISO   = (d: Date) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  const isPast  = (d: Date) => d < today
  const toggle  = (d: Date) => {
    if (isPast(d)) return
    const iso = toISO(d)
    onChange(selected.includes(iso) ? selected.filter(x => x !== iso) : [...selected, iso])
  }
  const prevMonth = () => setView(new Date(year, month - 1, 1))
  const nextMonth = () => setView(new Date(year, month + 1, 1))

  return (
    <div className="inline-block border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        <button onClick={prevMonth} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600">
          <MIcon name="chevron_left" size={20} />
        </button>
        <span className="text-[14px] font-semibold text-gray-800 capitalize">
          {MONTHS_PT[month]} {year}
        </span>
        <button onClick={nextMonth} className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600">
          <MIcon name="chevron_right" size={20} />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 border-b border-gray-100">
        {WEEKDAYS.map(d => (
          <div key={d} className="py-2 text-center text-[11px] font-semibold text-gray-400 uppercase">
            {d}
          </div>
        ))}
      </div>

      {/* Days */}
      <div className="grid grid-cols-7 p-2 gap-0.5">
        {cells.map(({ date, outside }, i) => {
          const iso  = toISO(date)
          const past = isPast(date)
          const sel  = selected.includes(iso)
          return (
            <button
              key={i}
              onClick={() => !outside && toggle(date)}
              disabled={outside || past}
              className={`h-9 w-9 rounded-lg text-[13px] font-medium transition-colors mx-auto flex items-center justify-center ${
                outside || past
                  ? 'text-gray-300 cursor-default'
                  : sel
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
              }`}
            >
              {date.getDate()}
            </button>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 4 — Data ────────────────────────────────────────────────── */
function StepData({ value, onChange }: { value: string[]; onChange: (d: string[]) => void }) {
  const fmt = (iso: string) => {
    const [y, m, d] = iso.split('-')
    return `${d}/${m}/${y}`
  }

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Selecione as datas</h2>
      <p className="text-sm text-gray-500 mb-6">
        Cada data selecionada corresponde a uma diária (exibição durante 24h).
      </p>
      <div className="flex gap-8 items-start flex-wrap">
        <Calendar selected={value} onChange={onChange} />

        {value.length > 0 && (
          <div className="min-w-[200px]">
            <p className="text-[13px] font-semibold text-gray-700 mb-3">
              {value.length} data{value.length > 1 ? 's' : ''} selecionada{value.length > 1 ? 's' : ''}:
            </p>
            <div className="flex flex-col gap-1.5 max-h-64 overflow-y-auto">
              {[...value].sort().map(iso => (
                <div key={iso} className="flex items-center justify-between gap-3 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-lg">
                  <span className="text-[13px] font-medium text-blue-800">{fmt(iso)}</span>
                  <button
                    onClick={() => onChange(value.filter(d => d !== iso))}
                    className="text-blue-400 hover:text-blue-700"
                  >
                    <MIcon name="close" size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Step 5 — Criativos ───────────────────────────────────────────── */
function StepCriativo({ produto, value, onChange }: {
  produto: Produto
  value: Partial<Record<Formato, string>>
  onChange: (f: Formato, nome: string | null) => void
}) {
  const refs = useRef<Partial<Record<Formato, HTMLInputElement>>>({})

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Envie os criativos</h2>
      <p className="text-sm text-gray-500 mb-6">
        Envie um arquivo para cada formato exigido pelo produto <strong>{produto.nome}</strong>.
      </p>
      <div className="flex flex-col gap-4">
        {produto.formatos.map(formato => {
          const uploaded = value[formato]
          const accept   = FORMATO_ACCEPT[formato]
          const isVideo  = formato === 'In-stream Vídeo'
          return (
            <div
              key={formato}
              className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                uploaded ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-white'
              }`}
            >
              {/* Format icon */}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                uploaded ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                <MIcon
                  name={uploaded ? 'check_circle' : FORMATO_ICON[formato]}
                  size={22}
                  className={uploaded ? 'text-green-600' : 'text-gray-500'}
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-[14px] font-semibold ${uploaded ? 'text-green-800' : 'text-gray-800'}`}>
                  {formato}
                </p>
                <p className="text-[12px] text-gray-400 mt-0.5">
                  {isVideo ? 'Arquivo de vídeo (MP4, MOV…)' : 'Imagem (JPG, PNG, GIF…)'}
                </p>
                {uploaded && (
                  <p className="text-[12px] text-green-700 font-medium mt-1 truncate">{uploaded}</p>
                )}
              </div>

              {/* Upload / Remove button */}
              <div className="flex-shrink-0 flex items-center gap-2">
                {uploaded ? (
                  <button
                    onClick={() => onChange(formato, null)}
                    className="flex items-center gap-1 text-[12px] font-medium text-red-500 hover:text-red-700 border border-red-200 px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    <MIcon name="delete" size={15} />
                    Remover
                  </button>
                ) : (
                  <button
                    onClick={() => refs.current[formato]?.click()}
                    className="flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 border border-blue-200 px-4 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    <MIcon name="upload" size={16} />
                    Selecionar
                  </button>
                )}
                <input
                  type="file"
                  accept={accept}
                  className="hidden"
                  ref={el => { if (el) refs.current[formato] = el }}
                  onChange={e => {
                    const file = e.target.files?.[0]
                    if (file) onChange(formato, file.name)
                    e.target.value = ''
                  }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Step 6 — Revisão ─────────────────────────────────────────────── */
function StepRevisao({ state, onEdit }: { state: FluxoState; onEdit: (step: StepId) => void }) {
  const { portal, produto, regioes, datas, criativos } = state
  const fmtDate = (iso: string) => { const [y,m,d] = iso.split('-'); return `${d}/${m}/${y}` }

  const Section = ({ title, step, children }: { title: string; step: StepId; children: React.ReactNode }) => (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-b border-gray-200">
        <span className="text-[13px] font-semibold text-gray-700">{title}</span>
        <button onClick={() => onEdit(step)} className="flex items-center gap-1 text-[12px] font-medium text-blue-600 hover:underline">
          <MIcon name="edit" size={14} /> Editar
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
    </div>
  )

  const c = PORTAL_COLORS[portal!]

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Revise seu pedido</h2>
      <p className="text-sm text-gray-500 mb-6">Verifique todos os detalhes antes de finalizar a compra.</p>

      <div className="flex flex-col gap-4">
        <Section title="Portal" step="portal">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${c.bg} ${c.text}`}>
            <MIcon name={PORTAIS.find(p => p.id === portal)?.icon ?? 'public'} size={18} />
            <span className="font-semibold text-[14px]">{portal}</span>
          </div>
        </Section>

        <Section title="Produto" step="produto">
          <p className="text-[14px] font-semibold text-gray-900 mb-2">{produto?.nome}</p>
          <div className="flex flex-wrap gap-1.5">
            {produto?.formatos.map(f => (
              <span key={f} className="flex items-center gap-1 text-[12px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full">
                <MIcon name={FORMATO_ICON[f]} size={12} />{f}
              </span>
            ))}
          </div>
        </Section>

        {produto?.cobertura === 'Regional' && (
          <Section title="Regiões" step="regiao">
            <div className="flex flex-wrap gap-1.5">
              {regioes.map(r => (
                <span key={r} className="text-[13px] font-semibold px-3 py-1 bg-blue-50 text-blue-700 border border-blue-100 rounded-lg">{r}</span>
              ))}
            </div>
          </Section>
        )}

        <Section title={`Datas (${datas.length} diária${datas.length > 1 ? 's' : ''})`} step="data">
          <div className="flex flex-wrap gap-1.5">
            {[...datas].sort().map(iso => (
              <span key={iso} className="text-[13px] font-medium px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg text-gray-700">
                {fmtDate(iso)}
              </span>
            ))}
          </div>
        </Section>

        <Section title="Criativos" step="criativo">
          <div className="flex flex-col gap-2">
            {produto?.formatos.map(f => (
              <div key={f} className="flex items-center gap-3">
                <MIcon name="check_circle" size={16} className="text-green-500 flex-shrink-0" />
                <span className="text-[13px] text-gray-600 w-48 flex-shrink-0">{f}</span>
                <span className="text-[13px] text-gray-400 truncate">{criativos[f]}</span>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  )
}

/* ── Sucesso ──────────────────────────────────────────────────────── */
function Sucesso({ state }: { state: FluxoState }) {
  const { setActivePage } = useAppStore()
  const fmtDate = (iso: string) => { const [y,m,d] = iso.split('-'); return `${d}/${m}/${y}` }

  return (
    <div className="flex flex-col items-center text-center py-12 px-8 max-w-lg mx-auto">
      <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
        <MIcon name="check_circle" size={48} className="text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Pedido realizado!</h2>
      <p className="text-gray-500 mb-8 leading-relaxed">
        Seu pedido de <strong>{state.produto?.nome}</strong> no <strong>{state.portal}</strong>{' '}
        foi enviado com sucesso. Você receberá uma confirmação em breve.
      </p>

      <div className="w-full text-left bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 space-y-3">
        <div className="flex justify-between text-[13px]">
          <span className="text-gray-500">Portal</span>
          <span className="font-semibold text-gray-900">{state.portal}</span>
        </div>
        <div className="flex justify-between text-[13px]">
          <span className="text-gray-500">Produto</span>
          <span className="font-semibold text-gray-900">{state.produto?.nome}</span>
        </div>
        {state.produto?.cobertura === 'Regional' && (
          <div className="flex justify-between text-[13px]">
            <span className="text-gray-500">Regiões</span>
            <span className="font-semibold text-gray-900">{state.regioes.join(', ')}</span>
          </div>
        )}
        <div className="flex justify-between text-[13px]">
          <span className="text-gray-500">Diárias</span>
          <span className="font-semibold text-gray-900">
            {[...state.datas].sort().map(fmtDate).join(', ')}
          </span>
        </div>
      </div>

      <div className="flex gap-3 w-full">
        <button
          onClick={() => setActivePage('Vitrine')}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-[14px] font-semibold text-gray-700 hover:bg-gray-50"
        >
          Voltar à Vitrine
        </button>
        <button className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-[14px] font-semibold flex items-center justify-center gap-2">
          <MIcon name="receipt_long" size={18} />
          Acompanhar pedido
        </button>
      </div>
    </div>
  )
}

/* ── Main component ───────────────────────────────────────────────── */
export default function ComprarDiarias() {
  const { setActivePage } = useAppStore()
  const [fluxo, setFluxo] = useState<FluxoState>(INITIAL)
  const [step,  setStep]  = useState<StepId>('portal')
  const [done,  setDone]  = useState(false)

  const activeSteps = getActiveSteps(fluxo.produto)
  const stepIdx     = activeSteps.findIndex(s => s.id === step)

  const goNext = () => {
    if (step === 'revisao') { setDone(true); return }
    setStep(activeSteps[stepIdx + 1].id)
  }
  const goBack = () => {
    if (stepIdx === 0) { setActivePage('Vitrine'); return }
    setStep(activeSteps[stepIdx - 1].id)
  }
  const goEdit = (s: StepId) => setStep(s)

  const patch = <K extends keyof FluxoState>(key: K, val: FluxoState[K]) =>
    setFluxo(prev => ({ ...prev, [key]: val }))

  const setPortal  = (p: Portal)  => setFluxo({ ...INITIAL, portal: p })
  const setProduto = (p: Produto) => setFluxo(prev => ({ ...prev, produto: p, regioes: [], datas: [], criativos: {} }))

  if (done) return (
    <div className="min-h-full flex flex-col">
      <Sucesso state={fluxo} />
    </div>
  )

  return (
    <div className="min-h-full flex flex-col">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-8 py-4 border-b border-gray-200 bg-white">
        <button
          onClick={goBack}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 flex-shrink-0"
        >
          <MIcon name="arrow_back" size={20} />
        </button>
        <div>
          <h1 className="text-[16px] font-bold text-gray-900 leading-tight">Comprar Diárias</h1>
          <p className="text-[12px] text-gray-400">Exibição por 24h nos portais Globo</p>
        </div>
      </div>

      {/* Stepper */}
      <Stepper steps={activeSteps} current={step} />

      {/* Step content */}
      <div className="flex-1 px-8 py-8 max-w-3xl">
        {step === 'portal'   && <StepPortal   value={fluxo.portal}   onChange={setPortal} />}
        {step === 'produto'  && fluxo.portal && (
          <StepProduto portal={fluxo.portal} value={fluxo.produto} onChange={setProduto} />
        )}
        {step === 'regiao'   && fluxo.produto && (
          <StepRegiao  produto={fluxo.produto} value={fluxo.regioes} onChange={v => patch('regioes', v)} />
        )}
        {step === 'data'     && <StepData     value={fluxo.datas}    onChange={v => patch('datas', v)} />}
        {step === 'criativo' && fluxo.produto && (
          <StepCriativo
            produto={fluxo.produto}
            value={fluxo.criativos}
            onChange={(f, nome) =>
              patch('criativos', nome
                ? { ...fluxo.criativos, [f]: nome }
                : Object.fromEntries(Object.entries(fluxo.criativos).filter(([k]) => k !== f)) as FluxoState['criativos']
              )
            }
          />
        )}
        {step === 'revisao'  && (
          <StepRevisao state={fluxo} onEdit={goEdit} />
        )}
      </div>

      {/* Navigation footer */}
      <div className="sticky bottom-0 flex items-center justify-between px-8 py-4 bg-white border-t border-gray-200">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-lg text-[14px] font-semibold text-gray-700 hover:bg-gray-50"
        >
          <MIcon name="arrow_back" size={16} />
          {stepIdx === 0 ? 'Cancelar' : 'Voltar'}
        </button>

        <button
          onClick={goNext}
          disabled={!canProceed(step, fluxo)}
          className={`flex items-center gap-1.5 px-6 py-2 rounded-lg text-[14px] font-semibold transition-colors ${
            canProceed(step, fluxo)
              ? step === 'revisao'
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {step === 'revisao' ? (
            <><MIcon name="shopping_cart_checkout" size={18} />Finalizar Compra</>
          ) : (
            <>Continuar<MIcon name="arrow_forward" size={16} /></>
          )}
        </button>
      </div>
    </div>
  )
}
