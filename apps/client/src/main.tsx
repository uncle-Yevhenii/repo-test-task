import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./apollo-client";

import "./index.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Fatal: Can't find root element to mount the app.");
}

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
