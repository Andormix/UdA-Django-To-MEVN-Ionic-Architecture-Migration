import { reactive } from "vue";

const TOKEN_KEY = "tv2_mevn_token";
const USER_KEY = "tv2_mevn_user";

const state = reactive({
  token: localStorage.getItem(TOKEN_KEY) || "",
  user: JSON.parse(localStorage.getItem(USER_KEY) || "null")
});

function setAuth(token, user) 
{
  state.token = token;
  state.user = user;
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function clearAuth() 
{
  state.token = "";
  state.user = null;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function useAuthStore() 
{
  return { state, setAuth, clearAuth };
}
