'use client';

import PieChart from '@/components/pieChart';
import RecentCard from '@/components/recentCard';
import Stats from '@/components/stats';
import useAuth from '@/hooks/useAuth';
import useJobs from '@/hooks/useJobs';

export default function Dashboard() {
	const { user } = useAuth();
	const { jobs, loading } = useJobs();
	const totalJobs = jobs.length;
	const totalPending = jobs.filter((job) => job.status === 'pending').length;
	const totalInProgress = jobs.filter(
		(job) => job.status === 'inProgress'
	).length;
	const totalAccepted = jobs.filter(
		(job) => job.status === 'accepted'
	).length;
	const totalRejected = jobs.filter(
		(job) => job.status === 'rejected'
	).length;

	const jobCounts = {
		pending: totalPending,
		inProgress: totalInProgress,
		accepted: totalAccepted,
		rejected: totalRejected,
	};

	const stats = [
		{
			name: 'Total jobs',
			value: jobs.length,
		},
		{
			name: 'Pending',
			value: totalPending,
		},
		{
			name: 'In Progress',
			value: totalInProgress,
		},
		{
			name: 'Rejected',
			value: totalRejected,
		},
		{
			name: 'Accepted',
			value: totalAccepted,
		},
	];

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<h2 className='text-left text-xl font-semibold tracking-tight text-gray-900'>
					{user ? `Welcome, ${user.firstName}` : ``}
				</h2>
				{loading ? (
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
					<div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-6 md:grid-rows-[auto_1fr] h-screen sm:mt-5 md:mt-12'>
						<div className='col-span-1 sm:col-span-1 lg:col-span-2 border-b border-gray-300'>
							<Stats stats={stats} />
						</div>
						<div className='sm:col-span-1 lg:col-span-1'>
							<PieChart jobCounts={jobCounts} />
						</div>
						<div className='sm:col-span-1 lg:col-span-1'>
							<RecentCard />
						</div>
					</div>
				)}
			</div>
		</>
	);
}
