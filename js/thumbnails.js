const template = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

let photos = [];

const renderThumbnails = (photosArray) => {
  photos = photosArray;
  container.querySelectorAll('.picture').forEach((el) => el.remove());
  const fragment = document.createDocumentFragment();

  photosArray.forEach((photo) => {
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


export { container, photos, renderThumbnails };
