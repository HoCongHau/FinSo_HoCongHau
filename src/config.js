export const apiKey = "57439fa0227a48fd92e3ef4d43c24475";
export const apiHeadline = ( page=1, country = 'us') => {
  return `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&apiKey=${apiKey}`;
};
export const apiPreferences = (query = "bitcoin", page = 1) => {
  return `https://newsapi.org/v2/everything?q=${query}&page=${page}&apiKey=${apiKey}`;
};