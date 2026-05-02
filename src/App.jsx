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
      } finally { 
        setLoading(false);
      }
    };
    checkUser();
  }, []);


    if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
  <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />

      <main className="flex-grow py-4 md:py-6 px-3 md:px-6">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default App;
