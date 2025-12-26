<!--
// theme
// responsive
// loader
// pinia
// persisted state based in sessionStorage
// if No content on searching text then showing text on screen
// if had content initially then only showing search
// added initial movie png to display while images are loading 
// if data existed in pinia then not calling api again
// hidden search field if current route is movieDetails, because no need of search in it
// insted of clicking on movie name, if opens movieDetails route directly or manually then redirecting to dashboard
// if route path not matches then redirecting to dashboard


// light- #3F51B5, dark - cyan
// improving scrollbars
// loader has to manage according to api call
-->

<script setup>
import { onMounted } from 'vue';
import { fetchMoviesList } from './services';
import useCommonStore from './store/commonStore';
import Header from './components/Header/Header.vue';

const store = useCommonStore();
onMounted(async () => {
  if(!store?.moviesList?.length){
    store.setLoader(true);
    let data = await fetchMoviesList();
    if(data) store.assignData(data);
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
