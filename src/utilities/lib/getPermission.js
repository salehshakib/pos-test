import { useSelector } from 'react-redux';

import { useCurrentUser } from '../../redux/services/auth/authSlice';

function getMenuItems(rolePermissions) {
  const firstParts = rolePermissions.map((permission) =>
    permission.name.split('.')[0].replace(/-/g, '')
  );

  const menuItems = Array.from(new Set(firstParts));

  return menuItems;
}

function filterPaths(paths, uniqueItems) {
  const parentStructure = {};

  paths.forEach((item) => {
    const modifiedPath = item.path.replace(/-/g, '');

    if (uniqueItems.includes(modifiedPath)) {
      if (item.children) {
        const children = [];
        item.children.forEach((child) => {
          const childModifiedPath = child.path.replace(/-/g, '');

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
    } else if (modifiedPath === 'dashboard') {
      parentStructure[item.path] = [];
    } else if (item.children) {
      const childNames = [];
      item.children.forEach((child) => {
        const childModifiedPath = child.path.replace(/-/g, '');
        if (uniqueItems.includes(childModifiedPath)) {
          childNames.push(child.path);
        }

        if (childModifiedPath === 'printbarcode') {
          childNames.push('print-barcode');
        }
      });
      if (childNames.length > 0) {
        parentStructure[item.path] = childNames;
      }
    }
  });

  return parentStructure;
}

const ACTION_KEYS = [
  'accesstoken.issueToken',
  'authorization.authorize',
  'transienttoken.refresh',
  'approveauthorization.approve',
  'denyauthorization.deny',
  'authorizedaccesstoken.forUser',
  'authorizedaccesstoken.destroy',
  'client.forUser',
  'scope.all',
  'personalaccesstoken.forUser',
  'personalaccesstoken.store',
  'personalaccesstoken.destroy',
  'csrfcookie.show',
  'handlerequests.handleUpdate',
  'frontendassets.returnJavaScriptAsFile',
  'frontendassets.maps',
  'fileupload.handle',
  'filepreview.handle',
];

export function useMenuItems(adminPaths) {
  const userData = useSelector(useCurrentUser);
  const rolePermissions = userData?.roles?.[0]?.permissions || [];

  const filteredRolePermissions = rolePermissions.filter(
    (permission) => !ACTION_KEYS.includes(permission)
  );

  const uniqueItems = getMenuItems(filteredRolePermissions);

  if (uniqueItems.length) {
    const filteredStructure = filterPaths(adminPaths, uniqueItems);

    return filteredStructure;
  } else {
    return {};
  }
}

const hasPermission = (permissions, route, moduleName) => {
  return permissions.some(
    (permission) => permission.name === `${route}.${moduleName}`
  );
};

export function usePermission(route, moduleName) {
  const userData = useSelector(useCurrentUser);
  const rolePermissions = userData?.roles?.[0]?.permissions || [];

  const isAdmin = userData?.roles?.[0]?.name === 'Admin';

  if (isAdmin) {
    return true;
  }

  const cleanedRoute =
    route?.split('/').length > 1
      ? route?.split('/').slice(1, 2)[0].split('-').join('')
      : route;

  const isPermitted = hasPermission(rolePermissions, cleanedRoute, moduleName);

  return isPermitted;
}

export function useUrlIndexPermission(pathName) {
  const route = pathName
    ? 'route/' + pathName
    : window.location.pathname.substring(1);

  return usePermission(route, 'index');
}
