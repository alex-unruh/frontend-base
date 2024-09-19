<template>
  <q-footer
    elevated
    :class="{ 'bg-dark': app.dark.isActive }"
  >
    <q-toolbar
      class="justify-center text-uppercase text-weight-bold"
      :class="{ 'text-teal': app.dark.isActive }"
    >
      Unruh Front Base v0.1.0
    </q-toolbar>
  </q-footer>
</template>

<script setup>
import { useQuasar } from 'quasar'

const app = useQuasar()
</script>
