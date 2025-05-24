'use client';
import TaskForm from './taskForm';
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
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
				className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
			/>

			<div className='fixed inset-0 z-10 w-screen h-screen overflow-y-auto'>
				<div className='flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className='max-w-fit relative transform rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:w-full data-closed:sm:translate-y-0 data-closed:sm:scale-95'
					>
						<div className='text-center'>
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
