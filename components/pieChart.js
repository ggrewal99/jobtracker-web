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
		<div className='pb-8 md:pb-0 flex-col justify-center items-center w-full rounded-xl bg-gray-800 border border-gray-600'>
			<h1 className='text-xl md:text-2xl p-3 text-gray-100'>
				Visiual Breakdown
			</h1>
			{Object.entries(jobCounts).every(([key, value]) => value === 0) ? (
				<div className='lg:mt-3 sm:mt-2'>
					<h1 className='text-gray-300 text-sm'>
						Add more Jobs to see data here.
					</h1>
				</div>
			) : (
				<div className='h-[300px] md:h-[300px] pb-2'>
					<Pie data={data} options={options} />
				</div>
			)}
		</div>
	);
}
