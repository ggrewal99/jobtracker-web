// In your GridList component
import { useState, useEffect } from 'react';
import statuses from '@/constants/jobStatus';
import useSidebar from '@/hooks/useSidebar';
import NewJob from '@/components/newJob';

export default function GridList({ jobs: allJobs }) {
	const [visibleJobs, setVisibleJobs] = useState([]);
	const [displayCount, setDisplayCount] = useState(9);
	const { setSidebarOpen, setSidebarContent, setSidebarTitle } = useSidebar();

	useEffect(() => {
		// Show initial set of jobs
		setVisibleJobs(allJobs.slice(0, displayCount));
	}, [allJobs, displayCount]);

	const handleJobClick = (job) => {
		setSidebarOpen(true);
		setSidebarTitle('Edit Job');
		setSidebarContent(<NewJob exisitingJob={job} />);
	};

	const loadMore = () => {
		const newDisplayCount = displayCount + 9;
		setDisplayCount(newDisplayCount);
		setVisibleJobs(allJobs.slice(0, newDisplayCount));
	};

	const hasMore = allJobs.length > visibleJobs.length;

	return (
		<div className='space-y-6'>
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-3 cursor-pointer'>
				{visibleJobs.map((job) => (
					<div
						key={job._id}
						onClick={() => handleJobClick(job)}
						className='relative select-none flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 hover:border-gray-400'
					>
						<div className='min-w-0 flex-1'>
							<div>
								<p className='text-sm font-bold text-gray-900'>
									{job.company}
								</p>
								<p className='text-sm text-gray-500'>
									{job.position}
								</p>
							</div>
						</div>
						<p
							className={`text-sm capitalize py-1 px-2 text-white rounded ${
								statuses[job.status].bgColor
							}`}
						>
							{statuses[job.status].displayName}
						</p>
					</div>
				))}
			</div>

			{hasMore && (
				<div className='flex justify-center'>
					<button
						onClick={loadMore}
						className='px-4 py-2 text-white bg-blue-500 hover:bg-blue-400 rounded cursor-pointer flex flex-col'
					>
						Load More
					</button>
				</div>
			)}
		</div>
	);
}
