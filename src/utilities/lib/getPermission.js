import { useSelector } from "react-redux";
import { useCurrentUser } from "../../redux/services/auth/authSlice";

// function getMenuItems(rolePermissions) {
//   const firstParts = rolePermissions.map(
//     (permission) => permission.name.split(".")[0]
//   );

//   const menuItems = Array.from(new Set(firstParts));

//   return menuItems;
// }

// function filterPaths(paths, rolePermissions) {
//   const filteredPaths = paths.filter((item) => {
//     const modifiedPath = item.path.split("-").join("");

//     if (rolePermissions?.includes(modifiedPath)) {
//       return true;
//     }

//     if (modifiedPath === "dashboard" || modifiedPath === "printbarcode") {
//       return true;
//     }

//     if (item.children) {
//       item.children = filterPaths(item.children, rolePermissions);
//       return item.children.length > 0;
//     }
//     return false;
//   });

//   return filteredPaths;
// }

// export const useMenuItems = (adminPaths) => {
//   const userData = useSelector(useCurrentUser);
//   const rolePermissions = userData?.roles?.[0]?.permissions || [];

//   // const permissionsWithUnit = rolePermissions
//   //   .filter((permission) => permission.name.includes("dashboard"))
//   //   .map((permission) => permission.name);

//   // console.table(permissionsWithUnit);

//   const uniqueItems = getMenuItems(rolePermissions);

//   if (uniqueItems.length) {
//     return filterPaths(adminPaths, uniqueItems);
//   } else {
//     return [];
//   }
// };

// function getMenuItems(rolePermissions) {
//   const firstParts = rolePermissions.map((permission) =>
//     permission.name.split(".")[0].replace(/-/g, "")
//   );

//   const menuItems = Array.from(new Set(firstParts));

//   return menuItems;
// }

// function filterPaths(paths, rolePermissions) {
//   const parentPaths = [];

//   paths.forEach((item) => {
//     const modifiedPath = item.path.replace(/-/g, "");

//     if (rolePermissions.includes(modifiedPath)) {
//       parentPaths.push(item.path);
//       return;
//     }

//     if (modifiedPath === "printbarcode") {
//       parentPaths.push(item.path);
//       return;
//     }

//     if (item.children) {
//       const childPaths = filterPaths(item.children, rolePermissions);
//       if (childPaths.length > 0) {
//         parentPaths.push(item.path);
//       }
//     }
//   });

//   return parentPaths;
// }

// export const useMenuItems = (adminPaths) => {
//   const userData = useSelector(useCurrentUser);
//   const rolePermissions = userData?.roles?.[0]?.permissions || [];

//   const permissionsWithUnit = rolePermissions
//     .filter((permission) => permission.name.includes("dashboard"))
//     .map((permission) => permission.name);

//   console.table(permissionsWithUnit);

//   const uniqueItems = getMenuItems(rolePermissions);

//   if (uniqueItems.length) {
//     return filterPaths(adminPaths, uniqueItems);
//   } else {
//     return [];
//   }
// };

// function getMenuItems(rolePermissions) {
//   const firstParts = rolePermissions.map((permission) =>
//     permission.name.split(".")[0].replace(/-/g, "")
//   );

//   const menuItems = Array.from(new Set(firstParts));

//   return menuItems;
// }

// function filterPaths(paths, rolePermissions) {
//   const parentNames = [];

//   paths.forEach((item) => {
//     const modifiedPath = item.path.replace(/-/g, "");

//     if (rolePermissions.includes(modifiedPath)) {
//       parentNames.push(item.name);
//       return;
//     }

//     if (modifiedPath === "printbarcode") {
//       parentNames.push(item.name);
//       return;
//     }

//     if (item.children) {
//       const childNames = filterPaths(item.children, rolePermissions);
//       if (childNames.length > 0) {
//         parentNames.push(item.name);
//       }
//     }
//   });

//   return parentNames;
// }

// export const useMenuItems = (adminPaths) => {
//   const userData = useSelector(useCurrentUser);
//   const rolePermissions = userData?.roles?.[0]?.permissions || [];

//   // const permissionsWithUnit = rolePermissions
//   //   .filter((permission) => permission.name.includes("dashboard"))
//   //   .map((permission) => permission.name);

//   // console.table(permissionsWithUnit);

//   const uniqueItems = getMenuItems(rolePermissions);

//   console.log(uniqueItems);

//   if (uniqueItems.length) {
//     return filterPaths(adminPaths, uniqueItems);
//   } else {
//     return [];
//   }
// };

// function getMenuItems(rolePermissions) {
//   const firstParts = rolePermissions.map((permission) =>
//     permission.name.split(".")[0].replace(/-/g, "")
//   );

//   const menuItems = Array.from(new Set(firstParts));

//   return menuItems;
// }

// function filterPaths(paths, rolePermissions) {
//   const parentStructure = {};

//   paths.forEach((item) => {
//     const modifiedPath = item.path.replace(/-/g, "");

