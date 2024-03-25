import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import HomeDashboard from "../pages/Dashboard/HomeDashboard/HomeDashboard";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <MainLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <HomeDashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
