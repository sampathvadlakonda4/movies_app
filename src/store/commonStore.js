import { defineStore } from "pinia";
import { ref, computed } from 'vue';
import { useLogic } from '@/composables/commonLogic'
const { ratingCheck } = useLogic();
const useCommonStore = defineStore('data', () => {
    const moviesList = ref([]);
    const searchText = ref('');
    const activeRecord = ref({});
    const isLoader = ref(false);
    const themeName = ref('dark');
    const getThemeName = computed(() => themeName.value);
    const visibleItems = computed(() => {
        if (!moviesList.value.length) return {};
        let obj = {};
        for (let item of moviesList.value) {
            if (item?.genres?.length) {
                let genre = item.genres[0];
                if (!obj[genre]) obj[genre] = [];
                obj[genre].push(item);
            }
            else {
                let keyName = 'Others';
                if (!obj[keyName]) obj[keyName] = [];
                obj[keyName].push(item);
            }
        }
        let result = {};

        Object.keys(obj).sort((a, b) => a.localeCompare(b))
            .forEach((genre) => {
                result[genre] = obj[genre].toSorted((a, b) => rating(b) - rating(a))
            })
        return result
    })
    const getSearchText = computed(() => searchText.value)
    const getIsLoader = computed(() => isLoader.value)
    function rating(movie) {
        return ratingCheck(movie) ? Object.values(movie.rating)[0] : 0;
    }
    function assignData(list) {
        moviesList.value = list;
    }
    function setSearchText(text) {
        searchText.value = text;
    }
    function setActiveRecord(item) {
        activeRecord.value = item;
    }
    function setThemeName(name) {
        themeName.value = name;
    }
    function setLoader(val) {
        isLoader.value = val;
    }
    return {
        assignData,
        moviesList,
        visibleItems,
        searchText,
        setSearchText,
        getSearchText,
        setActiveRecord,
        activeRecord,
        themeName,
        getThemeName,
        setThemeName,
        setLoader,
        isLoader,
        getIsLoader,
    }
},
    {
        persist: {
            storage: sessionStorage,
        }
    }
)
export default useCommonStore;