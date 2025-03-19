import { fetchImages, resetPage } from './js/pixabay-api.js';
import {
  renderImg,
  showLoader,
  hideLoader,
  errorMessage,
} from './js/render-functions.js';
import iziToast from 'izitoast';

const form = document.querySelector('.form');
const loadMoreButton = document.querySelector('#load-more');

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

  resetPage();
  loadMoreButton.style.display = 'none';

  showLoader();

  try {
    const images = await fetchImages(searchQuery);
    if (images.length === 0) {
      iziToast.error({
        title: 'No results',
        message: 'Sorry, no images found. Please try another search.',
        position: 'topRight',
      });
    } else {
      renderImg(images);
      loadMoreButton.style.display = 'block';
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    errorMessage();
  } finally {
    hideLoader();
  }
});
