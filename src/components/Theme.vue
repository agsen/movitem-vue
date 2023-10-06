<script setup lang="ts">
import { $theme } from "@/utils/stores";

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  $theme.set(target.checked ? "dark" : "light");
};
</script>

<template>
  <div>
    <input type="checkbox" class="toggle" @change="handleChange" />
  </div>
</template>
