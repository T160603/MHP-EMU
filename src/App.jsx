import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./login";
import GeneratorChecklist from "./pages/GeneratorChecklist";
import GsuTransformerChecklist from "./pages/GsuTransformerChecklist";
import IctTransformerChecklist from "./pages/IctTransformerChecklist";
import ProtectedRoute from "./components/ProtectedRoute";
import ShuntChecklist from "./pages/ShuntChecklist";
import UserProfile from "./pages/userProfile";
import UsefulLinks from "./pages/UsefulLinks";
import Setting from "./pages/Setting";
import TeamPage from "./pages/Team";

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-gray-900 min-h-screen">
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/useful_links" element={<UsefulLinks />} />

          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          
          <Route path="/generator" element={
            <ProtectedRoute>
              <GeneratorChecklist />
            </ProtectedRoute>
          } />

          <Route path="/gsu-transformer" element={
            <ProtectedRoute>
              <GsuTransformerChecklist />
            </ProtectedRoute>
          } />

          <Route path="/shunt-reactor" element={
            <ProtectedRoute>
              <ShuntChecklist />
            </ProtectedRoute>
          } />

          <Route path="/interconnected-transformer" element={
            <ProtectedRoute>
              <IctTransformerChecklist />
            </ProtectedRoute>
          } />
          <Route path="/Profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/Setting" element={
            <ProtectedRoute>
              <Setting />
            </ProtectedRoute>
          } />
          <Route path="/Team" element={
            <ProtectedRoute>
              <TeamPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}