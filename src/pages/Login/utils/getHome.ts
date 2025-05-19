import { RoutesConfig } from '../../../router/types';
import { AuthResponse } from '../types';

//TODO: USAR NOVOS ROLES DE ACORDO COM A INTEGRAÇÃO DO NOVO LOGIN
//TODO: VERIFICAR REGRAS DE NEGÓCIO PARA SABER O QUE CADA PERFIL USA
export const getHomeRoute = (user: AuthResponse | undefined): string => {
  return '/';
};
