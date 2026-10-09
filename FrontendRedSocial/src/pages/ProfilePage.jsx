import { useParams } from "react-router-dom";
import { useSocial } from "../components/SocialContext";
import Post from "../components/Post";

export default function ProfilePage() {
  const { id } = useParams();
  const { currentUser, posts } = useSocial();
  
  // Determinamos si es el perfil del usuario actual
  const isCurrentUser = !id || Number(id) === currentUser.id;
  
  // Filtramos los posts para el usuario correspondiente
  const userPosts = posts.filter(post => 
    isCurrentUser 
      ? post.author.id === currentUser.id 
      : post.author.id === Number(id)
  );

  // Intentar obtener los datos del usuario dueño de este perfil
  // Si no es el currentUser, tomamos el nombre y avatar de su primer post
  let displayName = isCurrentUser ? currentUser.name : "Usuario";
  let displayAvatar = isCurrentUser ? currentUser.avatar : "https://i.pinimg.com/1200x/03/54/a3/0354a313ded0f00c9a621aee6ca87951.jpg";
  let displayJob = isCurrentUser ? currentUser.job : "Usuario de la red";
  let displayLocation = isCurrentUser ? currentUser.location : "Ubicación desconocida";

  if (!isCurrentUser && userPosts.length > 0) {
    const author = userPosts[0].author;
    displayName = author.name;
    displayAvatar = author.avatar;
  }

  return (
    <div className="w3-row">
      <div className="w3-col m3">
         <div className="w3-card w3-round w3-white w3-padding">
           <h4 className="w3-center">Perfil de: {displayName}</h4>
           <p className="w3-center">
             <img src={displayAvatar} className="w3-circle" style={{ height: 106, width: 106 }} alt="Avatar" />
           </p>
           <hr />
           <p><i className="fa fa-pencil fa-fw w3-margin-right w3-text-theme"></i> {displayJob}</p>
           <p><i className="fa fa-home fa-fw w3-margin-right w3-text-theme"></i> {displayLocation}</p>
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
