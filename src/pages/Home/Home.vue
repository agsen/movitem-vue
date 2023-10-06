<script setup lang="ts">
import { ref } from "vue";
import { Movie, MovieList } from "./Home.interface";
import Card from "@/components/Card.vue";
import Loader from "@/components/Loader.vue";
import Theme from "@/components/Theme.vue";

import { debounce } from "lodash";
import { useQuery } from "vue-query";
import apiRequest from "@/utils/apiRequest";
import { useRouter } from "vue-router";

const router = useRouter();
const keyword = ref("");
const page = ref(1);
const movies = ref<Movie[]>([]);

const { isLoading } = useQuery(
  ["movie", keyword, page],
  () =>
    apiRequest({
      method: "GET",
      url: "/discover/movie",
      params: {
        with_keywords: keyword.value,
        page: page.value,
      },
    }).then((res) => res.data as MovieList),
  {
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      movies.value = [...movies.value, ...(data?.results || [])];
    },
  }
);

const debouncedInput = debounce((event) => {
  keyword.value = event.target.value;
}, 500);

const goToDetail = (id: number) => () => {
  router.push(`/detail/${id}`);
};

const handleScroll = (el: UIEvent) => {
  const srcElement = el.target as HTMLInputElement;
  if (
    srcElement.offsetHeight + srcElement.scrollTop >=
    srcElement.scrollHeight
  ) {
    page.value = page.value + 1;
  }
};
</script>

<template>
  <div class="overflow-hidden z-0">
    <div class="fixed top-0 left-0 right-0 px-7 py-4">
      <div class="flex items-center gap-5">
        <h2 class="text-3xl font-bold text-green-600 sm:flex-shrink">
          Movitem
        </h2>
        <input
          v-on:input="debouncedInput"
          placeholder="Search movie"
          class="input input-bordered w-full"
        />
        <Theme />
      </div>
    </div>

    <div
      @scroll="handleScroll"
      class="relative z-0 p-2 grid md:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4 mt-16 max-h-screen overflow-scroll no-scrollbar rounded-lg"
    >
      <card
        v-for="movie in movies"
        :onClick="goToDetail(movie.id)"
        :title="movie.title"
        :description="movie.overview"
        :imagePath="movie.poster_path"
      />
    </div>
    <div
      v-if="isLoading"
      class="flex justify-center mt-4 fixed bottom-0 p-2 w-full"
    >
      <loader :isFull="false" />
    </div>
  </div>
</template>
