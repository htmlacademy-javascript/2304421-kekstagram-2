// import { getPhotoArray } from './data.js';
import { getData } from './api.js';
import { showErrorMessage } from './utils.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
// const photos = getData();
const container = document.querySelector('.pictures');

let photos = [];

const renderThumbnails = (photoArray) => {
  photos = photoArray;
  const fragment = document.createDocumentFragment();

  photoArray.forEach((photo) => {
    const thumbnail = template.cloneNode(true);
    const image = thumbnail.querySelector('.picture__img');
    image.src = photo.url;
    image.alt = photo.description;
    thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
    thumbnail.querySelector('.picture__likes').textContent = photo.likes;
    thumbnail.dataset.pictureId = String(photo.id);
    fragment.appendChild(thumbnail);
  });
  container.appendChild(fragment);
};

getData()
  .then((data) => {
    renderThumbnails(data);
  })
  .catch((err) => {
    console.error(err.message);
    showErrorMessage();
  });

export { container, photos };
