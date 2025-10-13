import { isTextHashtagValid, isTextDescriptionValid, errorHashtag, errorDescription, SUBMIT_BUTTON_TEXT, disabledButton, enabledButton, showSuccessMessage, showSendErrorMessage } from './utils.js';
import { sendData } from './api.js';
import { container } from './thumbnails.js';

const inputUploadFile = document.querySelector('#upload-file');
const formEditImg = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const buttonCloseFrom = document.querySelector('#upload-cancel');
const scaleControlSmaller = formEditImg.querySelector('.scale__control--smaller');
const scaleControlBigger = formEditImg.querySelector('.scale__control--bigger');
const scaleControlValue = formEditImg.querySelector('.scale__control--value');
const imagePreview = formEditImg.querySelector('.img-upload__preview img');
const slider = formEditImg.querySelector('.effect-level__slider');
const effectLevelValue = formEditImg.querySelector('.effect-level__value');
const effects = document.querySelectorAll('.effects__radio');
const sliderContainer = formEditImg.querySelector('.img-upload__effect-level');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');
const formSubmitButton = imgUploadForm.querySelector('.img-upload__submit');
export const footer = document.querySelector('footer');
const effectsPreviews = document.querySelectorAll('.effects__preview');
const FILE_TYPES = ['jpg', 'jpeg', 'png'];

// Функция закрытия формы по кнопке Escape
const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    if (document.activeElement === textHashtagsInput || document.activeElement === textDescription) {
      evt.stopPropagation();
    } else {
      closeEditImgForm();
    }
  }
};

// Загрузка фотографии и реализация изменения масштаба
inputUploadFile.addEventListener('change', () => {
  formEditImg.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeDown);
  buttonCloseFrom.addEventListener('click', closeEditImgForm);
  footer.inert = true;
  container.querySelectorAll('.picture').forEach((item) => {
    item.inert = true;

  });
  const file = inputUploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const objectUrl = URL.createObjectURL(file);
    imagePreview.src = objectUrl;

    effectsPreviews.forEach((preview) => {
      preview.style.backgroundImage = `url(${objectUrl})`;
    });
  }
});

scaleControlSmaller.addEventListener('click', () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue > 25) {
    currentValue -= 25;
    scaleControlValue.value = `${currentValue}%`;
    imagePreview.style.transform = `scale(${currentValue / 100})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue < 100) {
    currentValue += 25;
    scaleControlValue.value = `${currentValue}%`;
    imagePreview.style.transform = `scale(${currentValue / 100})`;
  }
});

// Создание слайдера
noUiSlider.create(slider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

sliderContainer.classList.add('hidden');

// Функция применения эффектов
const applyEffect = (effect, value) => {
  if (effect === 'chrome') {
    imagePreview.style.filter = `grayscale(${value})`;
  } else if (effect === 'sepia') {
    imagePreview.style.filter = `sepia(${value})`;
  } else if (effect === 'marvin') {
    imagePreview.style.filter = `invert(${value}%)`;
  } else if (effect === 'phobos') {
    imagePreview.style.filter = `blur(${value}px)`;
  } else if (effect === 'heat') {
    imagePreview.style.filter = `brightness(${value})`;
  } else {
    imagePreview.style.filter = 'none';
  }
};

effects.forEach((effect) => {
  effect.addEventListener('change', (evt) => {
    if (evt.target.checked) {
      const effectValue = evt.target.value;

      if (effectValue === 'none') {
        slider.noUiSlider.off('update');
        sliderContainer.classList.add('hidden');
        slider.classList.add('hidden');
        imagePreview.style.filter = 'none';
        effectLevelValue.value = '';
        return;
      }

      sliderContainer.classList.remove('hidden');
      slider.classList.remove('hidden');

      let options;

      if (effectValue === 'chrome' || effectValue === 'sepia') {
        options = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
      } else if (effectValue === 'marvin') {
        options = { range: { min: 0, max: 100}, start: 100, step: 1 };
      } else if (effectValue === 'phobos') {
        options = {range: { min: 0, max: 3 }, start: 3, step: 0.1 };
      } else if (effectValue === 'heat') {
        options = {range: { min: 1, max: 3}, start: 3, step: 0.1 };
      }

      slider.noUiSlider.updateOptions(options);
      slider.noUiSlider.set(options.start);

      slider.noUiSlider.off('update');
      slider.noUiSlider.on('update', (_, __, value) => {
        const rawValue = parseFloat(slider.noUiSlider.get());
        const roundedValue = Math.round(rawValue * 10) / 10;

        effectLevelValue.value = Number.isInteger(roundedValue) ? String(roundedValue) : roundedValue.toString();
        applyEffect(effectValue, value);
      });
    }
  });
});

//Валидация формы
const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextTag: 'div',
});

pristine.addValidator(textHashtagsInput, isTextHashtagValid, errorHashtag, 1, false);
pristine.addValidator(textDescription, isTextDescriptionValid, errorDescription, 1, false);

const onFormSubmit = (evt) => {
  evt.preventDefault();

  if (pristine.validate()) {
    textHashtagsInput.value = textHashtagsInput.value.trim().replaceAll(/\s+/g, ' ');
    disabledButton(formSubmitButton, SUBMIT_BUTTON_TEXT.SENDING);
    sendData(new FormData(imgUploadForm))
      .then(() => {
        closeEditImgForm();
        showSuccessMessage();
      })
      .catch(() => {
        showSendErrorMessage();
      })
      .finally(() => {
        enabledButton(formSubmitButton, SUBMIT_BUTTON_TEXT.IDLE);
      });
  }
};

imgUploadForm.addEventListener('submit', onFormSubmit);

//Функция закрытия формы
function closeEditImgForm() {
  formEditImg.classList.add('hidden');
  body.classList.remove('modal-open');
  inputUploadFile.value = '';
  textHashtagsInput.value = '';
  imagePreview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  document.removeEventListener('keydown', onEscapeDown);
  sliderContainer.classList.add('hidden');
  slider.classList.add('hidden');
  imagePreview.style.filter = 'none';
  imgUploadForm.querySelector('[value="none"]').checked = true;
  textDescription.value = '';
  formSubmitButton.disabled = false;
  pristine.reset();
  footer.inert = false;
  container.querySelectorAll('.picture').forEach((item) => {
    item.inert = false;
  });
}

