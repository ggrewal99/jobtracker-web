'use client';

import GridList from '@/components/gridList';
import { useEffect, useState } from 'react';
import { getJobs as apiGetJobs } from '@/lib/api';

const jobs = [
	{
		position: 'Software Developer',
		company: 'Alphabet Inc',
		status: 'pending',
	},
	{
		position: 'Software Engineer',
		company: 'Apple ',
		status: 'inProgress',
	},
];

export default function MyJobs() {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		getJobs();
	}, []);

	const getJobs = async () => {
		try {
			const data = await apiGetJobs();
			setJobs(data);
		} catch (error) {
			console.error('Failed to fetch jobs:', error);
		}
	};
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<h2 className='text-left text-xl font-bold tracking-tight text-gray-900 mb-8'>
					Jobs List
				</h2>
				<GridList jobs={jobs} />
			</div>
		</>
	);
}
