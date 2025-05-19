export interface LoginFormInputs {
  username: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  login: string;
  //TODO: VERIFICAR E MUDAR PARA ROLES CASO NECESSÁRIO
  profiles: string[];
  roles: {
    group: string;
    roles: string[];
  }[];
  token: string;
  name: string;
}
