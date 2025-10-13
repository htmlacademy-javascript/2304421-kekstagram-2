// Получение случайного целого числа
export const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return result;
};

// Функция валидации написания хэштега
let errorMessage = '';
const errorHashtag = () => errorMessage;

const isTextHashtagValid = (value) => {
  errorMessage = '';

  if (!value.trim()) {
    return true;
  }

  const tags = value.trim().split(/\s+/);

  if (tags.length > 5) {
    errorMessage = 'Нельзя указывать больше пяти хэштегов';
    return false;
  }

  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());

  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];

    if (!tag.startsWith('#')) {
      errorMessage = 'Хэштег должен начинаться с символа #';
      return false;
    }

    if (tag === '#') {
      errorMessage = 'Хэштег не может состоять только из #';
      return false;
    }

    if (tag.length > 20) {
      errorMessage = 'Максимальная длина хэштега - 20 символов';
      return false;
    }

    if (!/^#[a-zа-яё0-9]{1,19}$/i.test(tag)) {
      errorMessage = 'Хэштег должен содержать только буквы и числа';
      return false;
    }

    if (lowerCaseTags.indexOf(lowerCaseTags[i]) !== i) {
      errorMessage = 'Один и тот же хэштег нельзя использовать дважды';
      return false;
    }
  }

  return true;
};

// Функция проверки валидации описания
let errorMessageDescription = '';
const errorDescription = () => errorMessageDescription;

const isTextDescriptionValid = (value) => {
  errorMessageDescription = '';

  if (!value.trim()) {
    return true;
  }

  if (value.length > 140) {
    errorMessageDescription = 'Длина комментария не может составлять больше 140 символов';
    return false;
  }

  return true;
};

// Сообщение с ошибкой загрузки изображений от других пользователей
const ERROR_SHOWN_TIME = 5000;
const dataErrorTemplate = document.querySelector('#data-error').content;
const dataSuccessTemplate = document.querySelector('#success').content;
const body = document.body;

export const showErrorMessage = (message) => {
  const errorArea = dataErrorTemplate.cloneNode(true);
  if (message) {
    errorArea.querySelector('.data-error__title').textContent = message;
  }
  body.append(errorArea);
  const dataErrorSection = document.querySelector('.data-error');

  setTimeout(() => {
    dataErrorSection.remove();
  }, ERROR_SHOWN_TIME);
};

// Сообщение об успешной отправке изображения
const showSuccessMessage = (message) => {
  const successArea = dataSuccessTemplate.cloneNode(true);

  if (message) {
    successArea.querySelector('.success__title').textContent = message;
  }

  body.append(successArea);
  const successSection = document.querySelector('.success');
  const successButton = document.querySelector('.success__button');

  const onEscapeDown = (evt) => {
    if (evt.key === 'Escape') {
      closeSuccessArea();
    }
  };

  const onClickOutside = (evt) => {
    if (evt.target === successSection) {
      closeSuccessArea();
    }
  };

  function closeSuccessArea () {
    successSection.remove();
    successButton.removeEventListener('click', closeSuccessArea);
    document.removeEventListener('keydown', onEscapeDown);
    successSection.removeEventListener('click', onClickOutside);
  }

  successButton.addEventListener('click', closeSuccessArea);
  document.addEventListener('keydown', onEscapeDown);
  successSection.addEventListener('click', onClickOutside);
};


// Сообщение с ошибкой отправки изображения
const sendErrorMessageTemplate = document.querySelector('#error').content;

const showSendErrorMessage = (message) => {
  const sendErrorMessageArea = sendErrorMessageTemplate.cloneNode(true);
  if (message) {
    sendErrorMessageArea.querySelector('.error__title').textContent = message;
  }

  body.append(sendErrorMessageArea);
  const sendErrorMessageSection = document.querySelector('.error');
  const sendErrorButton = document.querySelector('.error__button');

  const onEscapeDown = (evt) => {
    evt.stopPropagation();
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSendErrorArea();
    }
  };

  const onClickOutside = (evt) => {
    if (evt.target === sendErrorMessageSection) {
      closeSendErrorArea();
    }
  };

  function closeSendErrorArea () {
    sendErrorMessageSection.remove();
    sendErrorButton.removeEventListener('click', closeSendErrorArea);
    sendErrorMessageSection.removeEventListener('keydown', onEscapeDown);
    sendErrorMessageSection.removeEventListener('click', onClickOutside);
  }

  sendErrorButton.addEventListener('click', closeSendErrorArea);
  sendErrorMessageSection.addEventListener('keydown', onEscapeDown);
  sendErrorMessageSection.tabIndex = -1;
  sendErrorMessageSection.focus();
  sendErrorMessageSection.addEventListener('click', onClickOutside);
};


// Методы блокирования/разблокирования кнопки отправки формы
const SUBMIT_BUTTON_TEXT = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const disabledButton = (button, text) => {
  button.disabled = true;
  button.textContent = text;
};

const enabledButton = (button, text) => {
  button.disabled = false;
  button.textContent = text;
};

function debounce (callback, timeoutDelay = 500) {

  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isTextHashtagValid, isTextDescriptionValid, errorHashtag, errorDescription, SUBMIT_BUTTON_TEXT, disabledButton, enabledButton, showSuccessMessage, showSendErrorMessage, debounce };
