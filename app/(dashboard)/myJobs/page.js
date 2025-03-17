'use client';

import GridList from '@/components/gridList';
import { useEffect, useState } from 'react';
import { getJobs as apiGetJobs } from '@/lib/api';
import useJobs from '@/hooks/useJobs';

export default function MyJobs() {
	const { jobs } = useJobs();

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
