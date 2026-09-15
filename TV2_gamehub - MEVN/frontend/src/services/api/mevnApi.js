import { useAuthStore } from "../../store/auth";

// En dev: /mevn-api → proxy Vite → Express (mateix origen, sense CORS al navegador).
const baseUrl = import.meta.env.VITE_MEVN_API_BASE_URL || "/mevn-api";

async function request(path, options = {}) 
{
  const { state } = useAuthStore();

  const headers = 
  {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  // Si l'usuari està auth enviem el token amb la petició-
  if (state.token) 
  {
    headers.Authorization = `Bearer ${state.token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers
  });

  const payload = await response.json();
  
  if (!response.ok) 
  {
    throw new Error(payload.message || "Request error");
  }

  return payload;
}

export const mevnApi = 
{
  register: (data) => request("/auth/register", { method: "POST", body: JSON.stringify(data) }),
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  me: () => request("/auth/me"), 
  logout: () => request("/auth/logout", { method: "POST", body: JSON.stringify({}) }),
  listPosts: () => request("/posts"),
  getPost: (postId) => request(`/posts/${postId}`),
  createPost: (data) => request("/posts", { method: "POST", body: JSON.stringify(data) }),
  createComment: (postId, data) => request(`/posts/${postId}/comments`, { method: "POST", body: JSON.stringify(data) })
};
