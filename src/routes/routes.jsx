import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Brand from "../pages/Dashboard/PosRegister/Brand";
import Category from "../pages/Dashboard/PosRegister/Category";
import Featured from "../pages/Dashboard/PosRegister/Featured";
import Login from "../pages/Login/Login";
import Pos from "../Pos";
import { routeGenerator } from "../utilities/lib/routesGenerator";
import { adminPaths } from "./admin.routes";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/pos",
    element: (
      <PrivateRoute>
        <Pos />
      </PrivateRoute>
    ),
    children: [
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "brand",
        element: <Brand />,
      },
      {
        path: "featured",
        element: <Featured />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
