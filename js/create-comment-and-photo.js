import { getRandomInteger } from './utils';
import * as consts from './const.js';
const avatarNumber = getRandomInteger(consts.MIN_AVATAR_NUMBER, consts.MAX_AVATAR_NUMBER);
const messageIndex = getRandomInteger(consts.FIRST_MESSAGE_INDEX, consts.LAST_MESSAGE_INDEX);
const nameIndex = getRandomInteger(consts.FIRST_NAME_INDEX, consts.LAST_NAME_INDEX);
const likesNumber = getRandomInteger(consts.MIN_LIKES, consts.MAX_LIKES);
const commentsNumber = getRandomInteger(consts.MIN_COMMENTS_NUMBER, consts.MAX_COMMENT_NUMBER);

let currentCommentId = 0;

const createComment = () => ({
  id: ++currentCommentId,
  avatar: `img/avatar-${avatarNumber}.svg`,
  messages: `${consts.MESSAGES[messageIndex]}. ${consts.MESSAGES[messageIndex]}`,
  name: `${consts.NAMES[nameIndex]}`,
});


let currentPhotoId = 0;

const createPhoto = () => ({
  id: ++currentPhotoId,
  url: `photos/${currentPhotoId}.jpg`,
  description: `Photo N${currentPhotoId}`,
  likes: likesNumber,
  comments: Array.from({length: commentsNumber}, createComment),
});

export { createPhoto };


