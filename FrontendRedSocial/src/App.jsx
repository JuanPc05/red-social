import { BrowserRouter, HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { SocialProvider } from "./components/SocialContext";
import MainLayout from "./layouts/MainLayout";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import GroupsPage from "./pages/GroupsPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const Router = import.meta.env.DEV ? BrowserRouter : HashRouter;

  return (
    <SocialProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registro" element={<RegisterPage />} />
          
          {/* Rutas Privadas / Restringidas */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <FeedPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/perfil/:id"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ProfilePage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/post/:postId"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <PostDetailsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/grupos"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <GroupsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <ChatPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/configuracion"
            element={
              <ProtectedRoute>
                <MainLayout>
                  <SettingsPage />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          
          {/* Ruta por defecto para URLs no encontradas */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </SocialProvider>
  );
}
