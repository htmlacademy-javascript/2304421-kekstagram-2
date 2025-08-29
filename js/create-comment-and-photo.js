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


