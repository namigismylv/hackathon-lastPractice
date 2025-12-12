import AdminRoot from "../Pages/Admin/AdminRoot";
import Login from "../Pages/Site/Auth/Login/Login";
import Register from "../Pages/Site/Auth/Register/Register";
import SiteRoot from "../Pages/Site/SiteRoot";
const ROUTES = [
  {
    path: "/",
    element: <SiteRoot />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminRoot />,
    children: [{}],
  },
];
export default ROUTES;
