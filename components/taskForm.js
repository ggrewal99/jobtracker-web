'use client';

import { useState } from 'react';
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, set, parse } from 'date-fns';
import TimeCombobox from '@/components/timeCombobox';
import taskTypes from '@/constants/tasks';
import { addNewTask, updateTask, deleteTask } from '@/lib/api';
import useAlert from '@/hooks/useAlert';
import useModal from '@/hooks/useModal';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function TaskForm({
	onTaskCreated,
	selectedTask,
	onTaskUpdated,
	setOpen,
}) {
	const [title, setTitle] = useState(selectedTask?.title || '');
	const [description, setDescription] = useState(selectedTask?.notes || '');
	const [selectedDate, setSelectedDate] = useState(
		selectedTask?.dueDateTime ? new Date(selectedTask.dueDateTime) : null
	);
	const [selectedTime, setSelectedTime] = useState(null);
	const [initialTime, setInitialTime] = useState(
		selectedTask?.dueDateTime
			? format(new Date(selectedTask.dueDateTime), 'h:mm a')
			: null
	);
	const [taskType, setTaskType] = useState(
		selectedTask?.taskType || 'select'
	);
	const { setShowAlert, setAlertMessage, setAlertType } = useAlert();
	const { setShowModal, setModalContent } = useModal();

	const displayDate = selectedDate
		? format(selectedDate, 'MMM dd, yyyy')
		: 'Due date';

	const today = new Date();
	console.log('selectedTime:', selectedTime);

	const resetForm = (e) => {
		e.target.reset();
		setTitle('');
		setDescription('');
		setSelectedDate(null);
		setSelectedTime(null);
		setTaskType('select');
	};

	const handleDelete = async () => {
		setShowModal(true);
		setModalContent({
			title: 'Delete Task',
			message: 'Are you sure you want to delete this task?',
			btnText: 'Delete Task',
			onConfirm: async () => {
				try {
					await deleteTask(selectedTask._id);
					setAlertMessage('Task deleted successfully!');
					setAlertType('success');
					setShowAlert(true);
					onTaskUpdated();
					setOpen(false);
				} catch (error) {
					console.error('Error deleting task:', error);
					setAlertMessage('Failed to delete task.');
					setAlertType('error');
					setShowAlert(true);
				}
			},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!e.target.title.value || !e.target.description.value) {
			alert('Please fill in all fields.');
			return;
		}
		if (taskType === 'select') {
			alert('Please select a task type.');
			return;
		}
		if (!selectedDate) {
			alert('Please select a due date.');
			return;
		}

		let time, combinedDateTime;
		if (selectedTime) {
			time = parse(selectedTime.name, 'h:mm a', new Date());
			combinedDateTime = set(selectedDate, {
				hours: time.getHours(),
				minutes: time.getMinutes(),
			});
		} else {
			combinedDateTime = selectedDate;
		}

		console.log({
			title: e.target.title.value,
			notes: e.target.description.value,
			taskType,
			dueDateTime: combinedDateTime,
		});

		if (!selectedTask) {
			try {
				const createdTask = await addNewTask({
					title,
					notes: description,
					taskType,
					dueDateTime: combinedDateTime,
				});
				setAlertMessage('Task created successfully!');
				setAlertType('success');
				setShowAlert(true);
				resetForm(e);
				console.log('Task created:', createdTask);

				onTaskCreated(createdTask.task);
			} catch (error) {
				console.error('Error creating task:', error);
				setAlertMessage('Failed to create task.');
				setAlertType('error');
				setShowAlert(true);
			}
		} else {
			try {
				const updatedTask = await updateTask(
					{
						title,
						notes: description,
						taskType,
						dueDateTime: combinedDateTime,
					},
					selectedTask._id
				);
				setAlertMessage('Task updated successfully!');
				setAlertType('success');
				setShowAlert(true);
				resetForm(e);
				console.log('Task updated:', updatedTask);
				onTaskUpdated();
				setOpen(false);
			} catch (error) {
				console.error('Error updating task:', error);
				setAlertMessage('Failed to update task.');
				setAlertType('error');
				setShowAlert(true);
			}
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='relative lg:w-3xl sm:w-full mx-0 lg:mx-auto'
		>
			<div className='bg-white rounded-t-lg'>
				<label htmlFor='title' className='sr-only'>
					Title
				</label>
				<input
					id='title'
					name='title'
					type='text'
					placeholder='Title'
					required
					defaultValue={title}
					onChange={(e) => setTitle(e.target.value)}
					className='block w-full px-3 pt-2.5 text-base md:text-lg font-semibold text-gray-900 placeholder:text-gray-400 focus:outline-none'
				/>
				<label htmlFor='description' className='sr-only'>
					Description
				</label>
				<textarea
					id='description'
					name='description'
					rows={2}
					placeholder='Write a description...'
					required
					defaultValue={description}
					onChange={(e) => setDescription(e.target.value)}
					className='block w-full resize-none px-3 py-1.5 text-sm md:text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 min-h-24'
				/>
			</div>

			<div className=' bg-white rounded-b-lg'>
				<div className='flex flex-col md:flex-row items-start md:justify-end w-full flex-nowrap space-x-2 px-2 py-2 sm:px-3'>
					<div className='relative flex items-end w-full md:w-fit'>
						<label htmlFor='taskType' className='sr-only'>
							Task type
						</label>
						<select
							id='taskType'
							name='taskType'
							defaultValue={taskType}
							onChange={(e) => setTaskType(e.target.value)}
							title='Task type'
							required
							className='appearance-none w-full md:w-fit rounded-md bg-white py-1.5 pr-10 pl-3 mb-2 md:mb-0 text-sm text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 invalid:text-gray-500'
						>
							<option value='select' disabled>
								Select task type
							</option>
							{Object.keys(taskTypes).map((key) => (
								<option key={key} value={taskTypes[key].value}>
									{taskTypes[key].displayName}
								</option>
							))}
						</select>
						<ChevronDownIcon
							aria-hidden='true'
							className='pointer-events-none absolute right-3 top-1/4 md:top-2/5 -translate-y-1/4 size-5 text-gray-500 sm:size-4'
						/>
					</div>
					<div className='relative shrink-0 flex items-end'>
						<label className='sr-only'>
							Add a due date and time
						</label>
						<DatePicker
							selected={selectedDate}
							onChange={(date) => setSelectedDate(date)}
							customInput={
								<button
									type='button'
									className='relative inline-flex items-center rounded-lg bg-gray-50 px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-500 hover:bg-gray-100 sm:px-3'
								>
									<CalendarIcon
										aria-hidden='true'
										className={classNames(
											selectedDate
												? 'text-gray-500'
												: 'text-gray-300',
											'size-5 shrink-0 sm:-ml-1'
										)}
									/>
									<span
										className={classNames(
											selectedDate ? 'text-gray-900' : '',
											'sm:ml-2 sm:block'
										)}
									>
										{displayDate}
									</span>
								</button>
							}
							popperClassName='z-10'
							className='text-sm'
							dateFormat='MMM dd, yyyy'
							placeholderText='Select due date'
							minDate={today}
						/>
					</div>
					<div className='w-full md:w-fit'>
						<TimeCombobox
							time={selectedTime}
							setTime={setSelectedTime}
							initialTime={initialTime}
						/>
					</div>
				</div>
				<div className='flex items-center justify-end space-x-3 px-2 py-2 sm:px-3'>
					<div className='shrink-0 flex gap-2'>
						{selectedTask && (
							<button
								type='button'
								onClick={handleDelete}
								className='rounded-md bg-red-700 text-white px-3 py-2 text-sm font-semibold shadow-xs hover:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
							>
								Delete
							</button>
						)}
						<button
							type='submit'
							className='inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
						>
							{selectedTask ? 'Update' : 'Create'}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
