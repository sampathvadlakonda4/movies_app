<script setup>
import { onMounted } from 'vue';
import { fetchMoviesList } from '@/services';
import useCommonStore from '@/store/commonStore';
import Header from '@/components/Header/HeaderComponent.vue';

const store = useCommonStore();
onMounted(async () => {
  if (!store?.moviesList?.length) {
    store.setLoader(true);
    let data = await fetchMoviesList();
    if (data) store.assignData(data);
    store.setLoader(false);
  }
})

</script>

<template>
  <Header />
  <main class="pad-lr-1">
    <router-view></router-view>
  </main>
</template>

<style scoped></style>
