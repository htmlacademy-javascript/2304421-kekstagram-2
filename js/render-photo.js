import { photos } from './thumbnails.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const numberShownComments = bigPicture.querySelector('.social__comment-shown-count');
const totalNumberComments = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentTemplate = bigPicture.querySelector('.social__comment');
const socialCaption = bigPicture.querySelector('.social__caption');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const COMMENTS_STEP = 5;
let currentPhoto = null;
let commentsShown = 0;

const onBigPictureCancelClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscapeDown);
  document.body.classList.remove('modal-open');
}

const renderComments = () => {
  socialComments.innerHTML = '';
  const socialCommentsFragment = document.createDocumentFragment();
  currentPhoto.comments.slice(0, commentsShown).forEach((comment) => {
    const socialComment = socialCommentTemplate.cloneNode(true);
    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.message;
    socialCommentsFragment.append(socialComment);
  });

  socialComments.append(socialCommentsFragment);

  numberShownComments.textContent = commentsShown;
  totalNumberComments.textContent = currentPhoto.comments.length;

  if (commentsShown >= currentPhoto.comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  commentsShown = Math.min(commentsShown + COMMENTS_STEP, currentPhoto.comments.length);
  renderComments();
};

const openBigPicture = (pictureId) => {
  currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialCaption.textContent = currentPhoto.description;

  commentsShown = Math.min(COMMENTS_STEP, currentPhoto.comments.length);
  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.addEventListener('keydown', onEscapeDown);

  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};


export {openBigPicture};

