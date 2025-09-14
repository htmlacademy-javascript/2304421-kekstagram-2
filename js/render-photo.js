import { photos } from './thumbnails.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const totalCommentsCount = bigPicture.querySelector('.social__comment-total-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsTemplate = socialComments.querySelector('.social__comment');
const commentsCaption = bigPicture.querySelector('.social__caption');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const shownPhoto = null;
let commentsShown = 5;
const COMMENTS_STEP = 5;

const renderComments = () => {
  socialComments.innerHTML = '';
  const fragment = document.createDocumentFragment();

  const commentsToShow = shownPhoto.comments.slice(0, commentsShown);
  commentsToShow.forEach((comment) => {
    const shownCommentTemplate = socialCommentsTemplate.cloneNode(true);
    shownCommentTemplate.querySelector('.social__picture').src = comment.avatar;
    shownCommentTemplate.querySelector('.social__picture').alt = comment.name;
    shownCommentTemplate.querySelector('.social__text').textContent = comment.messages;
    fragment.appendChild(shownCommentTemplate);
  });
  socialComments.append(fragment);

  socialCommentCount.textContent = `${commentsToShow.length} из ${shownPhoto.comments.length} комментариев`;

  if (commentsToShow.length >= shownPhoto.comments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
};

const onCommentsLoaderClick = () => {
  commentsShown = Math.min(commentsShown + COMMENTS_STEP, shownPhoto.comments.length);
  renderComments();
};

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

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  document.removeEventListener('keydown', onEscapeDown);
};

const openBigPicture = (pictureId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(pictureId));
  const socialCommentsFragment = document.createDocumentFragment();

  bigPictureImg.src = currentPhoto.url;
  likesCount.textContent = currentPhoto.likes;
  socialComments.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const socialComment = socialCommentsTemplate.cloneNode(true);

    socialComment.querySelector('.social__picture').src = comment.avatar;
    socialComment.querySelector('.social__picture').alt = comment.name;
    socialComment.querySelector('.social__text').textContent = comment.messages;

    socialCommentsFragment.append(socialComment);
  });

  socialComments.append(socialCommentsFragment);

  commentsCaption.textContent = currentPhoto.description;

  bigPicture.classList.remove('hidden');
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeDown);
};

export { openBigPicture };
