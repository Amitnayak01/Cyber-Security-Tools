import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./styles/ui.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import setupInterceptors from "./api/setupInterceptors";

function Root() {
  const auth = useAuth();
  React.useEffect(() => {
    setupInterceptors({ refreshAccessToken: auth.refreshAccessToken, logout: auth.logout });
  }, []);
  return <App />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Root />
    </AuthProvider>
  </React.StrictMode>
);
