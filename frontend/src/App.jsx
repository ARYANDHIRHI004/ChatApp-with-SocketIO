import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import { Toaster } from "react-hot-toast";
import UsersList from "./pages/UsersList";
import useAuthStore from "./stores/useAuthStore";
import SignUp from "./pages/SignUp";
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";

function App() {

 const { getCurrentUser, authUser } = useAuthStore();

  useEffect(() => {
    getCurrentUser();
  },[getCurrentUser]);


  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={!authUser ? <HomePage /> : <UsersList />} />
          <Route path="/sign-up" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
          <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
