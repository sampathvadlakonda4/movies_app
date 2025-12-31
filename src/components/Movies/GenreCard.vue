<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import useCommonStore from '@/store/commonStore';
const store = useCommonStore();
const router = useRouter();
const props = defineProps({
    genreItems: {
        type: Object,
        default: ()=> {},
    },
    genreName: {
        type: String,
        default: '',
    },
})
const movieCardContainer = ref();
const moviesMainContainer = ref();
const showLeftArrow = ref(false);
const showRightArrow = ref(false);
const searchText = computed(() => store.getSearchText?.trim().toLowerCase());
function isExisted(item) {
    return searchText.value ? item?.name?.toLowerCase().includes(searchText.value) : true;
}
function setClickedRecord(item) {
    store.setActiveRecord(item);
    router.push({ name: 'MovieDetails' })
}
function onScroll(e) {
    let element = e.target;
    if (element.scrollLeft > 0) {
        showLeftArrow.value = true;
    }
    else {
        showLeftArrow.value = false;
    }
    if (element.scrollWidth - 1 <= element.scrollLeft + moviesMainContainer.value?.clientWidth) {
        showRightArrow.value = false;
    }
    else {
        showRightArrow.value = true;
    }
}
function scrollBy(side) {
    movieCardContainer.value.scrollBy({
        left: side * moviesMainContainer.value?.clientWidth,
        behavior: 'smooth'
    })
}
onMounted(() => {
    if (movieCardContainer.value.scrollWidth > moviesMainContainer.value?.clientWidth) {
        showRightArrow.value = true;
    }
})
</script>
<template>
    <div>
        <span class="listHeading">{{ props?.genreName }} <span class="forBackground"></span></span>
    </div>
    <div class="moviesCardMainContainer" ref="moviesMainContainer">
        <button class="arrowBtn btnStyles leftBtn" v-show="showLeftArrow" @click="scrollBy(-1)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="var(--active-color)" width=" 20px" height="20px"
                viewBox="0 0 24 24">
                <path
                    d="M14.657 18.657a1 1 0 0 1-.707-.293l-5.657-5.657a1 1 0 0 1 0-1.414l5.657-5.657a1 1 0 0 1 1.414 1.414L10.414 12l4.95 4.95a1 1 0 0 1-.707 1.707z" />
            </svg>
        </button>
        <button class="arrowBtn btnStyles rightBtn" v-show="showRightArrow" @click=scrollBy(1)>
            <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" viewBox="0 0 24 24" fill="none">
                <path d="M9 6L15 12L9 18" stroke="var(--active-color)" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </button>
        <div class="moviesCardContainer" ref="movieCardContainer" @scroll="onScroll">
            <!-- Movie card -->
            <div class="movieCard" v-for="item of props?.genreItems" :key="item?.id" v-show="isExisted(item)"
                @click="setClickedRecord(item)">
                <img class="movieImage bgImageStyles imageBg" :src="item?.image?.original" :alt='item?.name'
                    loading="lazy" />
                <div class="detailsContainer" :title="item?.name">
                    <p class="movieName">{{ item?.name }}</p>
                    <small class="movieRating">Rating: {{ Object?.values(item.rating)?.length &&
                        Object.values(item.rating)[0] !== null ?
                        `${Object.values(item.rating)[0]}/10` : 'NA' }}</small>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.moviesCardMainContainer {
    position: relative;
}

.listHeading {
    margin: 0px;
    width: fit-content;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    flex-direction: column;
}

.forBackground {
    width: 70%;
    height: 3px;
    background: var(--active-color);
    border-radius: 10px;
}

.moviesCardContainer {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 10px;
    padding: 8px 5px 0px;
    position: relative;
}

.arrowBtn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    backdrop-filter: blur(5px);
    box-shadow: 0px 0px 10px -1px var(--active-color);
}

.leftBtn {
    left: -8px;
}

.rightBtn {
    right: -8px;
}

.movieCard {
    width: 150px;
    padding-bottom: 5px;
    cursor: pointer;
}

.movieCard:hover {
    transform: scale(1.05);
    transition: all 0.5s;
}

.movieImage {
    object-fit: fill;
    width: 150px;
    height: 200px;
    min-width: 150px;
    min-height: 200px;
    border-radius: 5px;
}

.detailsContainer {
    line-height: 1.2;
}

.movieName {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 0.8rem;
    font-weight: 600;
}

.movieRating {
    font-size: 0.8rem;
}
</style>