'use client';
import TaskForm from '@/components/taskForm';
import GridList from '@/components/gridList';
import { useEffect, useState } from 'react';
import { getTasks } from '@/lib/api';
import { ChevronDownIcon } from '@heroicons/react/16/solid';

export default function MyTasks() {
	const [tasks, setTasks] = useState([]);
	const [currentTab, setCurrentTab] = useState('Not Completed');

	const fetchTasks = async () => {
		try {
			const fetchedTasks = await getTasks();
			setTasks(fetchedTasks);
		} catch (error) {
			console.error('Failed to fetch tasks:', error);
		}
	};

	const filteredTasks = tasks.filter((task) => {
		if (currentTab === 'All') return true;
		if (currentTab === 'Completed') return task.completed;
		if (currentTab === 'Not Completed') return !task.completed;
		return true;
	});

	const addTask = (newTask) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const updateTaskInList = () => {
		fetchTasks();
	};

	useEffect(() => {
		fetchTasks();
	}, []);

	const tabs = [
		{ name: 'All', current: currentTab === 'All' },
		{ name: 'Completed', current: currentTab === 'Completed' },
		{ name: 'Not Completed', current: currentTab === 'Not Completed' },
	];

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	const handleTabChange = (tabName) => {
		setCurrentTab(tabName);
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<TaskForm onTaskCreated={addTask} />
			</div>

			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<div className='mb-6'>
					<div className='grid grid-cols-1 sm:hidden'>
						<select
							value={currentTab}
							onChange={(e) => handleTabChange(e.target.value)}
							aria-label='Select a tab'
							className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500'
						>
							{tabs.map((tab) => (
								<option key={tab.name} value={tab.name}>
									{tab.name}
								</option>
							))}
						</select>
						<ChevronDownIcon
							aria-hidden='true'
							className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500'
						/>
					</div>
					<div className='hidden sm:block'>
						<nav aria-label='Tabs' className='flex space-x-4'>
							{tabs.map((tab) => (
								<button
									key={tab.name}
									onClick={() => handleTabChange(tab.name)}
									aria-current={
										tab.current ? 'page' : undefined
									}
									className={classNames(
										tab.current
											? 'bg-blue-100 text-blue-600'
											: 'text-gray-500 hover:text-gray-700',
										'rounded-md px-3 py-2 text-sm font-medium cursor-pointer'
									)}
								>
									{tab.name}
								</button>
							))}
						</nav>
					</div>
				</div>
				<GridList
					items={filteredTasks}
					itemType='task'
					onTaskUpdated={updateTaskInList}
				/>
			</div>
		</>
	);
}
