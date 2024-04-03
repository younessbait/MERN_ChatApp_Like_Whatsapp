import axios from "axios";

const Auth = {
  login: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    axios.defaults.headers.common["Authorization"] = user.jwtToken;
  },
  init: () => {
    let user = JSON.parse(localStorage.getItem("user"));
    axios.defaults.headers.common["Authorization"] =
      user !== null ? user.jwtToken : "";
  },
  auth: () => localStorage.getItem("user") !== null,
  guest: () => localStorage.getItem("user") == null,
  logOut: () => {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("user");
  },
  getToken: () => {
    let user = JSON.parse(localStorage.getItem("user"));
    return user !== null ? user.jwtToken : "";
  },
  setUser: (profile) => {
    let user = JSON.parse(localStorage.getItem("user"));
    profile.jwtToken = user.jwtToken;
    localStorage.setItem("user", JSON.stringify(profile));
  },
};

export default Auth;
