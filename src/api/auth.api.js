class Auth {
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }
  //   {
  //     "id": "유저 아이디",
  // 		"password": "유저 비밀번호",
  // 		"nickname": "유저 닉네임"
  // }
  async signUp(data) {
    const path = "/register";

    const response = this.#axios.post(path, data);
    const result = response.result;

    return result;
  }
  // {
  //   "id":"유저 아이디",
  //   "password": "유저 비밀번호"
  // }
  async signIn(data) {
    const path = "login";

    const response = this.#axios.post(path, data);
    const result = response.result;

    return result;
  }

  async getUserInfo() {
    const path = "/user";

    const response = this.#axios.get(path);
    const result = response.result;

    return result;
  }

  // {
  //   "avatar": [이미지파일],
  //   "nickname": "변경할 닉네임"
  // }
  async updateProfile(data) {
    const path = "/profile";

    const response = this.#axios.patch(path, data);
    const result = response.result;

    return result;
  }
}

export default Auth;
