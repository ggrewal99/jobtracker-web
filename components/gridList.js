import { useState, useEffect } from 'react';
import statuses from '@/constants/jobStatus';
import useSidebar from '@/hooks/useSidebar';
import NewJob from '@/components/newJob';
import {
	ClockIcon,
	CheckIcon,
	XMarkIcon,
	TrashIcon,
} from '@heroicons/react/20/solid';
import taskTypes from '@/constants/tasks';
import TaskModal from './taskModal';
import { updateTask } from '@/lib/api';
import useAlert from '@/hooks/useAlert';
import useModal from '@/hooks/useModal';
import useJobs from '@/hooks/useJobs';
import { format } from 'date-fns';
import { deleteMultipleJobs, deleteMultipleTasks } from '@/lib/api';

export default function GridList({ items: allItems, itemType, onTaskUpdated }) {
	// itemType = 'job' | 'task'

	const [visibleItems, setVisibleItems] = useState([]);
	const [displayCount, setDisplayCount] = useState(9);
	const [selectedTask, setSelectedTask] = useState(null);
	const [selectedItems, setSelectedItems] = useState([]);
	const [openTaskModal, setOpenTaskModal] = useState(false);
	const { setSidebarOpen, setSidebarContent, setSidebarTitle } = useSidebar();
	const { setShowAlert, setAlertMessage, setAlertType } = useAlert();
	const { setShowModal, setModalContent } = useModal();
	const { removeMultipleJobs } = useJobs();

	useEffect(() => {
		// Show initial set of items
		setVisibleItems(allItems.slice(0, displayCount));
	}, [allItems, displayCount]);

	const handleItemClick = (item) => {
		if (selectedItems.length > 0) {
			// If there are selected items, toggle selection
			handleSelectItem(null, item);
			return;
		}
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

	const handleCheckboxChange = async (item, e) => {
		e.stopPropagation(); // Prevent triggering handleItemClick

		try {
			if (itemType !== 'task') {
				throw new Error('Checkbox can only be changed for tasks.');
			}
			const isItemCompleted = item.completed ? false : true;
			await updateTask({ completed: isItemCompleted }, item._id);
			setShowAlert(true);
			setAlertMessage(
				`Task marked as ${
					isItemCompleted ? 'completed' : 'not completed'
				}.`
			);
			setAlertType('success');
			const updatedTask = { ...item, completed: true };
			onTaskUpdated(updatedTask);
		} catch (error) {
			console.error('Error updating task:', error);
			setShowAlert(true);
			setAlertMessage('Something went wrong.');
			setAlertType('error');
			return;
		}
	};

	const handleSelectItem = (e, item) => {
		if (e !== null) e.stopPropagation();
		if (selectedItems.includes(item._id)) {
			setSelectedItems(selectedItems.filter((id) => id !== item._id));
		} else {
			setSelectedItems([...selectedItems, item._id]);
		}
	};

	const handleDeleteSelected = () => {
		// Implement delete functionality here
		setShowModal(true);
		setModalContent({
			title: 'Delete Selected',
			message: `Are you sure you want to delete ${selectedItems.length} selected item(s)?`,
			btnText: 'Delete Selected',
			onConfirm: async () => {
				// Implement delete functionality here
				try {
					if (itemType === 'job') {
						await deleteMultipleJobs(selectedItems);
						removeMultipleJobs(selectedItems);
					} else if (itemType === 'task') {
						await deleteMultipleTasks(selectedItems);
						onTaskUpdated();
					}
					setShowAlert(true);
					setAlertMessage('Selected items deleted successfully!');
					setAlertType('success');
					setSelectedItems([]);
				} catch (error) {
					console.error('Error deleting selected items:', error);
					setShowAlert(true);
					setAlertMessage('Failed to delete selected items.');
					setAlertType('error');
				}
				setSelectedItems([]);
				setShowModal(false);
			},
		});
	};

	const hasMore = allItems.length > visibleItems.length;

	return (
		<div className='space-y-6 relative overflow-visible'>
			{allItems.length === 0 ?? (
				<div className='flex items-center justify-center'>
					<p className='text-gray-500'>Nothing here yet.</p>
				</div>
			)}

			{selectedItems.length > 0 && (
				<div className='static md:absolute -top-15 right-2 flex items-center justify-start md:justify-end mb-4 gap-2'>
					<div className='text-sm text-gray-500'>
						{selectedItems.length} item(s) selected
					</div>
					<div className='flex items-center gap-2'>
						<div className='relative group'>
							<button
								onClick={handleDeleteSelected}
								className='px-4 py-2 text-white bg-red-500 hover:bg-red-400 rounded cursor-pointer'
							>
								<TrashIcon className='h-5 w-5' />
							</button>
							<span className='absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap'>
								Delete selected
							</span>
						</div>
						<div className='relative group'>
							<button
								onClick={() => setSelectedItems([])}
								className='px-4 py-2 text-white bg-gray-500 hover:bg-gray-400 rounded cursor-pointer'
							>
								<XMarkIcon className='h-5 w-5' />
							</button>
							<span className='absolute bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap'>
								Clear selection
							</span>
						</div>
					</div>
				</div>
			)}

			<div className='grid grid-cols-1 gap-4 md:grid-cols-4 cursor-pointer'>
				{visibleItems.map((item) => (
					<div
						key={item._id}
						onClick={() => handleItemClick(item)}
						className={`relative select-none flex items-start space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-xs hover:border-gray-500 group ${
							selectedItems.includes(item._id)
								? 'border-black ring-2 ring-black'
								: ''
						}`}
					>
						<div
							className={`absolute -top-2 -right-5 z-10 transition-opacity ${
								selectedItems.length > 0
									? 'opacity-100'
									: 'opacity-0 group-hover:opacity-100'
							}`}
							onClick={(e) => handleSelectItem(e, item)}
						>
							<input
								type='checkbox'
								checked={selectedItems.includes(item._id)}
								readOnly
								className='h-5 w-5 text-gray-800 border-gray-300 focus:ring-black cursor-pointer'
							/>
						</div>
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
										<p className='text-xs text-gray-500'>
											{format(
												item.dateApplied,
												'dd MMM yyyy'
											)}
										</p>
									</div>
								</div>
								<p
									className={`text-sm capitalize py-1 px-2 text-white rounded self-center ${
										statuses[item.status].bgColor
									}`}
								>
									{statuses[item.status].displayName}
								</p>
							</>
						)}

						{itemType === 'task' && (
							<div className='min-w-0 flex-1 mb-3'>
								<div
									className={`${
										item.completed
											? 'opacity-50 line-through'
											: ''
									}`}
								>
									<p className='text-sm font-bold text-gray-900'>
										{item.title}
									</p>
									<p className='text-sm text-gray-900 text-ellipsis overflow-hidden whitespace-nowrap'>
										{item.notes}
									</p>
									<div className='flex justify-between'>
										<div
											className={`text-xs mt-1 flex border border-gray-200 rounded-md p-1 bg-gray-100 w-fit ${
												new Date(item.dueDateTime) <
													new Date() &&
												!item.completed
													? 'text-red-500'
													: 'text-gray-700'
											}`}
											onClick={() =>
												handleItemClick(item)
											}
										>
											<span>
												<ClockIcon className='h-4 w-4 me-1' />
											</span>
											{format(
												item.dueDateTime,
												"dd MMM yyyy 'at' h:mm a"
											)}
										</div>
										<p className='text-sm text-gray-500 mt-1'>
											{
												taskTypes[item.taskType]
													?.displayName
											}
										</p>
									</div>
								</div>
								<div className='absolute bottom-2 left-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity group/icon cursor-pointer hover:bg-gray-200 rounded-full flex items-center justify-center'>
									{!item.completed ? (
										<>
											<CheckIcon
												className='h-6 w-6 text-gray-600'
												onClick={(e) =>
													handleCheckboxChange(
														item,
														e
													)
												}
											/>
											<span className='absolute bottom-8 left-1/2 text-nowrap transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none'>
												Mark as completed
											</span>
										</>
									) : (
										<>
											<XMarkIcon
												className='h-6 w-6 text-gray-600'
												onClick={(e) =>
													handleCheckboxChange(
														item,
														e
													)
												}
											/>
											<span className='absolute bottom-8 left-1/2 text-nowrap transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/icon:opacity-100 transition-opacity pointer-events-none'>
												Mark as not completed
											</span>
										</>
									)}
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
