import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from  "./pages/Home"
import App from "./App"
import NewListing from "./pages/NewListing";
import Show from "./pages/Show";
import EditForm from "./pages/EditForm";
import ProtectedRoutes from "./Context/ProtectedRoutes";


const router = createBrowserRouter([
    {
        path: "/",
        element : <App></App>,
        children:[
          {index : true, element: <Home></Home> },
          {path: "/login", element : <Login></Login>},
           {path: "/new_listing", element :<ProtectedRoutes> <NewListing /></ProtectedRoutes>},
           {path: "/listing/:id", element : <ProtectedRoutes> <Show /></ProtectedRoutes>},
           {path: "/listing/edit/:id",element: <ProtectedRoutes> <EditForm /></ProtectedRoutes>}

        ]
    }
])
export default router;
