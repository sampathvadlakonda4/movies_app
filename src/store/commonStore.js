import { defineStore } from "pinia";
import { ref, computed } from 'vue';
const useCommonStore = defineStore('data', () => {
    const moviesList = ref([]);
    const searchText = ref('');
    const activeRecord = ref({});
    const isLoader = ref(false);
    const themeName = ref('dark');
    const getThemeName = computed(()=> themeName.value);
    const visibleItems = computed(() => {
        if (!moviesList.value.length) return {};
        let obj = {};
        for (let item of moviesList.value) {
            if (item?.genres?.length) {
                let genre = item.genres[0];
                if (!obj.hasOwnProperty(genre)) {
                    obj[genre] = [];
                }
                obj[genre].push(item);
            }
            else {
                if (!obj.hasOwnProperty('Others')) obj['Others'] = [];
                obj['Others'].push(item);
            }
        }
        let result = {};
        Object.keys(obj).sort((a, b) => a.localeCompare(b))
            .forEach((genre) => {
                result[genre] = obj[genre].toSorted((a, b) => Object.values(b.rating)[0] - Object.values(a.rating)[0])
            })
        return result
    })
    const getSearchText = computed(() => searchText.value)
    const getIsLoader = computed(() => isLoader.value)
    function assignData(list) {
        moviesList.value = list;
    }
    function setSearchText(text) {
        searchText.value = text;
    }
    function setActiveRecord(item) {
        activeRecord.value = item;
    }
    function setThemeName(name){
        themeName.value = name;
    }
    function setLoader(val){
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