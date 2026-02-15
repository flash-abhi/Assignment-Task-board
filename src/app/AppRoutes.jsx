import Login from '../pages/Login';
import Board from '../pages/Board';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login/>} />
      <Route path="/board" 
      element={
          <ProtectedRoute>
            <Board />
          </ProtectedRoute>
        } />
    </Routes>
  )
}

export default AppRoutes;