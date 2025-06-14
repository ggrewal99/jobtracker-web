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

export default function TasksCard() {
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
		const loadTasks = async () => {
			const tasks = await fetchTasks();
			// Filter for non-completed tasks and limit to 6
			const nonCompletedTasks = tasks
				.filter((task) => !task.completed)
				.slice(0, 6);
			setTasks(nonCompletedTasks);
		};
		loadTasks();
	}, []);

	return (
		<div className='border border-gray-200 bg-white rounded-lg'>
			<div className='sm:flex sm:items-center p-2 md:p-4 top-0 z-20'>
				<div className='sm:flex-auto'>
					<h1 className='text-xl md:text-2xl'>Upcoming Tasks</h1>
				</div>
			</div>
			<div className='mt-0 flow-root h-48 md:min-h-52 md:max-h-72 overflow-auto'>
				<div className='inline-block min-w-full align-middle'>
					<table className='min-w-full divide-y divide-gray-300'>
						<thead className='sticky top-0 bg-white z-10'>
							<tr>
								<th
									scope='col'
									className='py-3.5 pr-3 pl-2 md:pl-4 text-left text-sm font-semibold text-gray-900'
								>
									Title
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
								>
									Due
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
								>
									Type
								</th>
							</tr>
						</thead>
						<tbody className='bg-white'>
							{tasks.length > 0 ? (
								tasks.map((task, index) => (
									<tr key={index} className='even:bg-gray-50'>
										<td className='py-4 pr-3 pl-2 md:pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-3'>
											{task.title}
										</td>
										<td
											className={`px-3 py-4 text-sm whitespace-nowrap ${
												new Date(task.dueDateTime) <=
													new Date() &&
												!task.completed
													? 'text-red-500'
													: 'text-gray-500'
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
										<td className='px-3 py-4 text-sm whitespace-nowrap text-gray-500'>
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
										className='py-4 pr-3 pl-4 text-sm text-center whitespace-nowrap text-gray-500 sm:pl-3'
									>
										No incomplete tasks found.
									</td>
								</tr>
							)}
						</tbody>
					</table>
					<div className='mt-4 col-span-3 flex justify-center w-full'>
						<Link
							href='/myTasks'
							className='rounded-md text-blue-500 px-3 py-2 text-center text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors'
						>
							View All on Tasks Page
							<span>
								<ArrowTopRightOnSquareIcon className='h-4 w-4' />
							</span>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
