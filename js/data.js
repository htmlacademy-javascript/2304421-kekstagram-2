import { createPhoto } from './create-comment-and-photo.js';
const getPhotoArray = () => Array.from({length: 25}, createPhoto);

export { getPhotoArray };
