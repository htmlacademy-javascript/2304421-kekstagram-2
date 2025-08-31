const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.floor(Math.random() * (upper - lower + 1) + lower);
  return result;
};

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;

}

function isPalindrom(string) {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  let reversedString = '';
  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }
  return reversedString === normalizedString;
}

function getInteger(string) {
  string = string.toString();
  let integer = '';
  for (let i = 0; i < string.length; i++) {
    const parsed = parseInt(string[i], 10);
    if (Number.isNaN(string[i]) !== true) {
      integer += parsed;
    }
  }
  return integer.length > 0 ? parseInt(integer, 10) : NaN;
}


export {getRandomInteger};
