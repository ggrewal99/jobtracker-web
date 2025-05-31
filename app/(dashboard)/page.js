'use client';

import PieChart from '@/components/pieChart';
import RecentCard from '@/components/recentCard';
import Stats from '@/components/stats';
import useAuth from '@/hooks/useAuth';
import useJobs from '@/hooks/useJobs';
import { useEffect, useState } from 'react';
import statuses from '@/constants/jobStatus';
import TasksCard from '@/components/tasksCard';

export default function Dashboard() {
	const { user, userLoading } = useAuth();
	const { jobs, jobsLoading } = useJobs();
	const initialJobCounts = Object.keys(statuses).reduce((acc, key) => {
		acc[key] = 0;
		return acc;
	}, {});

	const [jobCounts, setJobCounts] = useState(initialJobCounts);

	useEffect(() => {
		if (jobs && jobs.length > 0) {
			const newJobCounts = {};
			for (const key in statuses) {
				newJobCounts[key] = jobs.filter(
					(job) => job.status === key
				).length;
			}

			setJobCounts(newJobCounts);
		}
	}, [jobs]);

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 mx-auto max-w-7xl'>
				<h2 className='text-left text-xl font-semibold tracking-tight text-gray-900'>
					{!userLoading ? `Welcome, ${user?.firstName}` : ``}
				</h2>
				{jobsLoading ? (
					<div className='flex items-center justify-center h-screen'>
						<svg
							className='animate-spin h-10 w-10 text-gray-500'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<path
								fill='none'
								d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'
							/>
							<path
								fill='currentColor'
								d='M12.5 6.5a1.5 1.5 0 1 1-3 .001A7.5 7.5 0 1 0 12.5 6.5z'
							/>
						</svg>
					</div>
				) : (
					<div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-6 md:grid-rows-[auto_1fr] h-fit sm:mt-5 md:mt-12'>
						<div className='col-span-1 sm:col-span-1 lg:col-span-2 border-b border-gray-300'>
							<Stats
								jobCounts={jobCounts}
								totalJobs={jobs.length}
							/>
						</div>
						<div className='sm:col-span-1 lg:col-span-1'>
							<PieChart jobCounts={jobCounts} />
						</div>
						<div className='sm:col-span-1 lg:col-span-1'>
							<RecentCard />
						</div>
						<div className='col-span-1 sm:col-span-1 lg:col-span-2'>
							<TasksCard />
						</div>
					</div>
				)}
			</div>
		</>
	);
}
