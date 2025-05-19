import { apiClient } from './config';

export const getUserData = async () => {
  try {
    const response = await apiClient.get('/WeatherForecast/Users');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
    throw error;
  }
};

export const getTableData = async (pageNumber: number, pageSize: number) => {
  try {
    const response = await apiClient.get('/User/Consult', {
      params: {
        pageNumber: pageNumber + 1,
        pageSize,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
    throw error;
  }
};

export interface UserRegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile: 'Admin' | 'Comum';
  status: boolean;
}

export const registerUser = async (payload: UserRegistrationData) => {
  try {
    const response = await apiClient.post('/User/Registration', payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário', error);
    throw error;
  }
};

export interface IUserPUT {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile: 'Admin' | 'Comum';
  status: boolean;
  id: number;
}

export const updateUser = async (payload: IUserPUT) => {
  try {
    const response = await apiClient.put(`/User/Update/${payload.id}`, payload);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário', error);
    throw error;
  }
};

export const deleteUser = async (payload: IUserPUT) => {
  try {
    const response = await apiClient.delete(`/User/Delete/${payload.id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao registrar usuário', error);
    throw error;
  }
};
