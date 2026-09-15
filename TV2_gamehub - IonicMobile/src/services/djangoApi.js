// Al navegador (npm run dev), usa /django-api i el proxy de Vite (com la web TV2).
// A emulador Android, posa http://10.0.2.2:8000/api al .env
const baseUrl = import.meta.env.VITE_DJANGO_API_BASE_URL || "/django-api";

async function request(path) 
{
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Accept: "application/json" }
  });
  const payload = await response.json();
  if (!response.ok) 
  {
    throw new Error(payload.message || "Django error de request");
  }
  return payload;
}

export const djangoApi = {
  listPosts: () => request("/posts/")
};
