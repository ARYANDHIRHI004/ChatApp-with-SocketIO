import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Layout from "./components/Layout";
import WelcomePage from "./pages/WelcomePage";
import { Toaster } from "react-hot-toast";

function App() {
  const AuthUser = true;

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={AuthUser ? <HomePage /> : <WelcomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
