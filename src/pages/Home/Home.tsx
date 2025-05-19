import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DashboardPieChart } from '../../component';
import { TableForDashboard } from '../DashboardsHub';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from '../../component/LoadingSpinner';
import { getDashboardData } from '../../service';
import { useStore } from '@/store';
import styles from '@/app/irma.module.css';
const statusColors = ['#779ECC', '#FFB347', '#7ABD7E', '#FF6961'];
const reasonColors = ['#FF6961', '#FFB347', '#779ECC', '#7ABD7E'];

export const Home = () => {
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const [dataChart, setDataChart] = useState({
    status: [
      { name: 'PENDING', value: 10 },
      { name: 'RECEIVED', value: 5 },
      { name: 'IN_TEST', value: 7 },
      { name: 'APPROVED', value: 8 },
      { name: 'REJECTED', value: 2 },
      { name: 'COMPLETED', value: 30 },
    ],
    profile: [
      { name: 'DEFECT', value: 30 },
      { name: 'DISSATISFACTION', value: 1 },
      { name: 'WRONG_ITEM', value: 1 },
      { name: 'DAMAGED', value: 10 },
      { name: 'WARRANTY_CLAIM', value: 5 },
      { name: 'OTHER', value: 3 },
    ],
  });

  const { userRemote } = useStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        setDataChart(data);
      } catch (error) {
        console.error('Erro ao carregar os dados do usuário');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        <div className="flex flex-wrap gap-4 justify-content-between">
          <Card className="chart-card flex-1 min-w-20rem max-w-30rem shadow-none">
            <DashboardPieChart
              data={dataChart.status}
              colors={statusColors}
              title="Distribuição por Status"
            />
          </Card>
          <Card className="chart-card flex-1 min-w-20rem max-w-30rem shadow-none">
            <DashboardPieChart
              data={dataChart.profile}
              colors={reasonColors}
              title="Distribuição por Razão"
            />
          </Card>
        </div>

        <TableForDashboard />
      </div>
    </div>
  );
};
