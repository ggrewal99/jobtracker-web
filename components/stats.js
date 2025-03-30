'use client';
import useJobs from '@/hooks/useJobs';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function Stats({ stats }) {
	return (
		<>
			<h1 className='text-2xl'>Overview</h1>
			<dl className='mx-auto grid grid-cols-1 gap-px bg-gray-900/5 sm:grid-cols-2 lg:grid-cols-5'>
				{stats.map((stat) => (
					<div
						key={stat.name}
						className='flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8'
					>
						<dt className='text-sm/6 font-medium text-gray-500'>
							{stat.name}
						</dt>
						<dd className='w-full flex-none text-3xl/10 font-medium tracking-tight text-gray-900'>
							{stat.value}
						</dd>
					</div>
				))}
			</dl>
		</>
	);
}
