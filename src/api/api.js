import axios from "axios";
import Auth from "./auth.api";
import Record from "./record.api";

const BASE_URL = "http://localhost:4000";

const AUTH_URL = "https://moneyfulpublicpolicy.co.kr";

class API {
  #axios;

  record;
  auth;

  constructor() {
    this.#axios = axios.create({ baseURL: BASE_URL });
    this.record = new Record(this.#axios);
    this.auth = new Auth(axios.create({ baseURL: AUTH_URL }));
  }
}

const api = new API();

export default api;
