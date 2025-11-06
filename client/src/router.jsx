import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from  "./pages/Home"
import App from "./App"
import LoginForm from "./Components/LoginForm";


const router = createBrowserRouter([
    {
        path: "/",
        element : <App></App>,
        children:[
          {index : true, element: <Home></Home> },
          {path: "/login", element : <Login></Login>}
        ]
    }
])
export default router;
