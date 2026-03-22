import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./login";
import GeneratorChecklist from "./pages/GeneratorChecklist";
import GsuTransformerChecklist from "./pages/GsuTransformerChecklist";
import IctTransformerChecklist from "./pages/IctTransformerChecklist";
import ShuntChecklist from "./pages/ShuntChecklist";
import UserProfile from "./pages/userProfile";
import UsefulLinks from "./pages/UsefulLinks";
import Setting from "./pages/Setting";
import TeamPage from "./pages/Team";
import BearingChecklistPage from "./pages/BearringChecklist";

// Import both Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";

export default function App() {
  return (
    <BrowserRouter basename="/MHP-EMU">
      <div className="bg-gray-900 min-h-screen">
        <Routes>
          {/* GUEST ONLY ROUTE: Logged in users get redirected to "/" */}
          <Route path="/login" element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          } />
          
          {/* TOTALLY PUBLIC ROUTE: Anyone can see this */}
          <Route path="/useful_links" element={<UsefulLinks />} />

          {/* PROTECTED ROUTES: Users must be logged in to see these */}
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

          <Route path="/bearing" element={
            <ProtectedRoute>
              <BearingChecklistPage />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}