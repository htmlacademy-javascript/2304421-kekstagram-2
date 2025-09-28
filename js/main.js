import { openBigPicture } from './render-photo.js';
import { container } from './thumbnails.js';
import './validation-form.js';

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
    container.setAttribute('inert', '');
  }
});
