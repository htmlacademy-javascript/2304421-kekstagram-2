const BASED_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

// const loadPhotos = () => fetch(`${BASED_URL}${ROUTE.GET_DATA}`, {
//   method: METHOD.GET,
//   credentials: 'include',
// }).then((response) => response.ok ? response.json() : Promise.reject('Message'));


const loadPhotos = () => {
  fetch(`${BASED_URL}${ROUTE.GET_DATA}`, {
    method: METHOD.GET,
    credentials: 'include',
  })
    .then((respons) => {
      if (!respons.ok) {
        throw new Error(`Ошибка загрузки: ${respons.status}`);
      }
      return respons.json();
    });
};

export {loadPhotos};
