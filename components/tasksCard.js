'use client';

import { getTasks } from '@/lib/api';
import { useEffect, useState } from 'react';
import { format, parseISO, isValid } from 'date-fns';
import taskTypes from '@/constants/tasks';
import Link from 'next/link';
import {
	ArrowTopRightOnSquareIcon,
	LinkIcon,
} from '@heroicons/react/24/outline';

export default function TasksCard({ upcomingTasks }) {
	const [tasks, setTasks] = useState([]);

	const fetchTasks = async () => {
		try {
			const response = await getTasks();
			return response;
		} catch (error) {
			console.error('Error fetching tasks:', error);
			return [];
		}
	};

	useEffect(() => {
		// If upcomingTasks prop is provided, use it directly
		if (upcomingTasks) {
			// Filter for non-completed tasks and limit to 6
			const nonCompletedTasks = upcomingTasks
				.filter((task) => !task.completed)
				.slice(0, 6);
			setTasks(nonCompletedTasks);
		} else {
			// Otherwise, fetch tasks internally (backward compatibility)
			const loadTasks = async () => {
				const tasks = await fetchTasks();
				// Filter for non-completed tasks and limit to 6
				const nonCompletedTasks = tasks
					.filter((task) => !task.completed)
					.slice(0, 6);
				setTasks(nonCompletedTasks);
			};
			loadTasks();
		}
	}, [upcomingTasks]);

	return (
		<div className='border border-gray-600 bg-gray-800 rounded-lg'>
			<div className='sm:flex sm:items-center p-3 top-0 z-20'>
				<div className='sm:flex-auto'>
					<h1 className='text-xl md:text-2xl text-gray-100'>
						Upcoming Tasks (Next 7 days)
					</h1>
				</div>
			</div>
			<div className='mt-0 flow-root h-48 md:min-h-36 md:max-h-72 overflow-auto'>
				<div className='inline-block min-w-full align-middle'>
					<table className='min-w-full divide-y divide-gray-600'>
						<thead className='sticky top-0 bg-gray-800 z-10'>
							<tr>
								<th
									scope='col'
									className='py-3.5 pr-3 pl-3 text-left text-sm font-semibold text-gray-100'
								>
									Title
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'
								>
									Due
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'
								>
									Type
								</th>
							</tr>
						</thead>
						<tbody className='bg-gray-800'>
							{tasks.length > 0 ? (
								tasks.map((task, index) => (
									<tr
										key={index}
										className='even:bg-gray-700'
									>
										<td className='py-4 pr-3 pl-3 text-sm font-medium whitespace-nowrap text-gray-100 sm:pl-3'>
											{task.title}
										</td>
										<td
											className={`px-3 py-4 text-sm whitespace-nowrap ${
												new Date(task.dueDateTime) <=
													new Date() &&
												!task.completed
													? 'text-red-400'
													: 'text-gray-300'
											}`}
										>
											{task.dueDateTime &&
											isValid(parseISO(task.dueDateTime))
												? format(
														parseISO(
															task.dueDateTime
														),
														"dd MMM yyyy 'at' h:mm a"
												  )
												: 'No due date'}
										</td>
										<td className='px-3 py-4 text-sm whitespace-nowrap text-gray-300'>
											{
												taskTypes[task.taskType]
													.displayName
											}
										</td>
									</tr>
								))
							) : (
								<tr>
									<td
										colSpan='3'
										className='py-4 pr-3 pl-4 text-sm text-center whitespace-nowrap text-gray-300 sm:pl-3'
									>
										No incomplete tasks found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
				</div>
			</div>
			<div className='flex justify-center w-full'>
				<Link
					href='/myTasks'
					className='rounded-md text-blue-400 px-3 py-2 mb-2 text-center text-sm font-semibold flex items-center justify-center hover:bg-blue-900 hover:text-blue-300 transition-colors'
				>
					View All on Tasks Page
					<span>
						<ArrowTopRightOnSquareIcon className='h-4 w-4' />
					</span>
				</Link>
			</div>
		</div>
	);
}
