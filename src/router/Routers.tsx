import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoutesConfig } from './types';
import { Home, LoginForm, RmaTable } from '../pages';

export const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path={RoutesConfig.LOGIN.path} element={<LoginForm />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path={RoutesConfig.DASHBOARD.path} element={<Home />} />
              </Routes>
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={RoutesConfig.LOGIN.path} replace />} />
      </Routes>
    </Router>
  );
};
