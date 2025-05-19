import React from 'react';

export interface ProtectedRouteProps {
  children: React.ReactElement;
}

export interface RouteDefinition {
  path: string;
  label: string;
  order?: number;
  role?: string;
}

export const RoutesConfig = {
  DASHBOARD: {
    path: '/',
    label: 'Home',
    order: 1,
  },
  LOGIN: {
    path: '/login',
    label: 'Login',
  },
  REDIRECT_LOGIN: {
    path: '/redirect-login',
    label: 'Redirecionar Login',
  },
  NOT_FOUND: {
    path: '*',
    label: 'Página Não Encontrada',
  },
  NO_AUTHENTICATED: {
    path: '/no-authenticated',
    label: 'Sem Autenticação',
  },
} as const;
