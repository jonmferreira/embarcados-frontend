import { Dialog } from 'primereact/dialog';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { useStore } from '../../store';
import { IRMAData, updateRma } from '../../service';
import { InputText } from 'primereact/inputtext';

export enum Status {
  PENDING = 'Pending',
  RECEIVED = 'Received',
  IN_TEST = 'In Test',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  COMPLETED = 'Completed',
}

export const nextStatusOptions: Record<Status, Status[]> = {
  [Status.PENDING]: [Status.RECEIVED],
  [Status.RECEIVED]: [Status.IN_TEST, Status.REJECTED],
  [Status.IN_TEST]: [Status.APPROVED, Status.REJECTED],
  [Status.APPROVED]: [Status.COMPLETED],
  [Status.REJECTED]: [],
  [Status.COMPLETED]: [],
} as const;

export const DialogPutStatus = () => {
  const { openDialogPutStatus, setOpenDialogPutStatus, rmaSelected } = useStore();
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);
  const [status_observation, setStatus_observation] = useState<string | null>('');
  const [loading, setLoading] = useState(false);

  const handleSave = () => {
    if (selectedStatus) {
      setLoading(true);

      updateRma({
        id: rmaSelected.id,
        status: selectedStatus,
        status_observation: status_observation ?? '',
      } as IRMAData)
        .then(() => {
          setOpenDialogPutStatus(false, undefined);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  const possibleStatuses = nextStatusOptions[rmaSelected?.status as Status] ?? [];

  return (
    <Dialog
      visible={openDialogPutStatus}
      onHide={() => setOpenDialogPutStatus(false, undefined)}
      header={`Serial: ${rmaSelected?.serial}`}
    >
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="status">Próximo Status</label>
          <Dropdown
            id="status"
            value={selectedStatus}
            options={possibleStatuses.map((status) => ({
              label: status,
              value: status,
            }))}
            onChange={(e: DropdownChangeEvent) => setSelectedStatus(e.value)}
            placeholder="Selecione o status"
          />
          <InputText
            placeholder="Observação"
            value={status_observation}
            onChange={(event) => {
              setStatus_observation(event.target.value);
            }}
          ></InputText>
        </div>
        <div className="p-mt-3">
          <Button
            label="Salvar"
            icon="pi pi-check"
            onClick={handleSave}
            disabled={!selectedStatus}
            loading={loading}
          />
        </div>
      </div>
    </Dialog>
  );
};
