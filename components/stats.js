'use client';

import { Loading } from './loading';

export default function Stats({ jobCounts, totalJobs }) {
	console.log('stats', jobCounts);

	return (
		<div className='bg-gray-800 border border-gray-600 rounded-lg'>
			<h1 className='text-xl md:text-2xl p-3 text-gray-100'>Overview</h1>
			<dl className='mx-auto w-full grid grid-cols-2 gap-px bg-gray-700/50 md:grid-cols-3 lg:grid-cols-5'>
				{Object.keys(jobCounts).length === 0 ? (
					<div className='flex items-center justify-center h-screen'>
						<Loading />
					</div>
				) : (
					<>
						{Object.entries(jobCounts).map(([status, count]) => (
							<div
								key={status}
								className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-gray-800 px-3 py-4 md:px-4 md:py-10 sm:px-6 xl:px-8'
							>
								<dt className='text-sm font-medium text-gray-400 capitalize'>
									{status}
								</dt>
								<dd className='w-full flex-none text-xl md:text-3xl font-medium tracking-tight text-gray-100'>
									{count}
								</dd>
							</div>
						))}
						<div
							key='total-jobs'
							className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-gray-800 px-3 py-4 md:px-4 md:py-10 sm:px-6 xl:px-8'
						>
							<dt className='text-sm font-semibold text-gray-400 capitalize'>
								Total
							</dt>
							<dd className='w-full flex-none text-xl md:text-3xl font-bold tracking-tight text-gray-100'>
								{totalJobs}
							</dd>
						</div>
					</>
				)}
			</dl>
		</div>
	);
}
