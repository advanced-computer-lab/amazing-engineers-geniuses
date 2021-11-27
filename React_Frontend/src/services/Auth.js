import axios from "axios";

const api = 'http://localhost:8000/auth/';

class Auth {
  login(username, password) {
    return axios
      .post(api + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      })
  }

  logout() {
    localStorage.removeItem("user");
    window.location.replace('/');
  }

  register(username, password) {
    return axios.post(api + "register", {
      username,
      password
    })
  }

  getCurrentUser() {
    const user = localStorage.getItem('user')
  //  console.log(user);
    if(user)
      return JSON.parse(user);
    else{
      return {username: 'Guest', isAdmin: false};
    }
  }
}

export default new Auth();