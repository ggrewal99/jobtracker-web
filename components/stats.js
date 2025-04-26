'use client';

import { Loading } from './loading';

export default function Stats({ jobCounts }) {
	console.log('stats', jobCounts);

	return (
		<>
			<h1 className='text-2xl'>Overview</h1>
			<dl className='mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-4'>
				{Object.keys(jobCounts).length === 0 ? (
					<div className='flex items-center justify-center h-screen'>
						<Loading />
					</div>
				) : (
					Object.entries(jobCounts).map(([status, count]) => (
						<div
							key={status}
							className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8'
						>
							<dt className='text-sm/6 font-medium text-gray-500 capitalize'>
								{status}
							</dt>
							<dd className='w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900'>
								{count}
							</dd>
						</div>
					))
				)}
			</dl>
		</>
	);
}
