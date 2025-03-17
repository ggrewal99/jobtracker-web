import statuses from '@/constants/jobStatus';
import useSidebar from '@/hooks/useSidebar';
import NewJob from '@/components/newJob';

export default function GridList({ jobs }) {
	const { setSidebarOpen, setSidebarContent, setSidebarTitle } = useSidebar();

	console.log(jobs);

	const handleJobClick = (job) => {
		setSidebarOpen(true);
		setSidebarTitle('Edit Job');
		setSidebarContent(<NewJob exisitingJob={job} />);
	};
	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-3 cursor-pointer'>
			{jobs.map((job) => (
				<div
					key={job._id}
					onClick={() => {
						handleJobClick(job);
					}}
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
	);
}
