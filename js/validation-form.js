const uploadFileInput = document.querySelector('#upload-file');
const editImgForm = document.querySelector('.img-upload__overlay');
const body = document.querySelector('body');
const closeFormButton = document.querySelector('#upload-cancel');
const scaleControlSmaller = editImgForm.querySelector('.scale__control--smaller');
const scaleControlBigger = editImgForm.querySelector('.scale__control--bigger');
const scaleControlValue = editImgForm.querySelector('.scale__control--value');


const onEscapeDown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeEditImgForm();
  }
};

function closeEditImgForm() {
  editImgForm.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onEscapeDown);
}

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
  }
});

scaleControlBigger.addEventListener('click', () => {
  let currentValue = parseInt(scaleControlValue.value, 10);
  if (currentValue < 100) {
    currentValue += 25;
    scaleControlValue.value = `${currentValue}%`;
  }
});


