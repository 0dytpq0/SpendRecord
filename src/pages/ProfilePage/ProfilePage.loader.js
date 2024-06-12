import api from "../../api/api";

export default async function ProfilePageLoader() {
  const data = await api.auth.getUserInfo();
  return data;
}
