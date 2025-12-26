<script setup>
import { computed } from 'vue';
import useCommonStore from '../../store/commonStore';
import GenreCard from './GenreCard.vue';
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
        <div class="noContent" v-if="isNoMatchFoundInAllGenres">No results found. Try searching for a different name.
        </div>
        <!-- Loader to display while calling api -->
        <div class="loader" v-if="isLoader"> Loading...</div>
        <!-- To display if failed to get data from api  -->
        <div class="loader" v-if="!isLoader && !Object.keys(itemsGroupByGenre)?.length"> No data available. </div>
    </section>
</template>
<style scoped>
.moviesListContainer {
    padding-bottom: 10px !important;
}

.loader,
.noContent {
    height: calc(100vh - 100px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.genre {
    padding-top: 1.33rem;
}
</style>