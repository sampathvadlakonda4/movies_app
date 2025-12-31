<script setup>
import { onMounted, onUnmounted, ref } from 'vue';
const numberOfCards = ref(2);
const numberOfGenres = ref(2);
function setNumberOfCardsAndGenres() {
    numberOfGenres.value = Math.floor((window.innerHeight - 100) / 300) || 1;
    numberOfCards.value = Math.floor((window.innerWidth - 50 + 40) / (150 + 20)) || 1;  // 50 - padding, 
    // 40 - first and last card gap, 
    // 150 - width of the card,
    // 20 - gap between each card;
}
setNumberOfCardsAndGenres();
onMounted(() => {
    window.addEventListener('resize', setNumberOfCardsAndGenres);
})
onUnmounted(() => {
    window.removeEventListener('resize', setNumberOfCardsAndGenres);
})
</script>
<template>
    <section class="loaderContainer">
        <div v-for="genre in numberOfGenres" :key="genre" class="genre" :class="genre === 1 ? 'mt-20' : 'mt-50'">
            <div class="heading borderRadius-30 bgColor animate-loader"></div>
            <div class="cardsContainer">
                <div class="card" v-for="card in numberOfCards" :key="card">
                    <div class="imageContainer bgColor animate-loader"></div>
                    <div class="nameOfMovie mt-10 borderRadius-30 bgColor animate-loader"></div>
                    <div class="rating mt-10 borderRadius-30 bgColor animate-loader"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped>
.loaderContainer {
    overflow: hidden;
}

.animate-loader {
    position: relative;
    overflow: hidden;
}

.animate-loader::after {
    content: '';
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, var(--body-bg-color), transparent);
    opacity: 0.45;
    position: absolute;
    top: 0;
    z-index: 1;
    animation: animate 2s infinite;
    transform: translateX(-100%)
}

@keyframes animate {
    100% {
        transform: translateX(100%);
    }
}

.mt-50 {
    margin-top: 50px;
}

.mt-20 {
    margin-top: 20px;
}

.mt-10 {
    margin-top: 10px;
}

.borderRadius-30 {
    border-radius: 30px;
}

.bgColor {
    background-color: var(--fields-bg);
}

.heading {
    width: 100px;
    height: 20px;
    margin-bottom: 10px;
}

.cardsContainer {
    display: flex;
    gap: 20px;
    width: 100%;
}

.card {
    width: 150px;
    min-width: 150px;
}

.imageContainer {
    height: 200px;
    width: 100%;
    border-radius: 5px;
}

.nameOfMovie {
    width: 100%;
    height: 10px;
}

.rating {
    width: 50%;
    height: 10px;
    background-color: var(--fields-bg);
}
</style>