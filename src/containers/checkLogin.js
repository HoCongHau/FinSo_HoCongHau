export const checkLogin = () => {
  // get list user if exists, else set is empty array
  let listUser = localStorage.getItem("dataFinSo")
    ? JSON.parse(localStorage.getItem("dataFinSo"))
    : [];

  // get item userLogin
  let userName = localStorage.getItem("userLogin")
    ? localStorage.getItem("userLogin")
    : "";
  return userName
    ? listUser.find((user) => {
        return user.name === userName;
      }).name
    : listUser.find((user) => {
        return user.name === userName;
      });
};
