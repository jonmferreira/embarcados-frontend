import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useSensorStore } from '../Home/hooks';

export const LogsTable = () => {
  const { logs, loading } = useSensorStore();

  return (
    <DataTable paginator rows={6} size="small" value={logs} dataKey="id" loading={loading}>
      <Column field="timestamp" header="Data de Coleta" style={{ width: '27%' }} />
      <Column field="log" header="Log" style={{ width: '50%' }} />
      <Column field="type" header="Tipo" style={{ width: '23%' }} />
    </DataTable>
  );
};
