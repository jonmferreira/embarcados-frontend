import { apiClient } from '../../../service/config';
import { AuthResponse } from '../types';
import { LoginFormInputs } from '../types';

export const loginUser = async (payload: LoginFormInputs): Promise<AuthResponse> => {
  try {
    const response = await apiClient.post('/auth/login', {
      username: payload.username,
      password: payload.password,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao logar usuário', error);
    throw error;
  }
};

export const loginMicrosoftAD = async (payload: LoginFormInputs, token?: string) => {
  try {
    let tokenToUse = token;

    if (payload.username === 'user' && payload.password === '12345' && !token) {
      tokenToUse = 'valid_mock_token';
    }

    const response = await apiClient.post(`/auth/microsoft-auth?token=${tokenToUse}`, {
      login: payload.username,
      password: payload.password,
    });

    return response.data;
  } catch (error: any) {
    console.error('Erro ao logar usuário', error);

    if (error.response && error.response.data && error.response.data.detail) {
      throw new Error(error.response.data.detail);
    }

    throw new Error('Erro inesperado ao tentar fazer login. Tente novamente.');
  }
};
