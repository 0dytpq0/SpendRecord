class Record {
  #axios;

  constructor(axios) {
    this.#axios = axios;
  }

  async getRecord() {
    const path = `/records`;

    const response = await this.#axios.get(path);
    const result = response.data;

    const sortedRecord = () =>
      [...result].sort(
        (recordA, recordB) => new Date(recordB.date) - new Date(recordA.date)
      );
    return sortedRecord();
  }

  async postRecord(data) {
    const path = `/records`;
    const response = await this.#axios.post(path, data);
    const result = response.data;

    return result;
  }

  async deleteRecord(id) {
    const path = `/records/${id}`;
    console.log("id", id);
    const response = await this.#axios.delete(path);
    const result = response.data;

    return result;
  }

  async updateRecord(id, data) {
    const path = `/records/${id}`;
    const response = await this.#axios.patch(path, data);
    const result = response.data;

    return result;
  }
}

export default Record;
