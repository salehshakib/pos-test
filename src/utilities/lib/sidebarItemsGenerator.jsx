import React from "react";
import { NavLink } from "react-router-dom";

export const sidebarItemsGenerator = (items, role) => {
  const sidebarItems = items.reduce((acc, item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.name,
        icon: React.createElement(item.icon, {
          className: "size-5",
        }),
        label: (
          <NavLink
            className={({ isActive }) => (isActive ? "font-bold" : "")}
            to={`/${role}/${item.path}`}
          >
            {item.name}
          </NavLink>
        ),
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        icon: React.createElement(item.icon, {
          className: "size-5",
        }),
        label: item.name,
        children: item.children.map((child) => ({
          key: child.name,
          icon: React.createElement(item.icon, {
            className: "size-5",
          }),
          label: (
            <NavLink
              className={({ isActive }) => (isActive ? "font-bold" : "")}
              to={`/${role}/${child.path}`}
            >
              {child.name}
            </NavLink>
          ),
        })),
      });
    }

    return acc;
  }, []);

  return sidebarItems;
};
