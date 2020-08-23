import { apiHeadline } from "../config";

export const getTopHeadline = (page) => {
  return fetch(apiHeadline(page))
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
        // api fetch news free limit total is 100
        return {
          articles: data.articles,
          total: data.totalResults > 100 ? 100 : data.totalResults,
        };
      }
    })
    .catch(() => {
      return [];
    });
};
