'use client';

import { Loading } from './loading';

export default function Stats({ jobCounts, totalJobs }) {
	console.log('stats', jobCounts);

	return (
		<div className='bg-white border border-gray-200 rounded-lg'>
			<h1 className='text-xl md:text-2xl p-3'>Overview</h1>
			<dl className='mx-auto w-full grid grid-cols-1 gap-px bg-gray-900/5 md:grid-cols-3 lg:grid-cols-5'>
				{Object.keys(jobCounts).length === 0 ? (
					<div className='flex items-center justify-center h-screen'>
						<Loading />
					</div>
				) : (
					<>
						{Object.entries(jobCounts).map(([status, count]) => (
							<div
								key={status}
								className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-2 py-4 md:px-4 md:py-10 sm:px-6 xl:px-8'
							>
								<dt className='text-sm font-medium text-gray-500 capitalize'>
									{status}
								</dt>
								<dd className='w-full flex-none text-xl md:text-3xl font-medium tracking-tight text-gray-900'>
									{count}
								</dd>
							</div>
						))}
						<div
							key='total-jobs'
							className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-2 py-4 md:px-4 md:py-10 sm:px-6 xl:px-8'
						>
							<dt className='text-sm font-semibold text-gray-500 capitalize'>
								Total
							</dt>
							<dd className='w-full flex-none text-xl md:text-3xl font-bold tracking-tight text-gray-900'>
								{totalJobs}
							</dd>
						</div>
					</>
				)}
			</dl>
		</div>
	);
}
