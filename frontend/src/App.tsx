import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

const TableroProvisional = () => (
  <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center text-3xl">
    🚧 Tablero en Construcción 🚧
  </div>
);

const ProtectedRoute = ({children}: {children: JSX.Element}) => {
  const token = localStorage.getItem('access_token')
  if (!token){
    return <Navigate to="/login" replace/>;
  }
  return children
};

function App(){
  return(
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <TableroProvisional />
            </ProtectedRoute>
          }
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      </BrowserRouter>
  );

}

export default App;