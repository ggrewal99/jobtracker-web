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
				backgroundColor: [
					statuses.pending.hexColor,
					statuses.inProgress.hexColor,
					statuses.accepted.hexColor,
					statuses.rejected.hexColor,
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
