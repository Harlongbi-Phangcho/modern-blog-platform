import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login as storeLogin, logout as storeLogout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const userData = await authService.getCurrentUser();

        if (userData) {
          dispatch(
            storeLogin({
              id: userData.$id,
              email: userData.email,
              name: userData.name,
            }),
          );
        } else {
          dispatch(storeLogout());
        }
      } catch (error) {
        console.error("Failed to fetch userData", error);
      }
    };
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-[80vh] py-2 md:py-6 px-2 md:px-4 bg-gradient-to-r from-cyan-500 to-blue-300">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
