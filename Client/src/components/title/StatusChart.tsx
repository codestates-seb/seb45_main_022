import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { Status } from '../../api/user';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface Props {
  status: Status[];
}

const StatusChart = ({ status }: Props) => {
  const [statusNames, setStatusNames] = useState<string[]>([]);
  const [statusLevels, setStatusLevels] = useState<number[]>([]);

  useEffect(() => {
    const statusNameArray = status.map((stat) => stat.statName);
    const statusLevelArray = status.map((stat) => stat.statLevel);
    setStatusNames(statusNameArray);
    setStatusLevels(statusLevelArray);
  }, [status]);

  return (
    <Radar
      options={{
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            enabled: false,
          },
        },
        scales: {
          r: {
            pointLabels: {
              font: {
                size: 25,
                weight: 'bold',
              },
            },
            ticks: {
              display: false,
            },
          },
        },
      }}
      data={{
        labels: statusNames || [],
        datasets: [
          {
            label: '레벨',
            data: statusLevels,
            backgroundColor: '#b19d80',
            borderColor: '#000',
            borderWidth: 5,
            borderJoinStyle: 'round',
            pointStyle: false,
          },
        ],
      }}
    />
  );
};

export default StatusChart;
