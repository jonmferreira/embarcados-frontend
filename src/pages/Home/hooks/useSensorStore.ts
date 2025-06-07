// useSensorStore.ts
import { create } from 'zustand';

interface ISensorItem {
  id: number;
  id_zona: number;
  timestamp: string;
  umidade: number;
  temperatura: number;
}

interface ISensorChartData {
  id: number;
  timestamp: string;
  value: number;
}

interface ILogItem {
  id: number;
  id_zona: number;
  timestamp: string;
  action: string;
  manual: boolean;
}

interface IFormattedLog {
  id: number;
  timestamp: string;
  log: string;
  type: string;
}

interface SensorStore {
  list: ISensorItem[];
  humidityList: ISensorChartData[];
  temperatureList: ISensorChartData[];
  logs: IFormattedLog[];
  setList: (data: ISensorItem[]) => void;
  setLogs: (logs: ILogItem[]) => void;
  startDate?: Date;
  endDate?: Date;
  setDateRange: (dates: Date[]) => void;
  loading: boolean;
  setLoading: (state: boolean) => void;
}

export const useSensorStore = create<SensorStore>((set) => ({
  startDate: undefined,
  endDate: undefined,
  loading: false,
  setLoading: (state) => set({ loading: state }),
  setDateRange: (dates) => {
    set({ startDate: dates[0], endDate: dates[1] });
  },
  list: [],
  humidityList: [],
  temperatureList: [],
  logs: [],
  setList: (data) => {
    set({
      list: data,
      humidityList: data.map((item) => ({
        id: item.id,
        timestamp: item.timestamp,
        value: item.umidade,
      })),
      temperatureList: data.map((item) => ({
        id: item.id,
        timestamp: item.timestamp,
        value: item.temperatura,
      })),
    });
  },
  setLogs: (logs) => {
    set({
      logs: logs.map((log) => ({
        id: log.id,
        timestamp: log.timestamp,
        log: log.action,
        type: log.manual ? 'Manual' : 'Automático',
      })),
    });
  },
}));
