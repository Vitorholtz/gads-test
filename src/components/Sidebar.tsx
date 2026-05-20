import { useAppStore } from '../store/useAppStore'
import MIcon from './MIcon'

const SIDEBAR_W = 280

interface NavItem {
  icon: string
  label: string
  external?: boolean
}

const NAV_GROUPS: { label: string; items: NavItem[] }[] = [
  {
    label: 'Favoritos',
    items: [
      { icon: 'storefront',    label: 'Vitrine' },
      { icon: 'dashboard',     label: 'Painel' },
      { icon: 'shopping_bag',  label: 'Meus pedidos' },
      { icon: 'photo_library', label: 'Gestão de materiais' },
    ],
  },
  {
    label: 'Menu',
    items: [
      { icon: 'event_available', label: 'Consulta de disponibilidade' },
      { icon: 'palette',         label: 'Envio de criativo' },
      { icon: 'bar_chart',       label: 'Resultados' },
      { icon: 'payments',        label: 'Financeiro' },
      { icon: 'hub',             label: 'Conexão de dados' },
      { icon: 'table_chart',     label: 'Planejador de mídia', external: true },
      { icon: 'language',        label: 'Portal',              external: true },
    ],
  },
]

const BOTTOM_ITEMS: NavItem[] = [
  { icon: 'help',     label: 'Ajuda' },
  { icon: 'settings', label: 'Configurações' },
]

function NavButton({ icon, label, external }: NavItem) {
  const { activePage, setActivePage } = useAppStore()
  const active = activePage === label

  return (
    <button
      onClick={() => !external && setActivePage(label)}
      className={`w-full flex items-center justify-between gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-colors ${
        active
          ? 'bg-blue-50 text-blue-700 font-semibold'
          : 'text-gray-600 hover:bg-gray-100 font-normal'
      }`}
    >
      <span className="flex items-center gap-2.5">
        <MIcon name={icon} size={20} className={active ? 'text-blue-600' : 'text-gray-500'} />
        {label}
      </span>
      {external && <MIcon name="open_in_new" size={16} className="text-blue-400 flex-shrink-0" />}
    </button>
  )
}

export default function Sidebar() {
  const { sidebarOpen } = useAppStore()

  return (
    <aside
      style={{
        width: SIDEBAR_W,
        top: 56,
        height: 'calc(100vh - 56px)',
        transform: sidebarOpen ? 'translateX(0)' : `translateX(-${SIDEBAR_W}px)`,
      }}
      className="fixed left-0 bg-white border-r border-gray-200 flex flex-col z-30 transition-transform duration-300 overflow-hidden"
    >
      <nav className="flex-1 overflow-y-auto px-3 pt-5 pb-4 flex flex-col gap-1">
        {NAV_GROUPS.map(({ label, items }) => (
          <div key={label}>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-1 mt-2 first:mt-0">
              {label}
            </p>
            <div className="flex flex-col gap-0.5">
              {items.map((item) => <NavButton key={item.label} {...item} />)}
            </div>
          </div>
        ))}
      </nav>

      <div className="flex-shrink-0 px-3 pb-4 pt-3 border-t border-gray-100 flex flex-col gap-0.5">
        {BOTTOM_ITEMS.map((item) => <NavButton key={item.label} {...item} />)}
      </div>
    </aside>
  )
}
