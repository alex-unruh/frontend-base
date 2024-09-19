<template>
  <q-drawer
    v-model="store.leftDrawerOpen"
    elevated
    :mini="store.mini"
    show-if-above
    class="q-pt-sm"
    :class="{ 'bg-grey-1': !app.dark.isActive }"
    :width="230"
  >
    <q-list>
      <!-- USERS -->
      <q-item
        v-ripple
        clickable
        active-class="my-menu-link"
        :to="{ name: 'users' }"
      >
        <q-item-section
          avatar
          class="q-py-sm"
        >
          <q-icon
            name="people"
            color="primary"
          />
          <q-tooltip
            v-if="store.mini"
            class="text-subtitle2"
            anchor="center right"
            self="center start"
          >
            Users
          </q-tooltip>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            Users
          </q-item-label>

          <q-item-label
            caption
            lines="1"
          >
            Manage Users
          </q-item-label>
        </q-item-section>
      </q-item>
      <!-- /USERS -->
    </q-list>
  </q-drawer>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { useLayoutStore } from 'src/stores/layout'
const store = useLayoutStore()
const app = useQuasar()
</script>
