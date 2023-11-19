import { useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import useFetch from '../../hooks/useFetch';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Skeleton from './Skeleton';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HistoryChart = (props) => {
  const { idx } = props;
  // const { id } = useParams();
  // const { response } = useAxios(`coins/${id}/market_chart?vs_currency=usd&days=7`);
  // const { response } = useAxios(`coins/${idx ? idx : id}/market_chart?vs_currency=usd&days=7`);

  //======{using Axios Api}============================
  // const { response } = useAxios(
  //   `coins/${idx}/market_chart?vs_currency=usd&days=7`
  // );

  //======{using Fetch Api}============================
  const { response } = useFetch(
    `coins/${idx}/market_chart?vs_currency=usd&days=7`
  );

  const id = idx;

  if (!response) {
    return (
      <div className="wrapper-container mt-8">
        <Skeleton className="h-72 w-full mb-10" />
      </div>
    );
  }
  const coinChartData = response.prices.map((value) => ({
    x: value[0],
    y: value[1].toFixed(2),
  }));

  const options = {
    responsive: true,
  };
  const data = {
    labels: coinChartData.map((value) => moment(value.x).format('MMM DD')),
    datasets: [
      {
        fill: true,
        label: id,
        data: coinChartData.map((val) => val.y),
        // borderColor: 'rgb(53, 162, 235)',
        // backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: '#4f46e5',
        backgroundColor: '#818cf8',
      },
    ],
  };

  return (
    <div className="w-full mx-auto px-2">
      <Line options={options} data={data} />
    </div>
  );
};

export default HistoryChart;
