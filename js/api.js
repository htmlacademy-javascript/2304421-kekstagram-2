const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const ROUTE = {
  GET_DATA: '/data',
  POST_DATA: '/',
};

const METHOD = {
  GET: 'GET',
  POST: 'POST',
};

const ERROR_TEXT = {
  GET_DATA: 'Ну удалось загрузить данные. Попробуйте обновить старницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте еще раз',
};


const load = (route, errorText = null, method = METHOD.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Произошла ошибка ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((err) => {
      throw new Error(errorText ?? err.message);
    });

const getData = () => load(ROUTE.GET_DATA, ERROR_TEXT.GET_DATA);

const sendData = (body) => load(ROUTE.POST_DATA, ERROR_TEXT.SEND_DATA, METHOD.POST, body);

export {getData, sendData};
