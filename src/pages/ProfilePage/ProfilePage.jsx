import { useLoaderData } from "react-router-dom";
import Profile from "../../components/Profile";

function ProfilePage() {
  const userInfo = useLoaderData();
  console.log("userInfo", userInfo);
  return <Profile />;
}

export default ProfilePage;
