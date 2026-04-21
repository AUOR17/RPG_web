import { Navigate, Outlet } from 'react-router-dom';

export default function RutaPrivada() {
  const token = localStorage.getItem('token');

  // 1. Si no hay token de plano, lo mandamos a volar instantáneamente
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Si SÍ hay token, leemos su fecha de caducidad ANTES de dejarlo pasar
  try {
    // El JWT tiene 3 partes separadas por puntos. La del medio [1] tiene los datos.
    const payloadCodificado = token.split('.')[1];
    
    // Decodificamos de Base64 a un objeto de JavaScript
    const payload = JSON.parse(atob(payloadCodificado));
    
    // JWT guarda la fecha en segundos, JavaScript la usa en milisegundos
    const fechaExpiracion = payload.exp * 1000; 
    const tiempoActual = Date.now();

    // Si la fecha de hoy ya pasó la fecha de expiración del token...
    if (tiempoActual >= fechaExpiracion) {
      console.warn("El cadenero detectó un token vencido. Acceso denegado.");
      localStorage.removeItem('token'); // Destruimos la evidencia
      return <Navigate to="/login" replace />; // Redirección silenciosa y sin parpadeos
    }
  } catch (error) {
    // Si alguien intentó hackear el token y puso texto sin sentido
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  // 3. Si tiene token, es válido y está vigente, bienvenido al Gremio.
  return <Outlet />;
}