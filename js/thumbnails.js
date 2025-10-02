import { getData } from './api.js';
import { showErrorMessage } from './utils.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
// const filterSection = document.querySelector('.img-filters');

let photos = [];

const renderThumbnails = (photoArray) => {
  photos = photoArray;
  container.querySelectorAll('.picture').forEach((el) => el.remove());
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

// getData()
//   .then((data) => {
//     renderThumbnails(data);
//     filterSection.classList.remove('img-filters--inactive');
//   })
//   .catch((err) => {
//     console.error(err.message);
//     showErrorMessage();
//   });

export { container, photos, renderThumbnails };
