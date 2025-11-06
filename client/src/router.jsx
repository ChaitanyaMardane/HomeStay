import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Home from  "./pages/Home"
import App from "./App"
import NewListing from "./pages/NewListing";
import Show from "./pages/Show";
import EditForm from "./pages/EditForm";


const router = createBrowserRouter([
    {
        path: "/",
        element : <App></App>,
        children:[
          {index : true, element: <Home></Home> },
          {path: "/login", element : <Login></Login>},
           {path: "/new_listing", element : <NewListing />},
           {path: "/listing/:id", element : <Show />},
           {path: "/listing/edit/:id",element: <EditForm/>}

        ]
    }
])
export default router;
