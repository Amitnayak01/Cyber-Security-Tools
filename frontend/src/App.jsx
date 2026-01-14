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

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        {(showToast) => (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login showToast={showToast} />} />

            <Route path="/password" element={<PasswordTool showToast={showToast} />} />
            <Route path="/hash" element={<HashTool showToast={showToast} />} />
            <Route path="/crypto" element={<CryptoTool showToast={showToast} />} />

            <Route path="/url-scanner" element={<ProtectedRoute roles={["analyst","admin"]}><UrlScannerTool showToast={showToast} /></ProtectedRoute>} />
            <Route path="/port-scanner" element={<ProtectedRoute roles={["analyst","admin"]}><PortScannerTool showToast={showToast} /></ProtectedRoute>} />
            <Route path="/whois" element={<ProtectedRoute roles={["analyst","admin"]}><WhoisTool showToast={showToast} /></ProtectedRoute>} />
            <Route path="/virustotal" element={<ProtectedRoute roles={["analyst","admin"]}><VirusTotalTool showToast={showToast} /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute roles={["user","analyst","admin"]}><History showToast={showToast} /></ProtectedRoute>} />

            <Route path="/admin-dashboard" element={<ProtectedRoute roles={["admin"]}><AdminDashboard showToast={showToast} /></ProtectedRoute>} />
            <Route path="/admin-users" element={<ProtectedRoute roles={["admin"]}><AdminUsers showToast={showToast} /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute roles={["admin"]}><Settings showToast={showToast} /></ProtectedRoute>} />
          </Routes>
        )}
      </AppLayout>
    </BrowserRouter>
  );
}
