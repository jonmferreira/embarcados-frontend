import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import { Tag } from 'primereact/tag';
import { useSensorStore } from '../Home/hooks';

export const TableForDashboard = () => {
  const { list, loading } = useSensorStore();

  const renderTemperatureStatus = (rowData: any) => {
    const value = rowData.temperatura;
    let label = 'Normal';
    let severity: 'success' | 'warning' | 'danger' = 'success';

    if (value < 15) {
      label = 'Baixa';
      severity = 'info';
    } else if (value > 30) {
      label = 'Alta';
      severity = 'warning';
    }

    return <Tag value={label} severity={severity} />;
  };

  const renderHumidityStatus = (rowData: any) => {
    const value = rowData.humidity;
    let label = 'Normal';
    let severity: 'success' | 'warning' | 'danger' = 'success';

    if (value < 40) {
      label = 'Baixa';
      severity = 'info';
    } else if (value > 70) {
      label = 'Alta';
      severity = 'warning';
    }

    return <Tag value={label} severity={severity} />;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <DataTable
      size="small"
      value={list}
      paginator={true}
      rows={6}
      totalRecords={list.length}
      loading={loading}
      dataKey="id"
    >
      <Column field="timestamp" header="Data de Coleta" style={{ width: '30%' }} />
      <Column field="temperatura" header="Temperatura (°C)" style={{ width: '10%' }} />
      <Column field="umidade" header="Umidade (%)" style={{ width: '10%' }} />
      <Column header="Status Temperatura" body={renderTemperatureStatus} style={{ width: '15%' }} />
      <Column header="Status Umidade" body={renderHumidityStatus} style={{ width: '15%' }} />
    </DataTable>
  );
};
