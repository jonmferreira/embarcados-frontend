import { apiClient } from '../../../service';

const toIsoWithMicroseconds = (date?: Date) => {
  if (!date) return undefined;
  const iso = date.toISOString(); // até milissegundos: 2025-06-07T17:46:25.256Z
  return iso.replace('Z', '') + '000'; // força 6 dígitos após ponto
};

export const EmbarcadosAPI = {
  getItens: async (inicio?: Date, fim?: Date) => {
    const data = { inicio: toIsoWithMicroseconds(inicio), fim: toIsoWithMicroseconds(fim) };
    const response = await apiClient({
      url: '/list/reads-filtered',
      method: 'GET',
      params: { inicio: toIsoWithMicroseconds(inicio), fim: toIsoWithMicroseconds(fim) },
    });

    return response.data;
  },
  getLog: async (inicio?: Date, fim?: Date) => {
    const response = await apiClient({
      url: '/list/logs-filtered',
      method: 'GET',
      params: { inicio: toIsoWithMicroseconds(inicio), fim: toIsoWithMicroseconds(fim) },
    });
    return response.data;
  },
};
