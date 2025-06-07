import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../component/LoadingSpinner';

export const LogsTable = () => {
  const [data, setData] = useState([
    {
      id: '1',
      timestamp: '2025-06-07T10:00:00',
      log: 'Ajuste automático de pH de 5.2 para 7.0',
      type: 'automático',
    },
    {
      id: '2',
      timestamp: '2025-06-07T11:00:00',
      log: 'Operação normal - pH 7.0, umidade 55%',
      type: 'manual',
    },
    {
      id: '3',
      timestamp: '2025-06-07T12:00:00',
      log: 'Ajuste automático de pH de 8.3 para 7.0',
      type: 'automático',
    },
    {
      id: '4',
      timestamp: '2025-06-07T13:00:00',
      log: 'Normalizando umidade de 80% para 60%',
      type: 'manual',
    },
    {
      id: '5',
      timestamp: '2025-06-07T14:00:00',
      log: 'Operação normal - pH 5.8, umidade 67%',
      type: 'manual',
    },
    {
      id: '6',
      timestamp: '2025-06-07T15:00:00',
      log: 'Operação normal - pH 7.2, umidade 42%',
      type: 'manual',
    },
    {
      id: '7',
      timestamp: '2025-06-07T16:00:00',
      log: 'Ajuste automático de pH de 6.0 para 7.0',
      type: 'automático',
    },
    {
      id: '8',
      timestamp: '2025-06-07T17:00:00',
      log: 'Normalizando pH de 7.8 para 7.0',
      type: 'manual',
    },
    {
      id: '9',
      timestamp: '2025-06-07T18:00:00',
      log: 'Normalizando umidade de 70% para 60%',
      type: 'manual',
    },
  ]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <DataTable size="small" value={data} paginator={false} loading={loading} dataKey="id">
      <Column field="timestamp" header="Data de Coleta" style={{ width: '27%' }} />
      <Column field="log" header="Log" style={{ width: '50%' }} />
      <Column field="type" header="Type" style={{ width: '30%' }} />
    </DataTable>
  );
};
