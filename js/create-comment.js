let currentCommentId = 0;

const createComment = () => ({
  id: ++currentCommentId,
  avatar: `img/avatar-${avatarNumber}.svg`,
  messages: `${MESSAGES[messageIndex]}. ${MESSAGES[messageIndex]}`,
  name: `${NAMES[nameIndex]}`,
});

export {createComment};
