import { apiPreferences } from "../config";
import { checkLogin } from "./checkLogin";

export const getPreferenceNews = (page=1,userName) => {
  let preferences = JSON.parse(localStorage.getItem("dataFinSo"));

  // get user info
  let userInfo = preferences.find((user) => {
    return user.name === checkLogin() || userName;
  });
  return fetch(apiPreferences(userInfo.preferences, page))
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "ok") {
          // api fetch news free limit total is 100
        return {articles: data.articles, total: data.totalResults > 100 ? 100 : data.totalResults};
      }
    })
    .catch(() => {
      return [];
    });
};
