import React from 'react';
import { ProgressSpinner } from 'primereact/progressspinner';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-column justify-content-center align-items-center h-full w-full">
      <ProgressSpinner
        style={{ width: '50px', height: '50px' }}
        strokeWidth="5"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
      <span className="ml-2">Carregando...</span>
    </div>
  );
};
