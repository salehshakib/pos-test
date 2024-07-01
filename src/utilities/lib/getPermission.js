import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/services/auth/authSlice";

const hasPermission = (permissions, route, moduleName) => {
  return permissions.some(
    (permission) => permission.name === `${route}.${moduleName}`
  );
};

export const usePermission = (route, moduleName) => {
  const userData = useSelector(useCurrentUser);
  const rolePermissions = userData?.roles?.[0]?.permissions || [];

  // console.table(rolePermissions);

  const cleanedRoute = route?.split("/").slice(1, 2)[0];

  console.log(route, moduleName);

  const isPermitted = hasPermission(rolePermissions, cleanedRoute, moduleName);

  return isPermitted;
};

export const useUrlIndexPermission = () => {
  const route = window.location.pathname.substring(1);

  return usePermission(route, "index");
};
