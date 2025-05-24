// In your GridList component
import { useState, useEffect } from 'react';
import statuses from '@/constants/jobStatus';
import useSidebar from '@/hooks/useSidebar';
import NewJob from '@/components/newJob';
import { ClockIcon } from '@heroicons/react/20/solid';
import taskTypes from '@/constants/tasks';
import TaskModal from './taskModal';

export default function GridList({ items: allItems, itemType, onTaskUpdated }) {
	// itemType = 'job' | 'task'

	const [visibleItems, setVisibleItems] = useState([]);
	const [displayCount, setDisplayCount] = useState(9);
	const [selectedTask, setSelectedTask] = useState(null);
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const { setSidebarOpen, setSidebarContent, setSidebarTitle } = useSidebar();

	useEffect(() => {
		// Show initial set of items
		setVisibleItems(allItems.slice(0, displayCount));
	}, [allItems, displayCount]);

	const handleItemClick = (item) => {
		if (itemType == 'job') {
			setSidebarOpen(true);
			setSidebarTitle('Edit Job');
			setSidebarContent(<NewJob exisitingJob={item} />);
		} else if (itemType == 'task') {
			setSelectedTask(item);
			setOpenTaskModal(true);
		}
	};

	const loadMore = () => {
		const newDisplayCount = displayCount + 9;
		setDisplayCount(newDisplayCount);
		setVisibleItems(allItems.slice(0, newDisplayCount));
	};

	const hasMore = allItems.length > visibleItems.length;

	return (
		<div className='space-y-6'>
			{allItems.length === 0 ?? (
				<div className='flex items-center justify-center'>
					<p className='text-gray-500'>Nothing here yet.</p>
				</div>
			)}
			<div className='grid grid-cols-1 gap-4 sm:grid-cols-3 cursor-pointer'>
				{visibleItems.map((item) => (
					<div
						key={item._id}
						onClick={() => handleItemClick(item)}
						className='relative select-none flex items-start space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 hover:border-blue-400'
					>
						{itemType === 'job' && (
							<>
								<div className='min-w-0 flex-1'>
									<div>
										<p className='text-sm font-bold text-gray-900'>
											{item.company}
										</p>
										<p className='text-sm text-gray-500'>
											{item.position}
										</p>
									</div>
								</div>
								<p
									className={`text-sm capitalize py-1 px-2 text-white rounded ${
										statuses[item.status].bgColor
									}`}
								>
									{statuses[item.status].displayName}
								</p>
							</>
						)}

						{itemType === 'task' && (
							<div className='min-w-0 flex-1'>
								<div>
									<p className='text-sm font-bold text-gray-900'>
										{item.title}
									</p>
									<p className='text-lg text-gray-900'>
										{item.notes}
									</p>
									<div className='flex justify-between'>
										<div
											className='text-xs mt-1 flex border border-gray-200 rounded-md p-1 bg-gray-100 w-fit'
											onClick={() =>
												handleItemClick(item)
											}
										>
											<span>
												<ClockIcon className='h-4 w-4 me-1' />
											</span>
											{new Date(
												item.dueDateTime
											).toLocaleString('en-GB', {
												day: '2-digit',
												month: 'long',
												year: 'numeric',
												hour: 'numeric',
												minute: '2-digit',
												hour12: true,
											})}
										</div>
										<p className='text-sm text-gray-500 mt-1'>
											{
												taskTypes[item.taskType]
													?.displayName
											}
										</p>
									</div>
								</div>
							</div>
						)}
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
			<TaskModal
				open={openTaskModal}
				setOpen={setOpenTaskModal}
				selectedTask={selectedTask}
				onTaskUpdated={onTaskUpdated}
			/>
		</div>
	);
}
