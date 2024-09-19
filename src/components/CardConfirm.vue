<template>
  <q-card style="width: 27vw; min-width: 350px">
    <q-card-section class="row items-center justify-center">
      <span class="text-uppercase text-weight-bold">{{ title }}</span>
    </q-card-section>

    <q-separator />

    <q-card-section class="text-center q-mt-sm text-subtitle2">
      <slot>{{ message }}</slot>
    </q-card-section>

    <q-card-actions align="center">
      <q-btn
        v-close-popup
        flat
        label="Cancel"
        color="primary"
      />

      <q-btn
        v-close-popup
        flat
        label="Confirm"
        color="green-9"
        @click="$emit('onConfirm')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
defineEmits(['onConfirm'])
defineProps({
  title: { type: String, default: 'Confirm' },
  message: { type: String, default: 'Do you really want to proceed?' }
})
</script>
