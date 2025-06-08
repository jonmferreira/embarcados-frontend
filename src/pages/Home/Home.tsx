import { Card } from 'primereact/card';
import { SingleAreaChart } from '../../component';
import { TableForDashboard, LogsTable } from '../DashboardsHub';
import { useState, useEffect } from 'react';

import styles from '../../app/irma.module.css';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { EmbarcadosAPI } from './integrations';
import { useSensorStore } from './hooks';

import '../DashboardsHub/Dashboard.style.css';
import { toast } from 'react-toastify';

export const Home = () => {
  const { setList, humidityList, temperatureList, setLogs, setLoading } = useSensorStore();

  const [normalizandoPH, setNormalizarPH] = useState(false);
  const [normalizandoUmidade, setNormalizarUmidade] = useState(false);
  const [dates, setDates] = useState(null);
  const { startDate, endDate, setDateRange } = useSensorStore();

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

  const onClickNormalizarPH = () => {
    setNormalizarPH(true);
    EmbarcadosAPI.postMQTT('cool down')
      .then(() => {
        fetchData();
        toast.success('Comando enviado via MQTT com sucesso!');
        toast.info('Aguarde normalização de Temperatura');
      })
      .catch((e) => {
        toast.error('Erro ao enviar via MQTT com sucesso!');
        setNormalizarPH(false);
      });
  };
  const onClickNormalizarUmidade = () => {
    setNormalizarUmidade(true);
    EmbarcadosAPI.postMQTT('water')
      .then(() => {
        toast.success('Comando enviado via MQTT com sucesso!');
        toast.info('Aguarde normalização de Umidade');
      })
      .catch((e) => {
        toast.error('Erro ao enviar via MQTT com sucesso!');
        setNormalizarUmidade(false);
      });
    toast.success('Comando enviado via MQTT com sucesso!');
    toast.info('Aguarde normalização de Temperatura');
  };

  useEffect(() => {
    fetchData(startDate, endDate);

    const interval = setInterval(() => {
      fetchData(startDate, endDate);
    }, 3000);

    return () => clearInterval(interval);
  }, [startDate, endDate]);
  return (
    <div className={styles.pageContentWrapper}>
      <div className={styles.irmaContent}>
        <div className="flex flex-wrap gap-4 justify-content-between mb-1">
          <Card className="chart-card shadow-none m-0 p-0 border-noround">
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

          <Card className="chart-card shadow-none m-0 p-0 border-noround">
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
          <Card className="chart-card shadow-none m-0 p-0 w-3 border-noround">
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
        <div className="flex m-0 p-0 justify-content-between gap-4">
          <div className="w-full  m-0 p-0 ">
            <h3 style={{ margin: 0, padding: 0, color: 'white' }}>Tabela 1: Dados de coleta</h3>
            <TableForDashboard />
          </div>
          <div className="w-full   m-0 p-0 ">
            <h3 style={{ margin: 0, padding: 0, color: 'white' }}>Tabela 2: Logs no servidor</h3>
            <LogsTable />
          </div>
        </div>
      </div>
    </div>
  );
};
