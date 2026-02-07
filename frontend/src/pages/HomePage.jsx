import { useEffect } from "react";
import useAuthStore from "../stores/useAuthStore";

const HomePage = () => {
  const { getCurrentUser, authUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  });

  return <div className="bg-[#250061] p-5 text-white">{authUser}</div>;
};

export default HomePage;
