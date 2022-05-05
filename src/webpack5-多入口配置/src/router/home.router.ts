import React from "react";
import { RouterConfigItem } from ".";
// import Login from '../pages/Login';
import Home from "../pages/Home";
const configs: RouterConfigItem[] = [
  {
    path: "/home",
    title: "repair",
    // ignoreLogin: true,
    component: Home,
  },
  {
    path: "login",
    title: "applyOne",
    ignoreLogin: true,
    component: React.lazy(() => import("../pages/Login")),
  },
];

export default configs;
