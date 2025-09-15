import {getRandomInteger} from './utils';

const avatarNumber = getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER);
const messageIndex = getRandomInteger(FIRST_MESSAGE_INDEX, LAST_MESSAGE_INDEX);
const nameIndex = getRandomInteger(FIRST_NAME_INDEX, LAST_NAME_INDEX);
const likesNumber = getRandomInteger(MIN_LIKES, MAX_LIKES);
const commentsNumber = getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENT_NUMBER);

let currentCommentId = 0;

const createComment = () => ({
  id: ++currentCommentId,
  avatar: `img/avatar-${avatarNumber}.svg`,
  messages: `${MESSAGES[messageIndex]}. ${MESSAGES[messageIndex]}`,
  name: `${NAMES[nameIndex]}`,
});


let currentPhotoId = 0;

const createPhoto = () => ({
  id: ++currentPhotoId,
  url: `photos/${currentPhotoId}.jpg`,
  description: `Photo N${currentPhotoId}`,
  likes: likesNumber,
  comments: Array.from({length: commentsNumber}, createComment),
});

export {createComment, createPhoto};


