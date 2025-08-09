export const BASE_URL = `http://localhost:8080`;

export const currentDate = new Date().toISOString(); // actual date to iso 8601 format

export const TOKEN = localStorage.getItem("token");

export function logout() {
  localStorage.removeItem("user_id");
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  window.location.href = "/login";
}
