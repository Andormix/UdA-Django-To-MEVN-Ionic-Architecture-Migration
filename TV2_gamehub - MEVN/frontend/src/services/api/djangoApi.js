const baseUrl = import.meta.env.VITE_DJANGO_API_BASE_URL || "/django-api";

async function request(path) 
{
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Accept: "application/json" }
  });

  const payload = await response.json();

  if (!response.ok) 
  {
    throw new Error(payload.message || "Django API request error");
  }
  
  return payload;
}

export const djangoApi = 
{
  listPosts: () => request("/posts/"),
  listComments: () => request("/comments/")
};
