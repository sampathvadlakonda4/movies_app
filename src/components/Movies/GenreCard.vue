<script setup>
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router';
import useCommonStore from '@/store/commonStore';
import { useLogic } from '@/composables/commonLogic'
const { ratingCheck } = useLogic();
const store = useCommonStore();
const router = useRouter();
const props = defineProps({
    genreItems: {
        type: Object,
        default: () => { },
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
function onScroll() {
    let element = movieCardContainer.value;
    if (!element) return false;
    if (element.scrollLeft > 0) showLeftArrow.value = true;
    else showLeftArrow.value = false;

    if (element.scrollWidth - 1 <= element.scrollLeft + moviesMainContainer.value?.clientWidth) {
        showRightArrow.value = false;
    }
    else showRightArrow.value = true;
}
function scrollBy(side) {
    movieCardContainer.value.scrollBy({
        left: side * moviesMainContainer.value?.clientWidth,
        behavior: 'smooth'
    })
}
function rating(item) {
    return ratingCheck(item) ? `${Object.values(item.rating)[0]}/10` : 'NA';
}
onMounted(() => {
    if (movieCardContainer.value && movieCardContainer.value.scrollWidth > moviesMainContainer.value?.clientWidth) {
        showRightArrow.value = true;
    }
})
// TO TOGGLE THE ARROW BUTTONS ON CHANGE OF SEARCHED TEXT
watch(() => searchText.value, () => {
    nextTick(() => {
        onScroll();
    })
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
        <section class="moviesCardContainer" ref="movieCardContainer" @scroll="onScroll">
            <!-- Movie card -->
            <div class="movieCard" v-for="item of props?.genreItems" :key="item?.id" v-show="isExisted(item)"
                @click="setClickedRecord(item)">
                <figure>
                    <img class="movieImage bgImageStyles imageBg" :src="item?.image?.original" :alt='item?.name'
                        loading="lazy" />
                    <figcaption class="detailsContainer" :title="item?.name">
                        <p class="movieName">{{ item?.name }}</p>
                        <small class="movieRating">
                            <svg width="15px" height="15px" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path
                                        d="M11.245 4.174C11.4765 3.50808 11.5922 3.17513 11.7634 3.08285C11.9115 3.00298 12.0898 3.00298 12.238 3.08285C12.4091 3.17513 12.5248 3.50808 12.7563 4.174L14.2866 8.57639C14.3525 8.76592 14.3854 8.86068 14.4448 8.93125C14.4972 8.99359 14.5641 9.04218 14.6396 9.07278C14.725 9.10743 14.8253 9.10947 15.0259 9.11356L19.6857 9.20852C20.3906 9.22288 20.743 9.23007 20.8837 9.36432C21.0054 9.48051 21.0605 9.65014 21.0303 9.81569C20.9955 10.007 20.7146 10.2199 20.1528 10.6459L16.4387 13.4616C16.2788 13.5829 16.1989 13.6435 16.1501 13.7217C16.107 13.7909 16.0815 13.8695 16.0757 13.9507C16.0692 14.0427 16.0982 14.1387 16.1563 14.3308L17.506 18.7919C17.7101 19.4667 17.8122 19.8041 17.728 19.9793C17.6551 20.131 17.5108 20.2358 17.344 20.2583C17.1513 20.2842 16.862 20.0829 16.2833 19.6802L12.4576 17.0181C12.2929 16.9035 12.2106 16.8462 12.1211 16.8239C12.042 16.8043 11.9593 16.8043 11.8803 16.8239C11.7908 16.8462 11.7084 16.9035 11.5437 17.0181L7.71805 19.6802C7.13937 20.0829 6.85003 20.2842 6.65733 20.2583C6.49056 20.2358 6.34626 20.131 6.27337 19.9793C6.18915 19.8041 6.29123 19.4667 6.49538 18.7919L7.84503 14.3308C7.90313 14.1387 7.93218 14.0427 7.92564 13.9507C7.91986 13.8695 7.89432 13.7909 7.85123 13.7217C7.80246 13.6435 7.72251 13.5829 7.56262 13.4616L3.84858 10.6459C3.28678 10.2199 3.00588 10.007 2.97101 9.81569C2.94082 9.65014 2.99594 9.48051 3.11767 9.36432C3.25831 9.23007 3.61074 9.22289 4.31559 9.20852L8.9754 9.11356C9.176 9.10947 9.27631 9.10743 9.36177 9.07278C9.43726 9.04218 9.50414 8.99359 9.55657 8.93125C9.61593 8.86068 9.64887 8.76592 9.71475 8.57639L11.245 4.174Z"
                                        stroke="var(--active-color)" stroke-width="2" stroke-linecap="round"
                                        stroke-linejoin="round"></path>
                                </g>
                            </svg>
                            <span>{{ rating(item) }}</span>
                        </small>
                    </figcaption>
                </figure>
            </div>
        </section>
    </div>
</template>
<style scoped>
figure {
    margin: 0;
}

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

.movieName {
    margin: 0;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    font-weight: 600;
}

.movieRating {
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 5px;
}
</style>