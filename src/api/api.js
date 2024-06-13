import axios from "axios";
import Auth from "./auth.api";
import Record from "./record.api";

const BASE_URL = "https://spot-notch-fox.glitch.me";

const AUTH_URL = "https://moneyfulpublicpolicy.co.kr";

class API {
  #axios;

  record;
  auth;

  constructor() {
    this.#axios = axios.create({ baseURL: BASE_URL });
    this.record = new Record(this.#axios);
    this.auth = new Auth(axios.create({ baseURL: AUTH_URL }));

    // this.#axios.interceptors.request.use(
    //   async (config) => {
    //     await this.auth.getUserInfo();

    //     return config;
    //   },
    //   (error) => {
    //     return error;
    //   }
    // );
  }
}

const api = new API();

export default api;
