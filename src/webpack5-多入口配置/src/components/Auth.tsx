import React from "react";
import { RouterConfigItem } from "../router/index";
import { Route, Navigate } from "react-router-dom";
const Auth = (Item: RouterConfigItem, index: number, props: any) => {
  const token = "1"; // localStorage.getItem("currentToken");
  document.title = "页面标题-" + Item.title;

  if (Item.ignoreLogin) {
    return (
      <Route
        key={`${Item.path}-${index}`}
        path={Item.path}
        element={<Item.component {...props} />}
      />
    );
  } else {
    if (token) {
      return (
        <Route
          key={`${Item.path}-${index}`}
          path={Item.path}
          element={<Item.component {...props} />}
        />
      );
    } else {
      return (
        <Route
          path={Item.path}
          key={`${Item.path}-${index}`}
          element={<Navigate to="/login" replace />}
        />
      );
    }
  }
};

export default Auth;
