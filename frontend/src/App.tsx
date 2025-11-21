import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import AuthLayout from "./components/auth/AuthLayout";
import { useAppSelector } from "./store/hooks/hooks";

const App = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <>
    
    </>
  )
}

export default App;