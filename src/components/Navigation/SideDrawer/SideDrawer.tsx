import React, { useState, useEffect } from "react";
import { useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { Drawer, DrawerContent } from "@progress/kendo-react-layout";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import DrawerNavItem from "./DrawerNavItem/DrawerNavItem";

import { SideDrawerInterface } from "../models/interfaces/SideDrawer.interface";

export const SideDrawer: React.FC<SideDrawerInterface> = ({ breadcrumbs, routes, userPermissions, children, expanded = true, userManualLinks }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const [isDrawerExpanded, setIsDrawerExpanded] = useState(expanded);
  const [navItems, setNavItems] = useState(
    routes.filter((route) => !(route.permissions && !route.permissions.some((permission) => userPermissions.includes(permission))))
  );
  const updateRoutes = (routes, path, routeIndex) => {
    const routeOn = routes.find((val) => val.route === path);
    const parent = routeOn && routes.find((val) => val.id === routeOn.parentId);
    const grandParent = parent && routes.find((val) => val.id === parent.parentId);

    return routes
      .filter((route) => !(route.permissions && !route.permissions.some((permission) => userPermissions.includes(permission))))
      .reduce((acc, route, index) => {
        const parentExpanded = !route.parentId || acc.find((a) => a.id === route.parentId)["data-expanded"];
        if (route.hasOwnProperty("separator")) {
          acc.push(route);
        } else if (route.hasOwnProperty("data-expanded")) {
          acc.push({
            ...route,
            "data-expanded":
              routeIndex != null
                ? routeIndex === index
                  ? !route["data-expanded"]
                  : route["data-expanded"]
                : (parent && route.id === parent.id) || (grandParent && route.id === grandParent.id),
            visible: parentExpanded,
          });
        } else {
          acc.push({
            ...route,
            selected: route.route === path || route.route === history.location.pathname,
            visible: parentExpanded,
          });
        }
        return acc;
      }, []);
  };

  const onSelect = ({ itemTarget, itemIndex }) => {
    if (itemTarget.props.name === "close") {
      setIsDrawerExpanded(!isDrawerExpanded);
    } else if (itemTarget.props.selected) return;
    else if (!itemTarget.props.route) {
      setNavItems((prevRoutes) => updateRoutes(prevRoutes, itemTarget.props.route, itemIndex));
    } else {
      history.push(itemTarget.props.route);
    }
  };

  useEffect(() => setNavItems((prevRoutes) => updateRoutes(prevRoutes, history.location.pathname, null)), [location.pathname]);

  return (
    <Drawer
      expanded={isDrawerExpanded}
      mode="push"
      mini={true}
      miniWidth={45}
      items={[
        ...navItems,
        {
          text: "Collapse sidebar",
          name: "close",
          visible: true,
          id: 100,
          icon: isDrawerExpanded ? "fas fa-angle-double-left" : "fas fa-angle-double-right",
        },
      ]}
      item={DrawerNavItem}
      onSelect={onSelect}
    >
      <DrawerContent>
        {breadcrumbs && <Breadcrumbs match={match} location={location} userManualLinks={userManualLinks} />}
        {children}
      </DrawerContent>
    </Drawer>
  );
};
