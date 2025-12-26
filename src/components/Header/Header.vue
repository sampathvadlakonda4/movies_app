<script setup>
import {computed} from 'vue';
import { useRoute } from 'vue-router';
import useCommonStore from '../../store/commonStore';
const store = useCommonStore();
const route = useRoute();
const themeDetails = {
    '--body-bg-color': { dark: '#0f1014', light: '#e5e9f6' },
    '--text-color': { dark: 'rgba(255, 255, 255, 0.87)', light: 'rgba(0, 0, 0, 0.87)' },
    '--border-color': { dark: 'grey', light: '#8c8c8c' },
    '--fields-bg': { dark: '#343640b5', light: '#c4cbe4b5' },
    '--header-box-shadow': { dark: '#ffffff2e', light: '#0000002e' },
    '--active-color': { dark: '#00b8ad', light: '#2e43b8' },
}
const themeName = computed(()=> store?.getThemeName);
const visibleItems = computed(() => store?.visibleItems || {})
const searchText = computed(() => store.getSearchText);
function setValues(rootElement) {
    for (let cssVarName in themeDetails) {
        rootElement.style.setProperty(cssVarName, themeDetails[cssVarName][themeName.value])
    }
}
function toggleTheme() {
    let rootElement = document.documentElement;
    if (themeName.value === 'dark') {
        store.setThemeName('light');
        setValues(rootElement);
    }
    else {
        store.setThemeName('dark');
        setValues(rootElement);
    }
}
function onSearchInput(e) {
    store.setSearchText(e.target.value);
}
</script>
<template>
    <header class="pad-lr-1">
        <svg class="svgLogo" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
            id="_x32_" width="40px" height="40px" viewBox="0 0 512 512" xml:space="preserve" fill="var(--active-color)">
            <g>
                <path class="st0" fill="inherit"
                    d="M289.375,40.703c-40.906,0-76.25,23.781-93,58.266c-16.75-34.484-52.109-58.266-93.016-58.266   C46.266,40.703,0,86.969,0,144.063c0,57.078,46.266,103.328,103.359,103.328h186.016c57.094,0,103.359-46.25,103.359-103.328   C392.734,86.969,346.469,40.703,289.375,40.703z M103.359,183.141c-21.594,0-39.094-17.516-39.094-39.078   c0-21.594,17.5-39.094,39.094-39.094c21.563,0,39.063,17.5,39.063,39.094C142.422,165.625,124.922,183.141,103.359,183.141z    M289.375,183.141c-21.578,0-39.063-17.516-39.063-39.078c0-21.594,17.484-39.094,39.063-39.094   c21.594,0,39.094,17.5,39.094,39.094C328.469,165.625,310.969,183.141,289.375,183.141z" />
                <path class="st0" fill="inherit"
                    d="M332.125,271H53.828c-11.094,0-20.063,8.969-20.063,20.047v160.188c0,11.078,8.969,20.063,20.063,20.063   h278.297c11.094,0,20.063-8.984,20.063-20.063V291.047C352.188,279.969,343.219,271,332.125,271z" />
                <path class="st0" fill="inherit"
                    d="M504.344,306.688c-4.844-3.797-11.172-5.156-17.156-3.719l-97.844,23.844c-9,2.188-15.328,10.25-15.328,19.5   v47.484c0,9.25,6.328,17.297,15.328,19.484l97.844,23.859c5.984,1.438,12.313,0.078,17.156-3.719   c4.828-3.813,7.656-9.625,7.656-15.781v-95.188C512,316.313,509.172,310.5,504.344,306.688z" />
            </g>
        </svg>
        <section class="searchSection">
            <div class="searchContainer" v-if="Object.keys(visibleItems).length && route?.path !== '/movieDetails'">
                <svg class="searchIcon" xmlns="http://www.w3.org/2000/svg" width="15px" height="15px"
                    viewBox="0 0 24 24" fill="none">
                    <path
                        d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                        stroke="var(--active-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <input class="searchField" name="search" placeholder="Search..." type="text" :value="searchText"
                    @input="onSearchInput" />
            </div>
        </section>
        <section class="themeSection">
            <button class="btnStyles" @click="toggleTheme">
                <svg v-if="themeName === 'light'" title="Light" xmlns="http://www.w3.org/2000/svg"
                    fill="var(--active-color)" width="20px" height="20px" viewBox="-5.5 0 32 32" version="1.1">
                    <path
                        d="M11.875 6v2.469c0 0.844-0.375 1.25-1.156 1.25s-1.156-0.406-1.156-1.25v-2.469c0-0.813 0.375-1.219 1.156-1.219s1.156 0.406 1.156 1.219zM14.219 9.25l1.438-2.031c0.469-0.625 1.063-0.75 1.656-0.313s0.656 1 0.188 1.688l-1.438 2c-0.469 0.688-1.031 0.75-1.656 0.313-0.594-0.438-0.656-0.969-0.188-1.656zM5.781 7.25l1.469 2c0.469 0.688 0.406 1.219-0.219 1.656-0.594 0.469-1.156 0.375-1.625-0.313l-1.469-2c-0.469-0.688-0.406-1.219 0.219-1.656 0.594-0.469 1.156-0.375 1.625 0.313zM10.719 11.125c2.688 0 4.875 2.188 4.875 4.875 0 2.656-2.188 4.813-4.875 4.813s-4.875-2.156-4.875-4.813c0-2.688 2.188-4.875 4.875-4.875zM1.594 11.813l2.375 0.75c0.781 0.25 1.063 0.719 0.813 1.469-0.219 0.75-0.75 0.969-1.563 0.719l-2.313-0.75c-0.781-0.25-1.063-0.75-0.844-1.5 0.25-0.719 0.75-0.938 1.531-0.688zM17.5 12.563l2.344-0.75c0.813-0.25 1.313-0.031 1.531 0.688 0.25 0.75-0.031 1.25-0.844 1.469l-2.313 0.781c-0.781 0.25-1.281 0.031-1.531-0.719-0.219-0.75 0.031-1.219 0.813-1.469zM10.719 18.688c1.5 0 2.719-1.219 2.719-2.688 0-1.5-1.219-2.719-2.719-2.719s-2.688 1.219-2.688 2.719c0 1.469 1.188 2.688 2.688 2.688zM0.906 17.969l2.344-0.75c0.781-0.25 1.313-0.063 1.531 0.688 0.25 0.75-0.031 1.219-0.813 1.469l-2.375 0.781c-0.781 0.25-1.281 0.031-1.531-0.719-0.219-0.75 0.063-1.219 0.844-1.469zM18.219 17.219l2.344 0.75c0.781 0.25 1.063 0.719 0.813 1.469-0.219 0.75-0.719 0.969-1.531 0.719l-2.344-0.781c-0.813-0.25-1.031-0.719-0.813-1.469 0.25-0.75 0.75-0.938 1.531-0.688zM3.938 23.344l1.469-1.969c0.469-0.688 1.031-0.781 1.625-0.313 0.625 0.438 0.688 0.969 0.219 1.656l-1.469 1.969c-0.469 0.688-1.031 0.813-1.656 0.375-0.594-0.438-0.656-1.031-0.188-1.719zM16.063 21.375l1.438 1.969c0.469 0.688 0.406 1.281-0.188 1.719s-1.188 0.281-1.656-0.344l-1.438-2c-0.469-0.688-0.406-1.219 0.188-1.656 0.625-0.438 1.188-0.375 1.656 0.313zM11.875 23.469v2.469c0 0.844-0.375 1.25-1.156 1.25s-1.156-0.406-1.156-1.25v-2.469c0-0.844 0.375-1.25 1.156-1.25s1.156 0.406 1.156 1.25z" />
                </svg>
                <svg v-if="themeName === 'dark'" title="Dark" xmlns="http://www.w3.org/2000/svg" width="20px"
                    height="20px" viewBox="0 0 24 24" fill="var(--active-color)">
                    <g id="SVGRepo_bgCarrier" stroke-width="0" />
                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />
                    <g id="SVGRepo_iconCarrier">
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M20.3655 2.12433C20.0384 1.29189 18.8624 1.29189 18.5353 2.12433L18.1073 3.21354L17.0227 3.6429C16.1933 3.97121 16.1933 5.14713 17.0227 5.47544L18.1073 5.90481L18.5353 6.99401C18.8624 7.82645 20.0384 7.82646 20.3655 6.99402L20.7935 5.90481L21.8781 5.47544C22.7075 5.14714 22.7075 3.97121 21.8781 3.6429L20.7935 3.21354L20.3655 2.12433ZM19.4504 2.52989L19.8651 3.58533C19.9648 3.83891 20.165 4.04027 20.4188 4.14073L21.4759 4.55917L20.4188 4.97762C20.165 5.07808 19.9648 5.27943 19.8651 5.53301L19.4504 6.58846L19.0357 5.53301C18.936 5.27943 18.7358 5.07808 18.482 4.97762L17.4249 4.55917L18.482 4.14073C18.7358 4.04027 18.936 3.83891 19.0357 3.58533L19.4504 2.52989ZM16.4981 7.94681C16.171 7.11437 14.9951 7.11437 14.668 7.94681L14.5134 8.34008L14.1222 8.49497C13.2928 8.82328 13.2928 9.9992 14.1222 10.3275L14.5134 10.4824L14.668 10.8757C14.9951 11.7081 16.171 11.7081 16.4981 10.8757L16.6526 10.4824L17.0439 10.3275C17.8733 9.9992 17.8733 8.82328 17.0439 8.49497L16.6526 8.34008L16.4981 7.94681ZM15.583 8.35237L15.7243 8.71188C15.824 8.96545 16.0242 9.16681 16.278 9.26727L16.6417 9.41124L16.278 9.55521C16.0242 9.65567 15.824 9.85703 15.7243 10.1106L15.583 10.4701L15.4418 10.1106C15.3421 9.85703 15.1419 9.65567 14.8881 9.55521L14.5244 9.41124L14.8881 9.26727C15.1419 9.16681 15.3421 8.96545 15.4418 8.71188L15.583 8.35237Z"
                            fill="inherit" />
                        <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M11.0174 2.80157C6.37072 3.29221 2.75 7.22328 2.75 12C2.75 17.1086 6.89137 21.25 12 21.25C16.7767 21.25 20.7078 17.6293 21.1984 12.9826C19.8717 14.6669 17.8126 15.75 15.5 15.75C11.4959 15.75 8.25 12.5041 8.25 8.5C8.25 6.18738 9.33315 4.1283 11.0174 2.80157ZM1.25 12C1.25 6.06294 6.06294 1.25 12 1.25C12.7166 1.25 13.0754 1.82126 13.1368 2.27627C13.196 2.71398 13.0342 3.27065 12.531 3.57467C10.8627 4.5828 9.75 6.41182 9.75 8.5C9.75 11.6756 12.3244 14.25 15.5 14.25C17.5882 14.25 19.4172 13.1373 20.4253 11.469C20.7293 10.9658 21.286 10.804 21.7237 10.8632C22.1787 10.9246 22.75 11.2834 22.75 12C22.75 17.9371 17.9371 22.75 12 22.75C6.06294 22.75 1.25 17.9371 1.25 12Z"
                            fill="inherit" />
                    </g>
                </svg>
            </button>
        </section>
    </header>
</template>
<style scoped>
header {
    height: 50px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: sticky;
    top: 0;
    z-index: 2;
    background-color: var(--body-bg-color);
    box-shadow: 0px -9px 15px 5px var(--header-box-shadow);
}

.searchSection {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.svgLogo {
    margin-right: 10px;
}

.searchContainer {
    display: flex;
    align-items: center;
    height: 27px;
    border: 1px solid var(--active-color);
    border-radius: 30px;
    overflow: hidden;
    width: 100%;
    max-width: 200px;
    background-color: var(--fields-bg);
}

.searchIcon {
    padding: 0 7px;
}

.searchField {
    height: 100%;
    border: 0;
    border-left: 1px solid var(--active-color);
    padding-left: 10px;
    width: calc(100% - 40px);
    background: transparent;
    color: var(--text-color);
}

.searchField:focus {
    outline: 0;
}
</style>