import { useAuthStore } from "../store/auth";

// Al navegador (npm run dev), usa /mevn-api i el proxy de Vite (aqui evitem el 
// CORS si el port no es 5173 que vam tindre (explicat a la docu)).
const baseUrl = import.meta.env.VITE_MEVN_API_BASE_URL || "/mevn-api";

async function request(path, options = {}) 
{
  const { state } = useAuthStore();
  const headers = 
  {
    "Content-Type": "application/json",
    ...(options.headers || {})
  };

  if (state.token) 
  {
    headers.Authorization = `Bearer ${state.token}`;
  }

  let response;
  try 
  {
    response = await fetch(`${baseUrl}${path}`, {
      ...options,
      headers
    });
  } catch 
  {
    throw new Error("No arriba a la MEVN API - CATCH DEL REQUEST");
  }

  const payload = await response.json().catch(() => ({}));
  if (!response.ok) 
  {
    throw new Error(payload.message || "MEVN error de request");
  }
  return payload;
}

export const mevnApi = {
  login: (data) => request("/auth/login", { method: "POST", body: JSON.stringify(data) }),
  listPosts: () => request("/posts"),
  createPost: (data) => request("/posts", { method: "POST", body: JSON.stringify(data) })
};