//     if (rolePermissions.includes(modifiedPath)) {
//       parentStructure[item.name] = [];
//       if (item.children) {
//         item.children.forEach((child) => {
//           const childModifiedPath = child.path.replace(/-/g, "");
//           if (rolePermissions.includes(childModifiedPath)) {
//             parentStructure[item.name].push(child.name);
//           }
//         });
//       }
//     } else if (item.children) {
//       const childStructure = filterPaths(item.children, rolePermissions);
//       if (Object.keys(childStructure).length > 0) {
//         parentStructure[item.name] = childStructure;
//       }
//     }
//   });

//   return parentStructure;
// }

// export const useMenuItems = (adminPaths) => {
//   const userData = useSelector(useCurrentUser);
//   const rolePermissions = userData?.roles?.[0]?.permissions || [];

//   const uniqueItems = getMenuItems(rolePermissions);

//   if (uniqueItems.length) {
//     const filteredStructure = filterPaths(adminPaths, uniqueItems);
//     return filteredStructure;
//   } else {
//     return {};
//   }
// };

// function getMenuItems(rolePermissions) {
//   const firstParts = rolePermissions.map((permission) =>
//     permission.name.split(".")[0].replace(/-/g, "")
//   );

//   const menuItems = Array.from(new Set(firstParts));

//   return menuItems;
// }

// function filterPaths(paths, rolePermissions) {
//   const parentStructure = {};

//   paths.forEach((item) => {
//     const modifiedPath = item.path.replace(/-/g, "");

//     if (rolePermissions.includes(modifiedPath)) {
//       const childrenStructure = item.children
//         ? filterPaths(item.children, rolePermissions)
//         : {};
//       parentStructure[item.name] =
//         Object.keys(childrenStructure).length > 0 ? childrenStructure : [];
//     } else if (item.children) {
//       const childStructure = filterPaths(item.children, rolePermissions);
//       if (Object.keys(childStructure).length > 0) {
//         parentStructure[item.name] = childStructure;
//       }
//     }
//   });

//   return parentStructure;
// }

// export const useMenuItems = (adminPaths) => {
//   const userData = useSelector(useCurrentUser);
//   const rolePermissions = userData?.roles?.[0]?.permissions || [];

//   const uniqueItems = getMenuItems(rolePermissions);

//   if (uniqueItems.length) {
//     const filteredStructure = filterPaths(adminPaths, uniqueItems);

//     console.log(filteredStructure);
//     return filteredStructure;
//   } else {
//     return {};
//   }
// };

function getMenuItems(rolePermissions) {
  const firstParts = rolePermissions.map((permission) =>
    permission.name.split(".")[0].replace(/-/g, "")
  );

  const menuItems = Array.from(new Set(firstParts));

  // console.log(menuItems);

  return menuItems;
}

function filterPaths(paths, uniqueItems) {
  const parentStructure = {};

  paths.forEach((item) => {
    const modifiedPath = item.path.replace(/-/g, "");

    // console.log(modifiedPath);

    if (uniqueItems.includes(modifiedPath)) {
      if (item.children) {
        const children = [];
        item.children.forEach((child) => {
          const childModifiedPath = child.path.replace(/-/g, "");

          if (uniqueItems.includes(childModifiedPath)) {
            children.push(child.path);
          }
        });
        if (children.length > 0) {
          parentStructure[item.path] = children;
        }
      } else {
        parentStructure[item.path] = [];
      }
    } else if (modifiedPath === "dashboard") {
      parentStructure[item.path] = [];
    } else if (item.children) {
      const childNames = [];
      item.children.forEach((child) => {
        const childModifiedPath = child.path.replace(/-/g, "");
        if (uniqueItems.includes(childModifiedPath)) {
          childNames.push(child.path);
        }

        if (childModifiedPath === "printbarcode") {
          childNames.push("print-barcode");
        }

        // console.log(childModifiedPath);
      });
      if (childNames.length > 0) {
        parentStructure[item.path] = childNames;
      }
    }
  });

  return parentStructure;
}

export const useMenuItems = (adminPaths) => {
  const userData = useSelector(useCurrentUser);
  const rolePermissions = userData?.roles?.[0]?.permissions || [];

  const uniqueItems = getMenuItems(rolePermissions);

  if (uniqueItems.length) {
    const filteredStructure = filterPaths(adminPaths, uniqueItems);

    return filteredStructure;
  } else {
    return {};
  }
};

const hasPermission = (permissions, route, moduleName) => {
  return permissions.some(
    (permission) => permission.name === `${route}.${moduleName}`
  );
};

export const usePermission = (route, moduleName) => {
  const userData = useSelector(useCurrentUser);
  const rolePermissions = userData?.roles?.[0]?.permissions || [];

  // console.log(rolePermissions);

  // const permissionsWithUnit = rolePermissions
  //   .filter((permission) => permission.name.includes("unit"))
  //   .map((permission) => permission.name);

  // console.table(permissionsWithUnit);

  const cleanedRoute =
    route?.split("/").length > 1
      ? route?.split("/").slice(1, 2)[0].split("-").join("")
      : route;

  const isPermitted = hasPermission(rolePermissions, cleanedRoute, moduleName);

  return isPermitted;
};

export const useUrlIndexPermission = (pathName) => {
  const route = pathName
    ? "route/" + pathName
    : window.location.pathname.substring(1);

  return usePermission(route, "index");
};
