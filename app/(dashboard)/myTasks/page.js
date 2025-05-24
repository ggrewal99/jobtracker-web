'use client';
import TaskForm from '@/components/taskForm';
import GridList from '@/components/gridList';
import { useEffect, useState } from 'react';
import { getTasks } from '@/lib/api';

export default function myTasks() {
	const [tasks, setTasks] = useState([]);
	const [selectedTask, setSelectedTask] = useState(null);

	const fetchTasks = async () => {
		try {
			const fetchedTasks = await getTasks();
			setTasks(fetchedTasks);
		} catch (error) {
			console.error('Failed to fetch tasks:', error);
		}
	};

	const addTask = (newTask) => {
		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const updateTaskInList = () => {
		fetchTasks();
	};

	useEffect(() => {
		fetchTasks();
	}, []);
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<h2 className='text-left text-xl font-bold tracking-tight text-gray-900 mb-8'>
					My Tasks
				</h2>
				<TaskForm onTaskCreated={addTask} />
			</div>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<GridList
					items={tasks}
					itemType='task'
					onTaskUpdated={updateTaskInList}
				/>
			</div>
		</>
	);
}
