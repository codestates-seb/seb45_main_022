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

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

interface Props {
  statusNames: string[];
  statusLevels: number[];
}

const StatusChart = ({ statusNames, statusLevels }: Props) => {
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
