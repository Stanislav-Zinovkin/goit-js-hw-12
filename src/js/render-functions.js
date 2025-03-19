import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'data-description',
  captionPosition: 'bottom',
  captionDelay: 0,
});

export const renderImg = images => {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';

  showLoader();

  if (images.length === 0) {
    return;
  }

  images.forEach(image => {
    const galleryItem = document.createElement('li');
    galleryItem.classList.add('gallery-item');

    const imgElement = document.createElement('img');
    imgElement.src = image.webformatURL;
    imgElement.alt = image.tags;

    const linkElement = document.createElement('a');
    linkElement.href = image.largeImageURL;
    linkElement.dataset.description = image.tags;
    linkElement.appendChild(imgElement);

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = image.tags;

    const infoBox = document.createElement('div');
    infoBox.classList.add('info-box');
    infoBox.innerHTML = `
      <p><strong>Likes:</strong> <span class="info-value">${image.likes}</span></p>
      <p><strong>Views:</strong> <span class="info-value">${image.views}</span></p>
      <p><strong>Comments:</strong> <span class="info-value">${image.comments}</span></p>
      <p><strong>Downloads:</strong> <span class="info-value">${image.downloads}</span></p>
    `;

    galleryItem.appendChild(linkElement);
    galleryItem.appendChild(infoBox);
    gallery.appendChild(galleryItem);
  });

  lightbox.refresh();
  hideLoader();
};

export const showLoader = () => {
  const loader = document.getElementById('loader');
  loader.style.display = 'block';
};

export const hideLoader = () => {
  const loader = document.getElementById('loader');
  loader.style.display = 'none';
};

export const errorMessage = () => {
  iziToast.error({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topRight',
  });
};
