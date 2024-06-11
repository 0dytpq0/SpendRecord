import api from "../api/api";

export default async function HomePageLoader() {
  const data = await api.record.getRecord();
  console.log("data", data);
  return data;
}
