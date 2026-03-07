import useAuthStore from "../stores/useAuthStore";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const { authUser } = useAuthStore();

  return (
    <>
      {!authUser ? (
        <>
          <NavBar />
          <Outlet />
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Layout;
