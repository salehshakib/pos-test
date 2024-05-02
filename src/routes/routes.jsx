import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import { routeGenerator } from "../utilities/lib/routesGenerator";
import { adminPaths } from "./admin.routes";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  // {
  //   path: "/",
  //   element: (
  //     <PrivateRoute>
  //       <App />
  //     </PrivateRoute>
  //   ),
  // },
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
    path: "/login",
    element: <Login />,
  },
]);
