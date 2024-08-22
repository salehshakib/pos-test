// import React from "react";
// import { NavLink } from "react-router-dom";

// export const sidebarItemsGenerator = (items) => {
//   const sidebarItems = items.reduce((acc, item) => {
//     // if (item.path && item.name) {
//     if (!item.children) {
//       acc.push({
//         key: item.name,
//         icon:
//           item?.icon &&
//           React.createElement(item?.icon, {
//             className: "size-5",
//           }),
//         label: (
//           <NavLink
//             className={({ isActive }) => (isActive ? "font-bold" : "")}
//             to={`/${item.path}`}
//           >
//             {item.name}
//           </NavLink>
//         ),
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         icon:
//           item?.icon &&
//           React.createElement(item?.icon, {
//             className: "size-5",
//           }),
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           icon:
//             child?.icon &&
//             React.createElement(child?.icon, {
//               className: "size-5",
//             }),
//           label: (
//             <NavLink
//               className={({ isActive }) => (isActive ? "font-bold" : "")}
//               to={`/${item.path}/${child.path}`}
//             >
//               {child.name}
//             </NavLink>
//           ),
//         })),
//       });
//     }

//     return acc;
//   }, []);

//   return sidebarItems;
// };

import React from 'react';
import { NavLink } from 'react-router-dom';

export const sidebarItemsGenerator = (items, parentPath = '') => {
  const sidebarItems = items.reduce((acc, item) => {
    const currentPath = `${parentPath}/${item.path}`.replace(/\/+/g, '/');

    const newItem = {
      key: item.name,
      type: item?.type,
      icon:
        item?.icon &&
        React.createElement(item?.icon, {
          className: 'size-4 lg:size-5',
        }),
      label: item.children ? (
        <span className="text-xs lg:text-sm">{item.name}</span>
      ) : (
        <NavLink
          className={({ isActive }) =>
            isActive ? 'font-bold text-xs lg:text-sm' : 'text-xs lg:text-sm'
          }
          to={currentPath}
        >
          {item.name}
        </NavLink>
      ),
    };

    if (item.children) {
      newItem.children = sidebarItemsGenerator(item.children, currentPath);
    }

    acc.push(newItem);
    return acc;
  }, []);

  return sidebarItems;
};
