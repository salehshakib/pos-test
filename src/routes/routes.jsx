import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import App from "../App";
import { adminPaths } from "./admin.routes";
import { routeGenerator } from "../utilities/lib/routesGenerator";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
  },
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/manager",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: routeGenerator(adminPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
