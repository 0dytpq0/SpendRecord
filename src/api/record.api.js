class Record {
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  async getRecord() {
    const path = `/record`;

    const response = await this.#axios.get(path);
    const result = response.data;

    const sortedRecord = () =>
      [...result].sort(
        (recordA, recordB) => new Date(recordB.date) - new Date(recordA.date)
      );
    return sortedRecord();
  }

  async postRecord(data) {
    const path = `/record`;
    console.log("data", data);
    const response = await this.#axios.post(path, data);
    const result = response.data;

    return result;
  }

  async deleteRecord(id) {
    const path = `/record/${id}`;
    console.log("id", id);
    const response = await this.#axios.delete(path);
    const result = response.data;

    return result;
  }

  async updateRecord(id, data) {
    const path = `/record/${id}`;
    console.log("data", data, id);
    const response = await this.#axios.patch(path, data);
    const result = response.data;

    console.log("result", result);
  }
}

export default Record;
