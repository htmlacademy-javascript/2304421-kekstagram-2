const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо.',
  'Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];


const NAMES = [
  'Иван',
  'Хуан',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Сергей',
  'Себастьян',
  'Роза',
  'Василиса'
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_NUMBER = 1;
const MAX_AVATAR_NUMBER = 6;
const FIRST_MESSAGE_INDEX = 0;
const LAST_MESSAGE_INDEX = MESSAGES.length - 1;
const FIRST_NAME_INDEX = 0;
const LAST_NAME_INDEX = NAMES.length - 1;
const MIN_COMMENTS_NUMBER = 0;
const MAX_COMMENT_NUMBER = 30;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  let previousValue = -1;

  return () => {
    const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
    if (previousValue !== result) {
      previousValue = result;
      return result;
    }
    return result === upper ? lower : result + 1;
  };
};

const avatarNumber = getRandomInteger(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER);
const messageIndex = getRandomInteger(FIRST_MESSAGE_INDEX, LAST_MESSAGE_INDEX);
const nameIndex = getRandomInteger(FIRST_NAME_INDEX, LAST_NAME_INDEX);

let currentCommentId = 0;

const createComment = () => ({
  id: ++currentCommentId,
  avatar: `img/avatar-${avatarNumber}.svg`,
  messages: `${MESSAGES[messageIndex]}. ${MESSAGES[messageIndex]}`,
  name: `${NAMES[nameIndex]}`,
});

const likesNumber = getRandomInteger(MIN_LIKES, MAX_LIKES);
const commentsNumber = getRandomInteger(MIN_COMMENTS_NUMBER, MAX_COMMENT_NUMBER);

let currentPhotoId = 0;

const createPhoto = () => ({
  id: ++currentPhotoId,
  url: `photos/${currentPhotoId}.jpg`,
  description: `Photo N${currentPhotoId}`,
  likes: likesNumber,
  comments: Array.from({length: commentsNumber}, createComment),
});

const photoArray = Array.from({length: 25}, createPhoto);
console.log(photoArray);
