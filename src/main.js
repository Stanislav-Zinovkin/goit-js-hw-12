import { fetchImages } from './js/pixabay-api.js';
import {
  renderImg,
  showLoader,
  hideLoader,
  errorMessage,
} from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector('.form');
form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = event.target['search-text'].value.trim();
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
  if (searchQuery === '') {
    iziToast.error({
      title: 'Invalid input',
      message: 'Please enter a valid search term.',
      position: 'topRight',
    });
    return;
  }

  showLoader();

  fetchImages(searchQuery)
    .then(images => {
      console.log('Received images:', images);
      if (images.length === 0) {
        iziToast.error({
          title: 'No results',
          message: 'Sorry, no images found. Please try another search.',
          position: 'topRight',
        });
      } else {
        renderImg(images);
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      errorMessage();
    })
    .finally(() => {
      hideLoader();
    });
});
