import { defineStore } from 'pinia'

interface AppState {
  sidebarOpened: boolean
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    sidebarOpened: true
  }),
  actions: {
    toggleSidebar() {
      this.sidebarOpened = !this.sidebarOpened
    }
  }
})