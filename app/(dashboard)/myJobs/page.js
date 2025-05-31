'use client';

import GridList from '@/components/gridList';
import { useEffect, useState } from 'react';
import { getJobs as apiGetJobs } from '@/lib/api';
import useJobs from '@/hooks/useJobs';

export default function MyJobs() {
	const { jobs } = useJobs();
	const [searchQuery, setSearchQuery] = useState('');

	const filteredJobs = jobs.filter(
		(job) =>
			job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.company.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<div className='w-full md:w-1/4 mb-5'>
					<label
						htmlFor='search'
						className='block text-sm/6 font-medium text-gray-900'
					>
						Quick search
					</label>
					<div className='mt-2'>
						<div className='flex rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500'>
							<input
								id='search'
								name='search'
								type='text'
								value={searchQuery}
								onChange={handleSearchChange}
								className='block grow px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
							/>
							<div className='flex py-1.5 pr-1.5'>
								<kbd className='inline-flex items-center rounded-sm border border-gray-200 px-1 font-sans text-xs text-gray-400'>
									⌘K
								</kbd>
							</div>
						</div>
					</div>
				</div>
				<GridList items={filteredJobs} itemType='job' />
			</div>
		</>
	);
}
