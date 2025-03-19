import axios from 'axios';

const API = '49333964-3aa2fa57d2af3ff070f171ad2';
const MAIN_URL = 'https://pixabay.com/api/';

export const fetchImages = searchQuery => {
  return axios
    .get(MAIN_URL, {
      params: {
        key: API,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data.hits;
    })
    .catch(error => {
      console.log('Error fetching images:', error);
    });
};
