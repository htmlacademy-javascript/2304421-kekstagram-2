let currentPhotoId = 0;

const createPhoto = () => ({
  id: ++currentPhotoId,
  url: `photos/${currentPhotoId}.jpg`,
  description: `Photo N${currentPhotoId}`,
  likes: likesNumber,
  comments: Array.from({length: commentsNumber}, createComment),
});

export {createPhoto};
