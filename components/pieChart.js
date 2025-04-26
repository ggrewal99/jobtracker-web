'use client';

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import statuses from '@/constants/jobStatus';

// Register necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ jobCounts }) {
	// Convert jobCounts object into Chart.js format
	const data = {
		labels: Object.keys(jobCounts).map((key) => statuses[key].displayName),
		datasets: [
			{
				data: Object.values(jobCounts),
				backgroundColor: Object.keys(jobCounts).map(
					(key) => statuses[key].hexColor
				),
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
	};

	console.log('jobCounts', jobCounts);

	return (
		<div className='w-full h-[300px]'>
			<h1 className='text-2xl'>Visiual Breakdown</h1>
			{Object.entries(jobCounts).every(([key, value]) => value === 0) ? (
				<div className='lg:mt-3 sm:mt-2'>
					<h1 className='text-gray-500 text-sm'>
						Add more Jobs to see data here.
					</h1>
				</div>
			) : (
				<Pie data={data} options={options} />
			)}
		</div>
	);
}
