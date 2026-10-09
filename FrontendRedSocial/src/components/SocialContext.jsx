import { createContext, useContext, useEffect, useState } from "react";
import { getPosts, savePosts } from "../services/api";

const SocialContext = createContext(null);
const w3img = (name) => `https://www.w3schools.com/w3images/${name}`;


const notifications = [
  "One new friend request",
  "John Doe posted on your wall",
  "Jane likes your post",
];

// Los grupos ahora vendrán del backend

const interests = [
  { label: "News", theme: "w3-theme-d5" },
  { label: "W3Schools", theme: "w3-theme-d4" },
  { label: "Labels", theme: "w3-theme-d3" },
  { label: "Games", theme: "w3-theme-d2" },
  { label: "Friends", theme: "w3-theme-d1" },
  { label: "Games", theme: "w3-theme" },
  { label: "Friends", theme: "w3-theme-l1" },
  { label: "Food", theme: "w3-theme-l2" },
  { label: "Design", theme: "w3-theme-l3" },
  { label: "Art", theme: "w3-theme-l4" },
  { label: "Photos", theme: "w3-theme-l5" },
];

const upcomingEvent = {
  title: "Holiday",
  when: "Friday 15:00",
  image: w3img("forest.jpg"),
};

const initialFriendRequests = [
  { id: "req-1", name: "Jane Doe", avatar: "https://i.pinimg.com/1200x/03/54/a3/0354a313ded0f00c9a621aee6ca87951.jpg" },
];

export function SocialProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [posts, setPosts] = useState([]);
  const [groups] = useState([
    {
      id: "g1",
      icon: "fa-users",
      title: "Frontend Developers",
      text: "Grupo para entusiastas de la web",
      photos: [w3img("avatar2.png")]
    },
    {
      id: "g2",
      icon: "fa-code",
      title: "React Masters",
      text: "Mejores prácticas en React",
      photos: [w3img("avatar5.png")]
    },
    {
      id: "g3",
      icon: "fa-laptop",
      title: "Tech News",
      text: "Noticias y tendencias de la industria",
      photos: [w3img("avatar6.png")]
    }
  ]);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [friends, setFriends] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  function toggleDarkMode() {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem("darkMode", next);
      return next;
    });
  }

  // Funciones de Autenticación
  async function login(credenciales) {
    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credenciales),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.msg || data.error || "Error al iniciar sesión");
      
      const userData = {
        id: data.usuario.id,
        name: data.usuario.nombre,
        email: data.usuario.email,
        handle: "@" + data.usuario.nombre.replace(/\s+/g, "").toLowerCase(),
        avatar: "https://i.pinimg.com/1200x/03/54/a3/0354a313ded0f00c9a621aee6ca87951.jpg",
        job: "Usuario",
        location: "Ciudad",
        birthday: "Desconocido"
      };
      
      setCurrentUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      if (data.token) localStorage.setItem("token", data.token);
      
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  function addPost(text) {
    const clean = text.trim();
    if (!clean || !currentUser) return; // Aseguramos que haya usuario
    setPosts((items) => {
      const newPosts = [
        {
          id: `post-${Date.now()}`,
          author: { name: currentUser.name, avatar: currentUser.avatar },
          createdAt: "Just now",
          text: clean,
          images: [],
          likes: 0,
          comments: [],
          liked: false,
          shared: false,
        },
        ...items,
      ];
      savePosts(newPosts);
      return newPosts;
    });
  }

  function toggleLike(id) {
    setPosts((items) =>
      items.map((post) =>
        post.id === id
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post,
      ),
    );
  }

  function toggleShare(id) {
    setPosts((items) =>
      items.map((post) =>
        post.id === id
          ? {
              ...post,
              shared: !post.shared,
              shares: (post.shares ?? 0) + (post.shared ? -1 : 1),
            }
          : post,
      ),
    );
  }

  function addComment(postId, text, parentId = null) {
    const clean = text.trim();
    if (!clean || !currentUser) return;
    setPosts((items) =>
      items.map((post) => {
        if (post.id !== postId) return post;
        const comment = {
          id: `comment-${Date.now()}`,
          author: currentUser.name,
          avatar: currentUser.avatar,
          text: clean,
          likes: 0,
          replies: [],
        };
        if (!parentId)
          return { ...post, comments: [...post.comments, comment] };
        return {
          ...post,
          comments: post.comments.map((item) =>
            item.id === parentId
              ? { ...item, replies: [...item.replies, comment] }
              : item,
          ),
        };
      }),
    );
  }

  function likeComment(postId, commentId, parentId = null) {
    setPosts((items) =>
      items.map((post) => {
        if (post.id !== postId) return post;
        const update = (item) =>
          item.id === commentId
            ? {
                ...item,
                liked: !item.liked,
                likes: item.likes + (item.liked ? -1 : 1),
              }
            : item;
        return parentId
          ? {
              ...post,
              comments: post.comments.map((item) =>
                item.id === parentId
                  ? { ...item, replies: item.replies.map(update) }
                  : item,
              ),
            }
          : { ...post, comments: post.comments.map(update) };
      }),
    );
  }

  function acceptFriend(id) {
    const request = friendRequests.find((item) => item.id === id);
    if (request) setFriends((items) => [...items, request]);
    setFriendRequests((items) => items.filter((item) => item.id !== id));
  }

  function declineFriend(id) {
    setFriendRequests((items) => items.filter((item) => item.id !== id));
  }

  return (
    <SocialContext.Provider
      value={{
        posts,
        currentUser,
        login,
        logout,
        isDarkMode,
        toggleDarkMode,
        notifications,
        groups,
        interests,
        upcomingEvent,
        friendRequests,
        friends,
        showAlert,
        addPost,
        toggleLike,
        toggleShare,
        addComment,
        likeComment,
        acceptFriend,
        declineFriend,
        setPosts,
        dismissAlert: () => setShowAlert(false),
      }}
    >
      {children}
    </SocialContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocial() {
  const context = useContext(SocialContext);
  if (!context) throw new Error("useSocial must be used inside <SocialProvider>");
  return context;
}
