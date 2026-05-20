import { useAppStore } from '../store/useAppStore'
import MIcon from './MIcon'
import logo from '../assets/globo-ads-logo.svg'

export default function Header() {
  const { sidebarOpen, activePage, toggleSidebar } = useAppStore()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white border-b border-gray-200 flex items-center justify-between px-5 z-40 gap-3">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100 flex-shrink-0"
          title={sidebarOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <MIcon name={sidebarOpen ? 'left_panel_close' : 'left_panel_open'} size={22} />
        </button>

        <img src={logo} alt="Globo Ads" className="h-6 w-auto block flex-shrink-0" />

        <span className="text-gray-200 text-xl font-thin select-none">|</span>
        <span className="text-[15px] font-medium text-gray-600 tracking-tight whitespace-nowrap">
          {activePage}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-0.5 flex-shrink-0">
        {(['shopping_cart', 'notifications', 'settings'] as const).map((ic) => (
          <button key={ic} className="p-2 rounded-md text-gray-500 hover:bg-gray-100">
            <MIcon name={ic} size={22} />
          </button>
        ))}

        <button className="flex items-center gap-1.5 ml-2 px-4 py-1.5 border border-gray-300 rounded-lg text-[13.5px] font-medium text-gray-700 hover:bg-gray-50">
          <MIcon name="add" size={18} />
          Criar
        </button>

        <div className="flex items-center gap-2.5 ml-3 pl-3 border-l border-gray-200">
          <div className="text-right">
            <div className="flex items-center gap-0.5 text-[13.5px] font-medium text-gray-700">
              Cliente
              <MIcon name="expand_more" size={18} className="text-gray-400" />
            </div>
            <div className="text-[11px] text-gray-400">CNPJ 1234567890</div>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-600 flex-shrink-0">
            A
          </div>
        </div>
      </div>
    </header>
  )
}
