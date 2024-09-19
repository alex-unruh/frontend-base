<template>
  <q-card
    style="width: 20vw; min-width: 350px"
    class="q-pb-md"
  >
    <q-form @submit.prevent="submitForm()">
      <q-card-section class="q-py-md">
        <div class="row">
          <div class="text-body2 text-uppercase text-bold">
            {{ titlePrefix }} {{ title }}
          </div>
          <q-space />
        </div>
      </q-card-section>

      <q-separator class="q-mx-md" />

      <q-card-section class="q-gutter-y-sm q-py-none">
        <slot />
      </q-card-section>

      <q-card-section
        align="right"
        class="q-gutter-x-md q-py-none q-mt-md"
      >
        <q-btn
          v-close-popup
          color="grey-8"
          label="Cancel"
          type="reset"
          size="sm"
        >
          <q-tooltip>Cancel And Close</q-tooltip>
        </q-btn>

        <q-btn
          color="green-9"
          :label="buttonPrefix"
          type="submit"
          size="sm"
        >
          <q-tooltip>{{ buttonPrefix }} {{ title }}</q-tooltip>
        </q-btn>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  isUpdate: { type: Boolean, default: false },
  title: { type: String, default: 'Record' }
})
const emit = defineEmits(['onCreate', 'onUpdate'])

function submitForm () {
  return props.isUpdate ? emit('onUpdate') : emit('onCreate')
}

const buttonPrefix = computed(() => props.isUpdate ? 'Update' : 'Create')
const titlePrefix = computed(() => props.isUpdate ? 'Edit' : 'New')
</script>
