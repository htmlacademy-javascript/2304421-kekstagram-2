import { openBigPicture } from './render-photo.js';
import { container } from './thumbnails.js';
import './validation-form.js';
import { footer } from './validation-form.js';
import './filter.js';

container.addEventListener('click', (evt) => {
  const currentPicture = evt.target.closest('.picture');

  if (currentPicture) {
    evt.preventDefault();
    openBigPicture(currentPicture.dataset.pictureId);
    container.setAttribute('inert', '');
    footer.inert = true;
  }
});
