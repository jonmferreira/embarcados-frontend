import { useState } from 'react';
import { apiClient } from './config';

export interface IRMAData {
  id: number;
  reason: string;
  serial: string;
  description: string;
  status: string;
  status_observation: string;
}
export interface RmaRequest {
  reason: 'DISSATISFACTION' | 'DEFECT' | 'WRONG_ITEM' | 'DAMAGED' | 'WARRANTY_CLAIM' | 'OTHER';
  serial: string;
  description: string;
}

export const CreateRma = async (data: RmaRequest) => {
  const {} = useState();
  const response = await apiClient.post('/rma', {
    data: { ...data },
  });
  return response.data;
};

export const getRmaData = async (pageNumber: number, pageSize: number) => {
  const response = await apiClient.get('/rma', {
    params: { pageNumber: pageNumber + 1, pageSize },
  });
  return response.data;
};

export const updateRma = async (payload: IRMAData) => {
  const response = await apiClient.put(`/rma/${payload.id}`, {
    params: {
      rma_id: payload.id,
    },
    data: {
      status: payload.status,
      status_observation: payload.status_observation,
    },
  });
  return response.data;
};

export const deleteRma = async (id: number) => {
  const response = await apiClient.delete(`/rma/Delete/${id}`);
  return response.data;
};

export interface RmaStatusHistory {
  rma_id: number;
  status: 'Pending' | 'Received' | 'In Test' | 'Approved' | 'Rejected' | 'Completed';
  status_observation: string | null;
  created_at: string; // ISO 8601 Date string
}

export const getRmaStatusHistory = async (idrma: string | number): Promise<RmaStatusHistory[]> => {
  const response = await apiClient.get('/historic', {
    params: { rma_id: idrma },
  });
  return response.data;
};

export const getDashboardData = async () => {
  try {
    const response = await apiClient.get('/rma/graphics');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar dados do usuário', error);
    throw error;
  }
};
