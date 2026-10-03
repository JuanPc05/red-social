import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { getPostById } from "../services/api";
import Post from "../components/Post";
import ProfileSidebar from "../components/ProfileSidebar";
import RightSidebar from "../components/RightSidebar";

export default function PostDetailsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPostById(postId).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, [postId]);

  if (loading) {
    return (
      <div className="w3-row">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white w3-padding-32 w3-center w3-margin">
            <i className="fa fa-spinner fa-spin w3-xxlarge w3-text-theme"></i>
            <p>Buscando publicación...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w3-row">
        <div className="w3-col m12">
          <div className="w3-card w3-round w3-white w3-padding w3-center">
            <h2>Publicación no encontrada</h2>
            <p>La publicación que buscas no existe o ha sido eliminada.</p>
            <Link to="/" className="w3-button w3-theme">Volver al inicio</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w3-row">
      {/* Columna Izquierda (opcional para mantener la consistencia) */}
      <ProfileSidebar />

      {/* Columna Central con el Post en detalle */}
      <div className="w3-col m7">
        <Post post={post} />
      </div>

      {/* Columna Derecha */}
      <RightSidebar />
    </div>
  );
}
