import { apiClient } from '../config/axios';
import { toast } from 'react-toastify';

export const downloadFile = async (rmaType: string, fileName: string) => {
  try {
    const response = await apiClient.get(`/download/${rmaType}`, {
      responseType: 'blob',
    });

    if (response.status === 200) {
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } else {
      throw new Error('Erro no download do arquivo.');
    }
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
    toast.error('Erro ao baixar o template. Tente novamente.');
  }
};
