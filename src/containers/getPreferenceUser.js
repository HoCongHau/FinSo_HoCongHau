export const getPreferenceUser = (userName) => {
    let listUser = localStorage.getItem("dataFinSo")
      ? JSON.parse(localStorage.getItem("dataFinSo"))
      : [];
    return listUser.find((user) => {
      return user.name === userName;
    }).preferences;
  };
  