import React, { useEffect, useState } from "react";
import "./test.css";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Auth from "@/components/Auth";
import routerConfig from "@/router/index";
import Blank from "../components/Layout/Blank";
function App(props: any) {
  const { pathname } = useLocation();
  useEffect(() => {
    console.log("页面切换", pathname);
  }, [pathname]);
  return (
    <React.Suspense fallback={<div />}>
      <Routes>
        <Route element={<Blank />}>
          {routerConfig.map((ele, index: number) => {
            return Auth(ele, index, props);
          })}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Route>
      </Routes>
    </React.Suspense>
  );
}

export default App;
