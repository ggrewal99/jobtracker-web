import TaskForm from '@/components/taskForm';

export default function myTasks() {
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<h2 className='text-left text-xl font-bold tracking-tight text-gray-900 mb-8'>
					My Tasks
				</h2>
				<TaskForm />
			</div>
		</>
	);
}
