const uploadFileInput = document.querySelector('#upload-file');
const editImgForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeFormButton = document.querySelector('#upload-cancel');
const scaleControlSmaller = editImgForm.querySelector('.scale__control--smaller');
const scaleControlBigger = editImgForm.querySelector('.scale__control--bigger');
const scaleControlValue = editImgForm.querySelector('.scale__control--value');
const imagePreview = editImgForm.querySelector('.img-upload__preview img');
const slider = editImgForm.querySelector('.effect-level__slider');
const effectLevelValue = editImgForm.querySelector('.effect-level__value');
const effects = document.querySelectorAll('.effects__radio');
const sliderContainer = editImgForm.querySelector('.img-upload__effect-level');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescription = imgUploadForm.querySelector('.text__description');


const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditImgForm();
  }
};

uploadFileInput.addEventListener('change', () => {
  editImgForm.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onEscapeDown);
  closeFormButton.addEventListener('click', closeEditImgForm);
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

// effectLevelValue.value = 100;
// slider.noUiSlider.on('update', () => {
//   effectLavelValue.value = slider.noUiSlider.get();
// });

noUiSlider.create(slider, {
  range: { min: 0, max: 100 },
  start: 100,
  step: 1,
  connect: 'lower',
});

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
        sliderContainer.classList.add('hidden');
        slider.classList.add('hidden');
        imagePreview.style.filter = 'none';
        return;
      }

      sliderContainer.classList.remove('hidden');
      slider.classList.remove('hidden');

      let options;

      if (effectValue === 'chrome' || effectValue === 'sepia') {
        options = { range: { min: 0, max: 1 }, start: 1, step: 0.1 };
      } else if (effectValue === 'marvin') {
        options = { range: { min: 0, max: 100}, start: 100, step: 0.1 };
      } else if (effectValue === 'phobos') {
        options = {range: { min: 0, max: 3 }, start: 3, step: 0.1 };
      } else if (effectValue === 'heat') {
        options = {range: { min: 1, max: 3}, start: 3, step: 0.1 };
      }

      slider.noUiSlider.updateOptions(options);
      slider.noUiSlider.set(options.start);

      slider.noUiSlider.off('update');
      slider.noUiSlider.on('update', (_, __, value) => {
        applyEffect(effectValue, value);
      });
    }
  });
});

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

pristine.addValidator(
  textDescription,
  (value) => value.length <= 140,
);

pristine.addValidator(
  textHashtagsInput,
  (value) => {
    if (!value.trim()) {
      return true;
    }
    const tags = value.trim().split(/\s+/);
    if (tags.length > 5) {
      return false;
    }
    return tags.every((tag) => /^#[a-zа-яё0-9]{1,19}$/i.test(tag));
  }
);

imgUploadForm.addEventListener('submit', (evt) => {
  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});

function closeEditImgForm() {
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';
  imagePreview.style.transform = 'scale(1)';
  scaleControlValue.value = '100%';
  document.removeEventListener('keydown', onEscapeDown);
  sliderContainer.classList.add('hidden');
  slider.classList.add('hidden');
  imagePreview.style.filter = 'none';
  pristine.reset();
}
