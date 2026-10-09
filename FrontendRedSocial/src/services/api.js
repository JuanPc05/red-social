const w3img = (name) => `https://www.w3schools.com/w3images/${name}`;
const STORAGE_KEY = "red-social-posts";

const currentUser = {
  name: "Juan Pablo Castillo",
  handle: "@juanpablocastillo",
  avatar: "https://i.pinimg.com/1200x/03/54/a3/0354a313ded0f00c9a621aee6ca87951.jpg",
  job: "Designer, UI",
  location: "London, UK",
  birthday: "April 1, 1988",
};

// Obtener publicaciones reales desde el backend
export async function getPosts() {
  try {
    const res = await fetch("http://localhost:3000/api/publicaciones");
    if (!res.ok) throw new Error("Error al obtener publicaciones");
    const data = await res.json();
    
    // Mapear los datos de MySQL al formato que espera el frontend
    return data.map((p) => ({
      id: p.id,
      author: { id: p.usuario_id, name: p.autor, avatar: p.avatar },
      createdAt: new Date(p.fecha_creacion).toLocaleString(),
      text: p.texto,
      images: p.imagen_url ? [{ src: p.imagen_url, alt: "Imagen del post" }] : [],
      likes: p.total_likes,
      comments: Array.from({ length: p.total_comentarios }), // Array mock para el contador de la UI
      liked: false,
      shared: false,
    }));
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

// Ya no usamos savePosts porque ahora hay base de datos real
export function savePosts(posts) {
  // Función vacía para no romper otras partes que aún la llamen temporalmente
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
