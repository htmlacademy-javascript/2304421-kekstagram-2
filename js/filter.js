import { getData } from './api.js';
import { renderThumbnails } from './thumbnails.js';
import { showErrorMessage } from './utils.js';
import { debounce } from './utils.js';

const FILTER = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filterSection = document.querySelector('.img-filters');
const filterButtons = filterSection.querySelectorAll('.img-filters__button');

let defaults = [];

const applyFilter = (id) => {

  let photosFiltered = [];

  if (id === FILTER.DEFAULT) {
    photosFiltered = [...defaults];
  } else if (id === FILTER.RANDOM) {
    photosFiltered = [...defaults].sort(() => Math.random() - 0.5).slice(0, 10);
  } else if (id === FILTER.DISCUSSED) {
    photosFiltered = [...defaults].sort((a, b) => b.comments.length - a.comments.length);
  }

  renderThumbnails(photosFiltered);
};

const debouncedApplyFilter = debounce(applyFilter, 500);

filterSection.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    const btnId = evt.target.id;

    filterButtons.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });

    evt.target.classList.add('img-filters__button--active');

    debouncedApplyFilter(btnId);
  }
});

const initFilters = () => {
  getData()
    .then((data) => {
      defaults = data;
      renderThumbnails(defaults);
      filterSection.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showErrorMessage();
    });
};

export { initFilters };

