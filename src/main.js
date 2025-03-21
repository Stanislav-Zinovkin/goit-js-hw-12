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
const gallery = document.querySelector('.gallery');

let totalHits = 0;

const scroll = () => {
  const galleryItem = gallery.querySelector('.gallery-item');
  if (galleryItem) {
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth',
    });
  }
};

form.addEventListener('submit', async event => {
  event.preventDefault();

  const searchQuery = event.target['search-text'].value.trim();

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
      totalHits = images.totalHits;

      if (totalHits <= 15) {
        loadMoreButton.style.display = 'none';
        iziToast.info({
          title: 'End of results',
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
        });
      } else {
        loadMoreButton.style.display = 'block';
      }
      scroll();
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    errorMessage();
  } finally {
    hideLoader();
  }
});

loadMoreButton.addEventListener('click', async () => {
  const searchQuery = document.querySelector('.form input').value.trim();
  const images = await fetchImages(searchQuery);
  renderImg(images);

  if (images.length < 15) {
    loadMoreButton.style.display = 'none';

    iziToast.info({
      title: 'End of results',
      message: "We're sorry, but you've reached the end of search results.",
      position: 'topRight',
    });
  }
  scroll();
});
