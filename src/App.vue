<script setup lang="ts">
import { useStore } from "@nanostores/vue";
import { $theme } from "@/utils/stores";

const theme = useStore($theme);
</script>

<template>
  <div :data-theme="theme" class="p-4 min-h-screen">
    <router-view></router-view>
  </div>
</template>
