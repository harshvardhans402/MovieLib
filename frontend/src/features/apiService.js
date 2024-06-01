import axios from 'axios';

const API_BASE_URL = 'https://www.omdbapi.com/';
const API_KEY = '17895477';

const fetchData = async (title,page) => {
    try {
        const response = await axios.get(API_BASE_URL, {
            params: {
                apikey: API_KEY,
                s: title,
                page:page
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export default fetchData;
