import { useState, useEffect } from "react";
import { useSocial } from "./SocialContext";
import Post from "./Post";

function StatusComposer() {
  const { addPost, isDarkMode } = useSocial();
  const [text, setText] = useState("Status: Feeling Blue");

  function handleSubmit(e) {
    e.preventDefault();
    addPost(text);
    setText("");
  }

  return (
    <div className="w3-row-padding">
      <div className="w3-col m12">
        <div className={`w3-card w3-round ${isDarkMode ? "w3-black" : "w3-white"}`}>
          <form className="w3-container w3-padding" onSubmit={handleSubmit}>
            <h6 className="w3-opacity">Social Media template by w3.css</h6>
            <textarea
              className="w3-border w3-padding status-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              rows={2}
            />
            <button type="submit" className="w3-button w3-theme">
              <i className="fa fa-pencil"></i>  Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function Feed() {
  const { posts, setPosts, isDarkMode } = useSocial(); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // SocialContext se encarga ahora de cargar inicialmente de la API/LocalStorage.
    // Solo mostramos el loading mientras los posts estén vacíos.
    setLoading(posts.length === 0);
  }, [posts.length]);

  return (
    <div className="w3-col m7">
      <StatusComposer />
      
      {loading ? (
        <div className={`w3-container w3-card w3-round w3-margin w3-padding-32 w3-center ${isDarkMode ? "w3-black" : "w3-white"}`}>
          <i className="fa fa-spinner fa-spin w3-xxlarge w3-text-theme"></i>
          <p>Cargando publicaciones...</p>
        </div>
      ) : (
        posts.map((post) => (
          <Post key={post.id} post={post} />
        ))
      )}
    </div>
  );
}
