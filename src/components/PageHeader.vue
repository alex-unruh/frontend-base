<!-- eslint-disable vue/no-v-html -->
<template>
  <q-item class="q-px-none q-py-xs items-center">
    <q-item-section>
      <q-item-label
        class="text-subtitle2 text-uppercase text-weight-bold"
        :class="'text-' + color"
        lines="1"
      >
        <q-icon
          :name="icon"
          size="xs"
          :color="color"
          style="top: -1px"
        /> {{ title }}
      </q-item-label>

      <q-item-label
        v-if="description"
        class="text-caption"
        :class="'text-' + color"
        lines="1"
      >
        <span v-html="description" />
      </q-item-label>
    </q-item-section>

    <q-item-section side>
      <div class="row">
        <slot />
      </div>
    </q-item-section>
  </q-item>

  <q-separator class="q-mt-xs q-mb-md" />
</template>

<script setup>
defineEmits(['onSearch', 'onAdd'])

defineProps({
  id: { type: [Number, null], default: () => null },
  title: { type: String, default: '' },
  icon: { type: String, default: 'list' },
  description: { type: String, default: '' },
  color: { type: String, default: 'primary' }
})
</script>
