import React from "react";
import { createRoot } from "react-dom/client";
import App from "../../pages/App";
import { HashRouter } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <HashRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </HashRouter>
);
