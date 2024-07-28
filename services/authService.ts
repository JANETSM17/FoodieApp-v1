import { authHost, lifeSessionTimeInMin } from "../constants/auth.constants";

async function authService(email, password) {
  try {
    const response = await fetch(`${authHost}auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        password,
        expiresInMins: lifeSessionTimeInMin,
      }),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al hacer login');
    }

    return await response.json();
  } catch (error) {
    alert('Error al hacer login, credenciales incorrectas o expiró la sesión');
    return null;
  }
}

export default authService;
