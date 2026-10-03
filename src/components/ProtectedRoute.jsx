import { Navigate } from "react-router-dom";
import { useSocial } from "./SocialContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useSocial();
  
  // Si no hay usuario, lo mandamos al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, mostramos la vista solicitada (children)
  return children;
}
