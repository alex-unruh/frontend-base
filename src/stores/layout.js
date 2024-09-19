import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage, useSessionStorage } from '@vueuse/core'
import { useQuasar } from 'quasar'

export const useLayoutStore = defineStore('layout', () => {
  const app = useQuasar()
  const login = useSessionStorage('token', false)
  const darkMode = useLocalStorage('darkMode', false)
  const mini = ref(false)
  const leftDrawerOpen = ref(false)

  /**
   * Toogle the left drawer   *
   * @returns {void}
   */
  function toggleLeftDrawer () {
    if (mini.value && leftDrawerOpen.value) {
      leftDrawerOpen.value = false
      return
    }
    mini.value = !mini.value
    leftDrawerOpen.value = true
  }

  /**
   * Toogle the dark mode
   * @returns {void}
   */
  function toggleDarkMode () {
    darkMode.value = !darkMode.value
    app.dark.set(darkMode.value)
  }

  return {
    login,
    mini,
    leftDrawerOpen,
    darkMode,
    toggleLeftDrawer,
    toggleDarkMode
  }
})
