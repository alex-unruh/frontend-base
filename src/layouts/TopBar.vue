<template>
  <q-header elevated>
    <q-toolbar :class="{ 'bg-dark': app.dark.isActive }">
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        :class="{ 'text-primary': app.dark.isActive }"
        @click="store.toggleLeftDrawer"
      />

      <q-toolbar-title class="q-pl-md">
        <q-btn
          round
          flat
          dense
          icon="home"
          title="To Do"
          :to="{ name: 'index' }"
          :class="{ 'text-primary': app.dark.isActive }"
        />
      </q-toolbar-title>

      <q-btn
        round
        flat
        dense
        icon="contrast"
        class="q-mr-xs"
        title="Dark/Light"
        :color="buttonColor"
        @click="store.toggleDarkMode"
      />

      <q-btn
        round
        flat
        dense
        icon="account_circle"
        title="My Profile"
        :color="buttonColor"
      />

      <q-btn
        round
        flat
        dense
        icon="power_settings_new"
        title="Logout"
        :color="buttonColor"
      />
    </q-toolbar>
  </q-header>

  <q-dialog
    v-model="confirm"
    persistent
  >
    <CardConfirm />
  </q-dialog>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useLayoutStore } from 'src/stores/layout'
import { CardConfirm } from 'src/components'
import { computed, ref } from 'vue'

const app = useQuasar()
const store = useLayoutStore()
const confirm = ref(false)
const buttonColor = computed(() => app.dark.isActive ? 'primary' : '')

</script>
