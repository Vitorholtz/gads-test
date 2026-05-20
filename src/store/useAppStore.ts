import { create } from 'zustand'

interface AppState {
  sidebarOpen: boolean
  activePage: string
  toggleSidebar: () => void
  setActivePage: (page: string) => void
}

export const useAppStore = create<AppState>((set) => ({
  sidebarOpen: true,
  activePage: 'Vitrine',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setActivePage: (page) => set({ activePage: page }),
}))
