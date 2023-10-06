<script setup lang="ts">
import { computed } from "vue";
import { useQuery } from "vue-query";
import apiRequest from "@/utils/apiRequest";
import { useRoute, useRouter } from "vue-router";
import { MovieDetail } from "./Detail.interface";
import getImageUrl from "@/utils/image";
import Loader from "@/components/Loader.vue";

const route = useRoute();
const router = useRouter();
const movieId = computed(() => route.params.id);

const { data: detail, isLoading } = useQuery(
  ["movie-detail", movieId],
  () =>
    apiRequest({ method: "GET", url: `/movie/${movieId.value}` }).then(
      (res) => res.data as MovieDetail
    ),
  { refetchOnWindowFocus: false }
);

const imageUrl = computed(() => getImageUrl(detail?.value?.poster_path));

const goBack = () => router.back();
</script>

<template>
  <loader v-if="isLoading" />
  <div v-else>
    <div class="flex gap-5 items-center mb-8">
      <button @click="goBack" class="btn btn-active btn-sm">
        {{ "Back" }}
      </button>
      <h2 class="text-3xl font-bold">
        {{ detail?.title }}
      </h2>
    </div>

    <div class="flex flex-wrap gap-10">
      <img
        class="xs:w-full md:w-64 h-100 object-cover rounded-lg"
        :src="imageUrl"
        :alt="detail?.title"
      />
      <div>
        <div class="mb-4">
          <div
            class="badge badge-primary mr-4 p-4"
            v-for="genre in detail?.genres"
          >
            {{ genre?.name }}
          </div>
        </div>

        <div class="flex mb-2">
          <p class="w-32 font-bold text-sm">Release Date</p>
          <p class="text-sm">{{ detail?.release_date }}</p>
        </div>
        <div class="flex mb-2">
          <p class="w-32 font-bold text-sm">Vote Average</p>
          <p class="text-sm">
            {{ detail?.vote_average }} ({{ detail?.vote_count }} voter)
          </p>
        </div>
        <div class="flex mb-2">
          <p class="w-32 font-bold text-sm">Budget</p>
          <p class="text-sm">
            {{
              new Intl.NumberFormat("us", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 3,
              }).format(detail?.budget as number)
            }}
          </p>
        </div>
        <div class="flex mb-8">
          <p class="w-32 font-bold text-sm">Revenue</p>
          <p class="text-sm">
            {{
              new Intl.NumberFormat("us", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 3,
              }).format(detail?.revenue as number)
            }}
          </p>
        </div>
        <p class="md:max-w-[60vw]">{{ detail?.overview }}</p>
      </div>
    </div>
  </div>
</template>
