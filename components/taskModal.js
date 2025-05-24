'use client';
import TaskForm from './taskForm';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

export default function TaskModal({
	selectedTask,
	open,
	setOpen,
	onTaskUpdated,
}) {
	return (
		<Dialog open={open} onClose={setOpen} className='relative z-10'>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in'
			/>

			<div className='fixed inset-0 z-10 w-screen h-screen overflow-y-auto'>
				<div className='flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8'>
					<DialogPanel
						transition
						className='w-full max-w-[90vw] sm:max-w-md lg:max-w-lg relative transform rounded-lg bg-white shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[enter]:ease-out data-[leave]:duration-200 data-[leave]:ease-in sm:data-[closed]:scale-95'
					>
						<div className='lg:-translate-x-1/4'>
							<TaskForm
								selectedTask={selectedTask}
								onTaskUpdated={onTaskUpdated}
								setOpen={setOpen}
							/>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
