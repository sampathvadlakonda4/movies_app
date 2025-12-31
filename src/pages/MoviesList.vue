<script setup>
import { computed } from 'vue';
import useCommonStore from '@/store/commonStore';
import GenreCard from '@/components/Movies/GenreCard.vue';
import MoviesListLoader from '@/components/Loaders/MoviesListLoader.vue';
const store = useCommonStore();
const itemsGroupByGenre = computed(() => store.visibleItems || {});
const searchText = computed(() => store.getSearchText?.trim().toLowerCase());
const isLoader = computed(() => store.getIsLoader);
function hasItems(items) {
    return searchText.value ? items.some(each => each?.name?.toLowerCase().includes(searchText.value)) : true;
}
const isNoMatchFoundInAllGenres = computed(() => {
    if (!searchText.value) return false;
    let items = itemsGroupByGenre.value;
    for (let genreName in items) {
        let found = items[genreName].some(each => each?.name?.toLowerCase().includes(searchText.value))
        if (found) return false
    }
    return true;
})
</script>
<template>
    <section class="moviesListContainer">
        <!-- Genres -->
        <div v-for="(genreItems, genreName) in itemsGroupByGenre" :key="genreName" class="genre"
            v-show="hasItems(genreItems)">
            <GenreCard :genreItems="genreItems" :genreName="genreName" />
        </div>
        <!-- After searching if not found any records then to display text on screen  -->
        <div class="noContent" v-if="isNoMatchFoundInAllGenres">
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 -0.5 25 25" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M5.5 11.493C5.50364 8.39226 7.69698 5.72579 10.7388 5.12416C13.7807 4.52253 16.8239 6.15327 18.0077 9.0192C19.1915 11.8851 18.186 15.1881 15.6063 16.9085C13.0265 18.6288 9.59077 18.2874 7.4 16.093C6.18148 14.8725 5.49799 13.2177 5.5 11.493Z"
                    stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16.062 16.568L19.5 19.993" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                    stroke-linejoin="round" />
                <path
                    d="M10.5303 8.96271C10.2374 8.66982 9.76256 8.66982 9.46967 8.96271C9.17678 9.25561 9.17678 9.73048 9.46967 10.0234L10.5303 8.96271ZM11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627L11.4697 12.0234ZM12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234L12.5303 10.9627ZM13.4697 14.0234C13.7626 14.3163 14.2374 14.3163 14.5303 14.0234C14.8232 13.7305 14.8232 13.2556 14.5303 12.9627L13.4697 14.0234ZM12.5303 12.0234C12.8232 11.7305 12.8232 11.2556 12.5303 10.9627C12.2374 10.6698 11.7626 10.6698 11.4697 10.9627L12.5303 12.0234ZM9.46967 12.9627C9.17678 13.2556 9.17678 13.7305 9.46967 14.0234C9.76256 14.3163 10.2374 14.3163 10.5303 14.0234L9.46967 12.9627ZM11.4697 10.9627C11.1768 11.2556 11.1768 11.7305 11.4697 12.0234C11.7626 12.3163 12.2374 12.3163 12.5303 12.0234L11.4697 10.9627ZM14.5303 10.0234C14.8232 9.73048 14.8232 9.25561 14.5303 8.96271C14.2374 8.66982 13.7626 8.66982 13.4697 8.96271L14.5303 10.0234ZM9.46967 10.0234L11.4697 12.0234L12.5303 10.9627L10.5303 8.96271L9.46967 10.0234ZM11.4697 12.0234L13.4697 14.0234L14.5303 12.9627L12.5303 10.9627L11.4697 12.0234ZM11.4697 10.9627L9.46967 12.9627L10.5303 14.0234L12.5303 12.0234L11.4697 10.9627ZM12.5303 12.0234L14.5303 10.0234L13.4697 8.96271L11.4697 10.9627L12.5303 12.0234Z"
                    fill="currentColor" />
            </svg>
            <span>No results found. Try searching for a different name.</span>
        </div>
        <!-- Skeleton loader to display while calling api -->
        <MoviesListLoader class="loader" v-if="isLoader" />
        <!-- To display if failed to get data from api  -->
        <div class="noContent" v-if="!isLoader && !Object.keys(itemsGroupByGenre)?.length"> No data available. </div>
    </section>
</template>
<style scoped>
.moviesListContainer {
    padding-bottom: 10px !important;
}

.loader {
    height: calc(100vh - 100px);
    width: 100%;
}

.noContent {
    height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.genre {
    padding-top: 1.33rem;
}
</style>