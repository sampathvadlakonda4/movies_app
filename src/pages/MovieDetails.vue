<script setup>
import { useRouter } from 'vue-router';
import useCommonStore from '@/store/commonStore';
import { computed, onBeforeMount, onBeforeUnmount } from 'vue';
const router = useRouter();
const store = useCommonStore();
const activeRecord = computed(() => store.activeRecord)
const rating = computed(() => {
    let val = 'NA';
    if (activeRecord.value?.rating && Object?.values(activeRecord.value.rating)?.length && Object.values(activeRecord.value?.rating)[0] !== null) {
        return `${Object.values(activeRecord.value?.rating)[0]}/10`
    }
    return val
})
const premiered = computed(() => new Date(activeRecord.value.premiered)?.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
}))
const runTime = computed(() => {
    let time = Number(((activeRecord.value?.runtime || 0) / 60)?.toFixed(2));
    if (time)
        return time > 1 ? `${time} hrs` : `${time} hr`;
    else return 'NA'
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
    <section class="movieDetailsCard">
        <div>
            <h3 class="name">{{ activeRecord?.name }}</h3>
            <div class="genres" v-if="activeRecord?.genres?.length"><span class="genreName"
                    v-for="genre of activeRecord?.genres" :key="genre">{{ genre }}</span></div>

        </div>
        <img class="currentImage bgImageStyles imageBg" :src="activeRecord.image?.medium" :alt="activeRecord?.name" />
        <div class="movieContent">
            <div class="moreDetails">
                <div> <span>Country - <strong>{{ activeRecord?.network?.country?.name }}</strong></span></div>
                <div><span>Language - <strong>{{ activeRecord?.language }}</strong></span></div>

                <div v-if="activeRecord?.premiered">Premiered - <strong>{{ premiered }}</strong></div>
                <div><span>Duration - <strong>{{ runTime }}</strong></span>
                </div>
                <div> <span class="movieRating">Rating - <strong>{{ rating }}</strong></span></div>
            </div>
            <p class='summary' v-html="activeRecord?.summary"></p>
        </div>
    </section>
</template>
<style scoped>
.moreDetails {
    background: var(--fields-bg);
    padding: 10px;
    border-radius: 10px;
    width: fit-content;
}

.summary {
    font-size: medium;
    margin: 0px;
    padding: 10px;
    background: var(--fields-bg);
    border-radius: 10px;
}

.movieDetailsCard {
    margin-inline: 10%;
    margin-top: 40px;
    padding-block: 10px;
}

.movieContent {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    margin-top: 10px;
    padding-right: 30px;
}

.name {
    margin: 0;
    color: var(--active-color);
}

.genres {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    margin-top: 5px;
}

.genreName {
    padding: 5px 10px;
    border-radius: 30px;
    background-color: var(--fields-bg);
    font-size: smaller;
    font-weight: 500;
}

.currentImage {
    border-radius: 10px;
    border: 5px solid var(--active-color);
    width: 200px;
    height: 300px;
    min-width: 200px;
    min-height: 300px;
    object-fit: fill;
    float: right;
    margin-top: 10px;
    /* box-shadow: 0px 0px 15px 4px var(--active-color), 0px 0px 10px 2px var(--active-color); */
}

@media screen and (max-width: 700px) {
    .movieDetailsCard {
        margin: 0px;
    }

    .currentImage {
        float: none;
    }

    .movieContent {
        padding-right: 0px;
    }
}

@media screen and (max-width: 350px) {
    .currentImage {
        width: 100%;
        height: auto;
        min-width: auto;
        min-height: auto;
    }
}
</style>