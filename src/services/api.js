const w3img = (name) => `https://www.w3schools.com/w3images/${name}`;
const STORAGE_KEY = "red-social-posts";

const currentUser = {
  name: "Juan Pablo Castillo",
  handle: "@juanpablocastillo",
  avatar: w3img("avatar3.png"),
  job: "Designer, UI",
  location: "London, UK",
  birthday: "April 1, 1988",
};

const mockPosts = [
  {
    id: "post-1",
    author: { name: "John Doe", avatar: w3img("avatar2.png") },
    createdAt: "1 min",
    text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    images: [
      { src: w3img("lights.jpg"), alt: "Northern Lights" },
      { src: w3img("nature.jpg"), alt: "Nature" },
    ],
    likes: 12,
    comments: [],
    liked: false,
    shared: false,
  },
  {
    id: "post-2",
    author: { name: "Jane Doe", avatar: w3img("avatar5.png") },
    createdAt: "16 min",
    text: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    images: [],
    likes: 4,
    comments: [],
    liked: false,
    shared: false,
  },
];

// Leer desde LocalStorage (o devolver mocks si está vacío)
function getLocalPosts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading from localStorage", e);
  }
  return mockPosts;
}

// Guardar en LocalStorage
export function savePosts(posts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  } catch (e) {
    console.error("Error saving to localStorage", e);
  }
}

export function getPosts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getLocalPosts());
    }, 500);
  });
}

export function getPostById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const posts = getLocalPosts();
      const post = posts.find((p) => p.id === id);
      resolve(post || null);
    }, 500);
  });
}

export function getUserProfile(username) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...currentUser, name: username ? `@${username}` : currentUser.name });
    }, 500);
  });
}
