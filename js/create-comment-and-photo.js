import { getRandomInteger } from './utils.js';
import * as consts from './const.js';


let currentCommentId = 0;

const createComment = () => {
  const avatarNumber = getRandomInteger(consts.MIN_AVATAR_NUMBER, consts.MAX_AVATAR_NUMBER);
  const messageIndex = getRandomInteger(consts.FIRST_MESSAGE_INDEX, consts.LAST_MESSAGE_INDEX);
  const nameIndex = getRandomInteger(consts.FIRST_NAME_INDEX, consts.LAST_NAME_INDEX);

  return {
    id: ++currentCommentId,
    avatar: `img/avatar-${avatarNumber}.svg`,
    messages: `${consts.MESSAGES[messageIndex]}. ${consts.NAMES[nameIndex]}`,
    name: `${consts.NAMES[nameIndex]}`,
  };
};


let currentPhotoId = 0;

const createPhoto = () => {
  const likesNumber = getRandomInteger(consts.MIN_LIKES, consts.MAX_LIKES);
  const commentsNumber = getRandomInteger(consts.MIN_COMMENTS_NUMBER, consts.MAX_COMMENT_NUMBER);

  return {
    id: ++currentPhotoId,
    url: `photos/${currentPhotoId}.jpg`,
    description: `Photo N${currentPhotoId}`,
    likes: likesNumber,
    comments: Array.from({length: commentsNumber}, createComment),
  };
};

export { createPhoto };


