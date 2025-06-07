import { Card } from 'primereact/card';
import { DashboardPieChart, SingleAreaChart } from '../../component';
import { TableForDashboard, LogsTable } from '../DashboardsHub';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import { getDashboardData } from '../../service';

import styles from '../../app/irma.module.css';
import { Button } from 'primereact/button';
import { FloatLabel } from 'primereact/floatlabel';
import { Calendar } from 'primereact/calendar';
import { Nullable } from 'primereact/ts-helpers';
import { EmbarcadosAPI } from './integrations';
import { useSensorStore } from './hooks';
const statusColors = ['#779ECC', '#FFB347', '#7ABD7E', '#FF6961'];
const reasonColors = ['#FF6961', '#FFB347', '#779ECC', '#7ABD7E'];

export const Home = () => {
  const [loading, setLoading] = useState(false);

  const { setList, humidityList, temperatureList, setLogs } = useSensorStore();

  const [normalizandoPH, setNormalizarPH] = useState(false);
  const [normalizandoUmidade, setNormalizarUmidade] = useState(false);
  const [dates, setDates] = useState(null);
  const { startDate, endDate, setDateRange } = useSensorStore();

  const onClickNormalizarPH = () => {
    setNormalizarPH(true);
  };
  const onClickNormalizarUmidade = () => {
    setNormalizarUmidade(true);
  };

  const fetchData = async (startDate?: Date, endDate?: Date) => {
    try {
      setLoading(true);

      const [data, logs] = await Promise.all([
        EmbarcadosAPI.getItens(startDate, endDate),
        EmbarcadosAPI.getLog(startDate, endDate),
      ]);

      setList(data);
      setLogs(logs);
    } catch (error) {
      console.error('Erro ao carregar os dados do usuário');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(startDate, endDate);
  }, [startDate, endDate]);

  if (loading) {
    return (
      <div className={styles.pageContentWrapper}>
        <div className={styles.irmaHeader}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageContentWrapper}>
      <div className={styles.irmaContent}>
        <div className="flex flex-wrap gap-4 justify-content-between mb-1">
          <Card className="chart-card shadow-none m-0 p-0">
            <SingleAreaChart
              title="Leitura do Sensor de Umidade"
              subtitle="Valores ao longo do dia"
              data={humidityList}
              xKey="timestamp"
              yKey="value"
              color="#8884d8"
              tooltipTitle="Umidade"
            />
          </Card>

          <Card className="chart-card shadow-none m-0 p-0">
            <SingleAreaChart
              title="Leitura do Sensor de Temperatura"
              subtitle="Valores ao longo do dia"
              data={temperatureList}
              xKey="timestamp"
              yKey="value"
              color="#82ca9d"
              tooltipTitle="Umidade"
            />
          </Card>
          <Card className="chart-card shadow-none m-0 p-0 w-3">
            <h2 style={{ margin: 0, padding: 0 }}>Ações</h2>
            <div className="flex flex-column gap-2 ">
              <Button
                label="Normalizar PH"
                onClick={onClickNormalizarPH}
                rounded
                loading={normalizandoPH}
              />
              <Button
                loading={normalizandoUmidade}
                rounded
                label="Normalizar Umidade"
                onClick={onClickNormalizarUmidade}
              />
              <div
                style={{
                  color: '#000',
                  display: 'flex',
                  textAlign: 'left',
                  flexDirection: 'column',
                }}
              >
                Filtro por data:
                <Calendar
                  value={dates}
                  onChange={(e) => {
                    console.log(e.value);
                    //@ts-ignore
                    setDates(e.value);
                    //@ts-ignore
                    setDateRange(e.value);
                  }}
                  selectionMode="range"
                  readOnlyInput
                  showTime
                  hideOnRangeSelection
                  showButtonBar
                  placeholder="Escolha o range de filtro"
                />
              </div>
            </div>
          </Card>
        </div>
        <div className="flex m-0 p-0 justify-content-between">
          <div className="col-5  m-0 p-0 ">
            <h3 style={{ margin: 0, padding: 0, color: 'white' }}>Tabela 1: Dados de coleta</h3>
            <TableForDashboard />
          </div>
          <div className="col-5  m-0 p-0 ">
            <h3 style={{ margin: 0, padding: 0, color: 'white' }}>Tabela 2: Logs no servidor</h3>
            <LogsTable />
          </div>
        </div>
      </div>
    </div>
  );
};
