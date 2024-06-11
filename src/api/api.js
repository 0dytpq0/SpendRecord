import axios from "axios";
import Record from "./record.api";

const BASE_URL = "http://localhost:4000/";

class API {
  #axios;

  record;

  constructor() {
    this.#axios = axios.create({ baseURL: BASE_URL });
    this.record = new Record(this.#axios);
  }
}

const api = new API();

export default api;
