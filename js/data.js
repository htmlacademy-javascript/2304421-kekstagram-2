import {getRandomInteger} from './util.js';
import {createComment} from './create-comment.js';
import {createPhoto} from './create-photo.js';
const photoArray = () => Array.from({length: 25}, createPhoto);

export {photoArray};
