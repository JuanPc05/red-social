import { createContext, useContext, useEffect, useState } from "react";
import { getPosts, savePosts } from "../services/api";

const SocialContext = createContext(null);
const w3img = (name) => `https://www.w3schools.com/w3images/${name}`;

const currentUser = {
  name: "Juan Pablo Castillo",
  handle: "@juanpablocastillo",
  avatar: w3img("avatar3.png"),
  job: "Designer, UI",
  location: "London, UK",
  birthday: "April 1, 1988",
};

const notifications = [
  "One new friend request",
  "John Doe posted on your wall",
  "Jane likes your post",
];

const groups = [
  { id: "groups", icon: "fa-circle-o-notch", title: "My Groups", text: "Some text.." },
  { id: "events", icon: "fa-calendar-check-o", title: "My Events", text: "Some other text.." },
  {
    id: "photos",
    icon: "fa-users",
    title: "My Photos",
    photos: ["lights.jpg", "nature.jpg", "mountains.jpg", "forest.jpg", "nature.jpg", "snow.jpg"].map(w3img),
  },
];

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
  { id: "req-1", name: "Jane Doe", avatar: w3img("avatar6.png") },
];

export function SocialProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [friendRequests, setFriendRequests] = useState(initialFriendRequests);
  const [friends, setFriends] = useState([]);
  const [showAlert, setShowAlert] = useState(true);

  // Inicializar estado asíncrono desde la API simulada (que lee de LocalStorage)
  useEffect(() => {
    getPosts().then((data) => setPosts(data));
  }, []);

  // Persistencia: guardar posts a LocalStorage a través de api.js cada vez que cambian
  useEffect(() => {
    if (posts.length > 0) {
      savePosts(posts);
    }
  }, [posts]);

  function addPost(text) {
    const clean = text.trim();
    if (!clean) return;
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
      // Guardar inmediatamente
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
    if (!clean) return;
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
