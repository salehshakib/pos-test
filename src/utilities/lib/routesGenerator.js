// export const routeGenerator = (items) => {
//   const routes = items.reduce((acc, item) => {
//     // if (item.path && item.element) {
//     if (!item.children) {
//       acc.push({
//         path: item.path,
//         element: item.element,
//       });
//     }

//     if (item.children) {
//       item.children.forEach((child) => {
//         acc.push({
//           path: `${item.path}/${child.path}`,
//           element: child.element,
//         });
//       });
//     }

//     return acc;
//   }, []);

//   return routes;
// };

export const routeGenerator = (items, parentPath = "") => {
  const routes = items.reduce((acc, item) => {
    const currentPath = `${parentPath}/${item.path}`.replace(/\/+/g, "/");

    // Add the route for the current item
    if (item.element) {
      acc.push({
        path: currentPath,
        element: item.element,
      });
    }

    // Recursively add routes for children
    if (item.children) {
      acc.push(...routeGenerator(item.children, currentPath));
    }

    return acc;
  }, []);

  return routes;
};
