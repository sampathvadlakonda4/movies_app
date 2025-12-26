import axios from 'axios';
const fetchMoviesList = async () => {
    const url = 'https://api.tvmaze.com/shows'
    try {
        const getData = await axios.get(url);
        return getData?.data || [];
    }
    catch (err) {
        console.error('Error in tvmaze api',err);
    }
};
export {
    fetchMoviesList
}