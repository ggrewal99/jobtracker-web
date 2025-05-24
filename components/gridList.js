// In your GridList component
import { useState, useEffect } from 'react';
import statuses from '@/constants/jobStatus';
import useSidebar from '@/hooks/useSidebar';
import NewJob from '@/components/newJob';

export default function GridList({ items: allItems, itemType }) {
	// itemType = 'job' | 'task'

	const [visibleItems, setVisibleItems] = useState([]);
	const [displayCount, setDisplayCount] = useState(9);
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
						className='relative select-none flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs focus-within:ring-2 focus-within:ring-blue-400 focus-within:ring-offset-2 hover:border-gray-400'
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
									<p className='text-sm text-gray-500'>
										{item.notes}
									</p>
									<p className='text-sm text-gray-500'>
										{item.taskType}
									</p>
									<p>{item.dueDateTime}</p>
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
		</div>
	);
}
