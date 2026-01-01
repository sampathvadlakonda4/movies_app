export const useLogic = function () {
    function ratingCheck(item) {
        return item?.rating &&
            typeof (item.rating) === 'object' &&
            item.rating !== null &&
            Object.values(item.rating).length &&
            Object.values(item.rating)[0] !== null
    }
    return { ratingCheck }
}