'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ jobCounts }) {
	// Convert jobCounts object into Chart.js format
	const data = {
		labels: Object.keys(jobCounts),
		datasets: [
			{
				data: Object.values(jobCounts),
				backgroundColor: [
					'#ff6384',
					'#36a2eb',
					'#ffce56',
					'#4bc0c0',
					'#9966ff',
				],
				hoverBackgroundColor: [
					'#ff4c74',
					'#2496d8',
					'#fcca40',
					'#3caea3',
					'#7d5fff',
				],
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
	};

	return (
		<div className='w-full h-[300px]'>
			<h1 className='text-2xl'>Visiual Breakdown</h1>
			<Pie data={data} options={options} />
		</div>
	);
}
