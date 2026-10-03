import { useParams } from "react-router-dom";
import { useSocial } from "../components/SocialContext";
import Post from "../components/Post";

export default function ProfilePage() {
  const { username } = useParams();
  const { currentUser, posts } = useSocial();
  
  // Determinamos el nombre del perfil actual
  const isCurrentUser = !username || username === currentUser.handle.substring(1);
  const displayName = isCurrentUser ? currentUser.name : `@${username}`;
  
  // Filtramos los posts para el usuario actual
  // Usamos una comparación flexible ya que el username es un handle de URL
  const userPosts = posts.filter(post => 
    isCurrentUser 
      ? post.author.name === currentUser.name 
      : post.author.name.toLowerCase().replace(/\s/g, '') === username.toLowerCase()
  );

  return (
    <div className="w3-row">
      <div className="w3-col m3">
         <div className="w3-card w3-round w3-white w3-padding">
           <h4 className="w3-center">Perfil de: {displayName}</h4>
           <p className="w3-center">
             <img src={isCurrentUser ? currentUser.avatar : "https://www.w3schools.com/w3images/avatar2.png"} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" />
           </p>
           <hr />
           <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> {isCurrentUser ? currentUser.job : "Usuario de la red"}</p>
           <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> {isCurrentUser ? currentUser.location : "Ubicación desconocida"}</p>
         </div>
      </div>
      
      <div className="w3-col m7">
        {userPosts.length > 0 ? (
          userPosts.map(post => <Post key={post.id} post={post} />)
        ) : (
          <div className="w3-container w3-card w3-white w3-round w3-margin w3-padding-32 w3-center">
             <p>Este usuario aún no ha publicado nada.</p>
          </div>
        )}
      </div>
      
      <div className="w3-col m2">
         {/* Placeholder para la columna derecha */}
      </div>
    </div>
  );
}
