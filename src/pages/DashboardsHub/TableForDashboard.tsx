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
  const [loading, setLoading] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);

  const { seeHistoryStatus, setOpenDialogQRCode, setOpenDialogPutStatus } = useStore();

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
    <Tag severity={rowData.status === 'COMPLETED' ? 'success' : 'warning'}>
      <div className="flex flex-row justify-content-center text-center gap-2">
        <div>{rowData?.status ?? ''}</div>
        {rowData.status_observation && (
          <i
            className="pi pi-info-circle infor p-overlay-badge"
            data-pr-tooltip={rowData.status_observation}
            data-pr-position="right"
            data-pr-at="right+5 top"
            data-pr-my="left center-2"
          />
        )}
      </div>
    </Tag>
  );

  const reasonBodyTemplate = (rowData: IRMAData) => (
    <Tag value={rowData.reason} severity="info"></Tag>
  );

  const actionBodyTemplate = (rowData: IRMAData) => (
    <div className="flex row gap-2">
      <Button
        icon="pi pi-trash"
        className="p-button-warning"
        visible={false}
        onClick={() => {
          // setLoadingTable(true)
          // deleteRma(rowData.id)
          //     .then(() => fetchData())
          //     .catch(() =>{
          //         setLoadingTable(false)
          //         console.error('Erro ao excluir o RMA')
          //     })
        }}
      />
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
      <Button
        icon="pi pi-wrench"
        className="p-button-primary"
        onClick={() => {
          setOpenDialogPutStatus(true, rowData);
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
    <div>
      <Tooltip target=".infor" />
      <DataTable
        size="small"
        value={rmaData.data}
        paginator={false}
        loading={loadingTable}
        dataKey="id"
      >
        <Column field="serial" header="Serial" style={{ width: '20%' }} />
        <Column field="reason" header="Razão" body={reasonBodyTemplate} style={{ width: '20%' }} />
        <Column field="description" header="Descrição" style={{ width: '30%' }} />
        <Column field="status" header="Status" body={statusBodyTemplate} style={{ width: '20%' }} />
        <Column body={actionBodyTemplate} header="Actions" style={{ width: '10%' }} />
      </DataTable>
    </div>
  );
};
