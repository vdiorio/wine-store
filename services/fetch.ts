const apiURL = 'https://wine-back-test.herokuapp.com/products';

export const apiFetch = (page: string, filter: string = '0-999999') => {
  const url = `${apiURL}?page=${page}&limit=12&filter=${filter}`;
  return fetch(url).then((response) => response.json());
};

export const apiFetchAll = () => fetch(`${apiURL}`)
  .then((response) => response.json());
