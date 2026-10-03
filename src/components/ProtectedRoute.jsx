import { Navigate } from "react-router-dom";
import { useSocial } from "./SocialContext"; // Supongamos que añadimos currentUser al contexto

export default function ProtectedRoute({ children }) {
  // Aquí comprobamos si el usuario está autenticado. 
  // Por ahora lo simularemos usando el contexto o un valor estático.
  const { currentUser } = useSocial();
  
  // Si no hay usuario, lo mandamos al login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario, mostramos la vista solicitada (children)
  return children;
}
