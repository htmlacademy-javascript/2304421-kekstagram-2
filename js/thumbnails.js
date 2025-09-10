import './const.js';
import {getPhotoArray} from './data.js';

const template = document.querySelector('#picture').content.querySelector('.picture');
const photos = getPhotoArray();
const container = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();

photos.forEach((photo) => {
  const thumbnail = template.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  image.src = photo.url;
  image.alt = photo.description;
  thumbnail.querySelector('.picture__comments').textContent = photo.comments.length;
  thumbnail.querySelector('.picture__likes').textContent = photo.likes;
  fragment.appendChild(thumbnail);
});
container.appendChild(fragment);
