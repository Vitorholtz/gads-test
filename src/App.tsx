import { useAppStore } from './store/useAppStore'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import GestaoMateriais from './pages/GestaoMateriais'

const SIDEBAR_W = 280

const pages: Record<string, React.ComponentType> = {
  'Gestão de materiais': GestaoMateriais,
}

export default function App() {
  const { sidebarOpen, activePage } = useAppStore()
  const Page = pages[activePage] ?? null

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Sidebar />
      <main
        style={{
          marginTop: 56,
          marginLeft: sidebarOpen ? SIDEBAR_W : 0,
        }}
        className="transition-all duration-300 min-h-[calc(100vh-56px)]"
      >
        {Page && <Page />}
      </main>

      {/* FAB */}
      <button className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center shadow-md z-50 transition-colors">
        <span className="material-symbols-rounded text-blue-600" style={{ fontSize: 24 }}>add</span>
      </button>
    </div>
  )
}
