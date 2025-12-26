<script setup>
import { useRouter } from 'vue-router';
import useCommonStore from '../../store/commonStore';
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
const router = useRouter();
const store = useCommonStore();
const activeRecord = computed(() => store.activeRecord)
const themeName = computed(() => store.getThemeName)
const rating = computed(() => {
    let val = 'NA';
    if (activeRecord.value?.rating && Object?.values(activeRecord.value.rating)?.length && Object.values(activeRecord.value?.rating)[0] !== null) {
        return `${Object.values(activeRecord.value?.rating)[0]}/10`
    }
    return val
})
onBeforeMount(() => {
    if (!Object.keys(activeRecord.value)?.length)
        router.push({ name: 'Dashboard' })
})
onBeforeUnmount(() => {
    store.setActiveRecord({});
})
</script>
<template>
    <!-- <button class="btnStyles goBackBtn" title="Go to dashboard" @click="router.back()">
        <svg xmlns="http://www.w3.org/2000/svg" stroke='var(--text-color)' width="20px" height="20px"
            viewBox="0 0 24 24" fill="none">
            <g id="SVGRepo_bgCarrier" stroke-width="0" />
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
            <g id="SVGRepo_iconCarrier">
                <path d="M22 22L2 22" stroke="inherit" stroke-width="1.5" stroke-linecap="round" />
                <path
                    d="M2 11L6.06296 7.74968M22 11L13.8741 4.49931C12.7784 3.62279 11.2216 3.62279 10.1259 4.49931L9.34398 5.12486"
                    stroke="inherit" stroke-width="1.5" stroke-linecap="round" />
                <path d="M15.5 5.5V3.5C15.5 3.22386 15.7239 3 16 3H18.5C18.7761 3 19 3.22386 19 3.5V8.5"
                    stroke="inherit" stroke-width="1.5" stroke-linecap="round" />
                <path d="M4 22V9.5" stroke="inherit" stroke-width="1.5" stroke-linecap="round" />
                <path d="M20 9.5V13.5M20 22V17.5" stroke="inherit" stroke-width="1.5" stroke-linecap="round" />
                <path
                    d="M15 22V17C15 15.5858 15 14.8787 14.5607 14.4393C14.1213 14 13.4142 14 12 14C10.5858 14 9.87868 14 9.43934 14.4393M9 22V17"
                    stroke="inherit" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path
                    d="M14 9.5C14 10.6046 13.1046 11.5 12 11.5C10.8954 11.5 10 10.6046 10 9.5C10 8.39543 10.8954 7.5 12 7.5C13.1046 7.5 14 8.39543 14 9.5Z"
                    stroke="inherit" stroke-width="1.5" />
            </g>
        </svg>
    </button> -->
        <section class="movieDetailsCard pt-10">
            <img class="currentImage bgImageStyles imageBg"
                 :src="activeRecord.image?.medium"
                :alt="activeRecord?.name" />
            <div class="movieContent">
                <h3 class="name">{{ activeRecord?.name }}</h3>
                <div class="genres" v-if="activeRecord?.genres?.length"><small class="genreName"
                        v-for="genre of activeRecord?.genres" :key="genre">{{ genre }}</small></div>
                <div class="pt-10"><small>Duration - <strong>{{ activeRecord?.runtime / 60 > 1 ?
                    `${activeRecord?.runtime / 60} hrs` : `${activeRecord?.runtime / 60} hr` }}</strong></small>
                </div>
                <div><small>Language - <strong>{{ activeRecord?.language }}</strong></small></div>
                <div> <small class="movieRating">Rating - <strong>{{ rating }}</strong></small></div>
                <div> <small>Country - <strong>{{ activeRecord?.network?.country?.name }}</strong></small></div>
                <p class='summary' v-html="activeRecord?.summary"></p>
            </div>
        </section>
</template>
<style scoped>
small {
    font-size: medium;
}

.summary {
    font-size: medium;
    margin-bottom: 5px;
}

.pt-10 {
    padding-top: 10px;
}

.goBackBtn {
    margin-block: 7px !important
}

.movieDetailsCard {
    display: flex;
    gap: 15%;
    margin-inline: 20%;
    margin-top: 40px;
}

.movieContent {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.name {
    margin: 0;
}

.genres {
    display: flex;
    flex-wrap: wrap;
}

.genreName {
    padding-inline: 10px;
    border-right: 1px solid var(--border-color);
}

.genreName:first-child {
    padding-left: 0px !important;
}

.genreName:last-child {
    border: none;
}

.currentImage {
    border-radius: 10px;
    border: 5px solid var(--active-color);
    width: 200px;
    height: 300px;
    min-width: 200px;
    min-height: 300px;
    object-fit: fill;
}

@media screen and (min-width: 600px) and (max-width: 900px) {
    .movieDetailsCard {
        margin-inline: 0px;
        gap: 10%;
    }
}

@media screen and (max-width: 599px) {
    .movieDetailsCard {
        flex-wrap: wrap;
        gap: 10px;
        margin: 0px;
    }
}
</style>