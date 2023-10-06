<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    size?: "xs" | "sm" | "md" | "lg";
    isFull?: boolean;
  }>(),
  {
    size: "lg",
    isFull: true,
  }
);

const className = computed(() => `loading loading-bars loading-${props.size}`);
</script>

<template>
  <div v-if="isFull" class="flex justify-center items-center w-full h-screen">
    <span :class="className"></span>
  </div>
  <span v-else :class="className"></span>
</template>
