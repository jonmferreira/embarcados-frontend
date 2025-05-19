import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import { getRmaData, IRMAData } from '../../service';
import { Button } from 'primereact/button';
import { useStore } from '../../store';
import { Status } from './DialogPutStatus';

export const mockRmaData = {
  current: 1,
  pageSize: 5,
  totalItems: 5,
  totalPages: 5,
  data: [
    {
      id: 1,
      reason: 'Defective product',
      serial: 'SN987654321',
      description: 'Produto não funciona',
      status: Status.PENDING,
      status_observation: '',
    },
    {
      id: 2,
      reason: 'Customer dissatisfaction',
      serial: 'SN123456789',
      description: 'Cliente insatisfeito com a funcionalidade',
      status: Status.RECEIVED,
      status_observation: 'Produto recebido para análise',
    },
    {
      id: 3,
      reason: 'Customer dissatisfaction',
      serial: 'SN123456789',
      description: 'Cliente insatisfeito com a funcionalidade',
      status: Status.RECEIVED,
      status_observation: 'Produto recebido para análise',
    },
    {
      id: 4,
      reason: 'Customer dissatisfaction',
      serial: 'SN123456789',
      description: 'Cliente insatisfeito com a funcionalidade',
      status: Status.RECEIVED,
      status_observation: 'Produto recebido para análise',
    },
  ],
};

export const RmaTable: React.FC = () => {
  const [rmaData, setRmaData] = useState(mockRmaData);
  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const { seeHistoryStatus, setOpenDialogQRCode } = useStore();

  // const statusOptions = [
  //     { label: 'Pending', value: 'PENDING' },
  //     { label: 'Received', value: 'RECEIVED' },
  //     { label: 'In Test', value: 'IN_TEST' },
  //     { label: 'Approved', value: 'APPROVED' },
  //     { label: 'Rejected', value: 'REJECTED' },
  //     { label: 'Completed', value: 'COMPLETED' }
  // ];

  // const reasonOptions = [
  //     { label: 'Defective product', value: 'DEFECT' },
  //     { label: 'Customer dissatisfaction', value: 'DISSATISFACTION' },
  //     { label: 'Wrong item received', value: 'WRONG_ITEM' },
  //     { label: 'Damaged during shipping', value: 'DAMAGED' },
  //     { label: 'Warranty claim', value: 'WARRANTY_CLAIM' },
  //     { label: 'Other reason', value: 'OTHER' }
  // ];

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getRmaData(rmaData.current, rmaData.pageSize);
      setRmaData(data);
      setLoading(false);
      setLoadingTable(false);
    } catch (error) {
      setLoading(false);
      setLoadingTable(false);
      console.error('Erro ao carregar os dados do RMA:', error);
    }
  };

  const statusBodyTemplate = (rowData: IRMAData) => (
    <Tag
      value={rowData.status}
      severity={rowData.status === 'COMPLETED' ? 'success' : 'warning'}
    ></Tag>
  );

  const reasonBodyTemplate = (rowData: IRMAData) => (
    <Tag value={rowData.reason} severity="info"></Tag>
  );

  const actionBodyTemplate = (rowData: IRMAData) => (
    <div className="flex row gap-2">
      <Button
        icon="pi pi-history"
        className="p-button-secondary"
        onClick={() => {
          seeHistoryStatus(rowData.id);
        }}
      />
      <Button
        icon="pi pi-tag"
        className="p-button-info"
        onClick={() => {
          setOpenDialogQRCode(true, rowData);
        }}
      />
    </div>
  );

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="card p-fluid">
      <h1>Gerenciamento de Demandas</h1>
      <DataTable value={rmaData.data} paginator={false} loading={loadingTable} dataKey="id">
        <Column field="serial" header="Serial" style={{ width: '20%' }} />
        <Column field="reason" header="Razão" body={reasonBodyTemplate} style={{ width: '20%' }} />
        <Column field="description" header="Descrição" style={{ width: '30%' }} />
        <Column field="status" header="Status" body={statusBodyTemplate} style={{ width: '20%' }} />
        <Column body={actionBodyTemplate} header="Actions" style={{ width: '10%' }} />
      </DataTable>
      <Paginator
        first={rmaData.current - 1}
        rows={rmaData.pageSize}
        totalRecords={rmaData.totalItems}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={(e: PaginatorPageChangeEvent) => {
          setRmaData((prev) => ({ ...prev, current: e.page + 1, pageSize: e.rows }));
          fetchData();
        }}
      />
    </div>
  );
};
