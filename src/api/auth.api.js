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
    console.log("data", data);
    const response = await this.#axios.post(path, data);
    const result = response;

    return result;
  }
  // {
  //   "id":"유저 아이디",
  //   "password": "유저 비밀번호"
  // }
  async signIn(data) {
    const path = "/login";
    console.log("data", data);
    const response = await this.#axios.post(path, data);
    const result = response;
    console.log("response", response);

    return result;
  }

  async getUserInfo() {
    const path = "/user";

    const response = await this.#axios.get(path);
    const result = response;

    return result;
  }

  // {
  //   "avatar": [이미지파일],
  //   "nickname": "변경할 닉네임"
  // }
  async updateProfile(data) {
    const path = "/profile";

    const response = await this.#axios.patch(path, data);
    const result = response.result;

    return result;
  }
}

export default Auth;