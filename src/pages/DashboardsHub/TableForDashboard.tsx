import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import { getRmaData, IRMAData } from '../../service';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { mockRmaData } from './RMATable';
import { Tooltip } from 'primereact/tooltip';
import { useStore } from '../../store';
import { DialogPutStatus } from './DialogPutStatus';

export const TableForDashboard = () => {
  const [rmaData, setRmaData] = useState(mockRmaData);
  const [loading, setLoading] = useState(false);
  const [loadingTable, setLoadingTable] = useState(false);

  const renderPhStatus = (rowData: any) => {
    const value = rowData.ph;
    let label = 'Neutro';
    let severity: 'success' | 'danger' | 'info' = 'info';

    if (value < 7) {
      label = 'Ácido';
      severity = 'danger';
    } else if (value > 7) {
      label = 'Básico';
      severity = 'success';
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

  useEffect(() => {
    // fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <DataTable
      size="small"
      value={rmaData.data}
      paginator={false}
      loading={loadingTable}
      dataKey="id"
    >
      <Column field="timestamp" header="Data de Coleta" style={{ width: '30%' }} />
      <Column field="ph" header="pH" style={{ width: '10%' }} />
      <Column field="humidity" header="Umidade (%)" style={{ width: '10%' }} />
      <Column header="Status pH" body={renderPhStatus} style={{ width: '15%' }} />
      <Column header="Status Umidade" body={renderHumidityStatus} style={{ width: '15%' }} />
    </DataTable>
  );
};
