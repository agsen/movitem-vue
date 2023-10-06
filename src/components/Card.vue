<script setup lang="ts">
import { computed } from "vue";
import getImageUrl from "@/utils/image";
import { truncate } from "lodash";

const props = defineProps<{
  title: string;
  description?: string;
  imagePath?: string;
  onClick: () => void;
}>();

const image = computed(() => getImageUrl(props.imagePath));
const truncated = computed(() =>
  truncate(props.description, {
    length: 100,
    separator: " ",
  })
);
</script>

<template>
  <div
    class="card shadow-lg cursor-pointer hover:translate-y-1 bordered"
    v-on:click="onClick"
  >
    <img
      class="w-full rounded-lg sm:h-64 md:h-56 object-cover"
      :src="image"
      :alt="title"
    />
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ title }}</div>
      <p class="text-gray-700 text-sm">
        {{ truncated }}
      </p>
    </div>
  </div>
</template>
