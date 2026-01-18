import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PasswordTool from "./pages/PasswordTool";
import HashTool from "./pages/HashTool";
import CryptoTool from "./pages/CryptoTool";
import UrlScannerTool from "./pages/UrlScannerTool";
import PortScannerTool from "./pages/PortScannerTool";
import WhoisTool from "./pages/WhoisTool";
import VirusTotalTool from "./pages/VirusTotalTool";
import History from "./pages/History";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import Settings from "./pages/Settings";

import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import Forbidden from "./pages/Forbidden";

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        {(showToast, layout) => (
          <Routes>
            <Route path="/" element={<Dashboard layout={layout} />} />
            <Route path="/login" element={<Login showToast={showToast} layout={layout} />} />

            <Route path="/password" element={<PasswordTool showToast={showToast} layout={layout} />} />
            <Route path="/hash" element={<HashTool showToast={showToast} layout={layout} />} />
            <Route path="/crypto" element={<CryptoTool showToast={showToast} layout={layout} />} />

            <Route
              path="/url-scanner"
              element={
                <ProtectedRoute roles={["analyst", "admin"]}>
                  <UrlScannerTool showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/port-scanner"
              element={
                <ProtectedRoute roles={["analyst", "admin"]}>
                  <PortScannerTool showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/whois"
              element={
                <ProtectedRoute roles={["analyst", "admin"]}>
                  <WhoisTool showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/virustotal"
              element={
                <ProtectedRoute roles={["analyst", "admin"]}>
                  <VirusTotalTool showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/history"
              element={
                <ProtectedRoute roles={["user", "analyst", "admin"]}>
                  <History showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminDashboard showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <AdminUsers showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute roles={["admin"]}>
                  <Settings showToast={showToast} layout={layout} />
                </ProtectedRoute>
              }
            />

            {/* Error Routes */}
            <Route path="/403" element={<Forbidden layout={layout} />} />
            <Route path="*" element={<NotFound layout={layout} />} />
          </Routes>
        )}
      </AppLayout>
    </BrowserRouter>
  );
}
