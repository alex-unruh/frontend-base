<template>
  <q-layout
    view="hHh Lpr lFf"
    :class="{ 'bg-grey-1': !app.dark.isActive }"
  >
    <TopBar />

    <SideBar />

    <q-page-container>
      <router-view />
    </q-page-container>

    <FooterBar />
  </q-layout>
</template>

<script setup>
import SideBar from './SideBar.vue'
import TopBar from './TopBar.vue'
import FooterBar from './FooterBar.vue'
import { useQuasar } from 'quasar'
import { useLayoutStore } from 'src/stores/layout'

const store = useLayoutStore()
const app = useQuasar()

app.dark.set(store.darkMode)
</script>
