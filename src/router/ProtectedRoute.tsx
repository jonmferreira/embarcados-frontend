// src/components/ProtectedRoute.tsx
import React from 'react';
import { useStore } from '../store/store';
import { Navigate, useLocation } from 'react-router-dom';

import { ProtectedRouteProps, RouteDefinition, RoutesConfig } from './types';

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, userRemote } = useStore();

  const { pathname } = useLocation();

  const route: RouteDefinition | undefined = Object.values(RoutesConfig).find((rconfig) =>
    pathname.includes(rconfig.path),
  );

  // const hasAccess = route?.profiles?.some((role) => userRemote?.profiles?.includes(role));

  //TODO: VERIFICAR OS ROLES E FILTRAR NESSAS TELAS USANDO OS MESMOS
  // const hasAccess = route?.profiles?.some((requiredRole) =>
  //   userRemote?.roles?.some((roleGroup) => roleGroup.roles.includes(requiredRole))
  // );

  //TODO arrumar lógica de checagem de perfil
  // if (!hasAccess) {
  //   // TODO criar redirecionamento para "no-authenticated"
  //   return <Navigate to={RoutesConfig.NO_AUTHENTICATED.path} replace />;
  // }

  if (!isAuthenticated) {
    return <Navigate to={RoutesConfig.LOGIN.path} replace />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flexShrink: 0 }}>add menu</div>
      <div style={{ flexGrow: 1 }}>{children}</div>
    </div>
  );
};
