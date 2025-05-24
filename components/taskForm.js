'use client';

import { useState } from 'react';
import { CalendarIcon, ChevronDownIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, set, parse } from 'date-fns';
import TimeCombobox from '@/components/timeCombobox';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import taskTypes from '@/constants/tasks';
import { addNewTask } from '@/lib/api';
import useAlert from '@/hooks/useAlert';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function TaskForm({ onTaskCreated }) {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);
	const [taskType, setTaskType] = useState('select');
	const { setShowAlert, setAlertMessage, setAlertType } = useAlert();

	const displayDate = selectedDate
		? format(selectedDate, 'MMM dd, yyyy')
		: 'Due date';

	const today = new Date();

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
			e.target.reset();
			setTitle('');
			setDescription('');
			setSelectedDate(null);
			setSelectedTime(null);
			setTaskType('select');
			console.log('Task created:', createdTask);

			onTaskCreated(createdTask.task);
		} catch (error) {
			console.error('Error creating task:', error);
			setAlertMessage('Failed to create task.');
			setAlertType('error');
			setShowAlert(true);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='relative lg:w-3xl sm:w-full mx-0 lg:mx-auto'
		>
			<div className='rounded-lg bg-white outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500'>
				<label htmlFor='title' className='sr-only'>
					Title
				</label>
				<input
					id='title'
					name='title'
					type='text'
					placeholder='Title'
					required
					onChange={(e) => setTitle(e.target.value)}
					className='block w-full px-3 pt-2.5 text-lg font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none'
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
					onChange={(e) => setDescription(e.target.value)}
					className='block w-full resize-none px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
					defaultValue={''}
				/>

				{/* Spacer element to match the height of the toolbar */}
				<div aria-hidden='true'>
					<div className='py-2'>
						<div className='h-9' />
					</div>
					<div className='h-px' />
					<div className='py-2'>
						<div className='py-px'>
							<div className='h-9' />
						</div>
					</div>
				</div>
			</div>

			<div className='absolute inset-x-px bottom-0'>
				<div className='flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3'>
					<div className='relative flex items-end'>
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
							className='w-full appearance-none rounded-md bg-white py-1.5 pr-10 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6 invalid:text-gray-500'
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
							className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/4 size-5 text-gray-500 sm:size-4'
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
									className='relative inline-flex items-center rounded-full bg-gray-50 px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-500 hover:bg-gray-100 sm:px-3'
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
											'hidden truncate sm:ml-2 sm:block'
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
					<div>
						<TimeCombobox
							time={selectedTime}
							setTime={setSelectedTime}
						/>
					</div>
				</div>
				<div className='flex items-center justify-end space-x-3 border-t border-gray-200 px-2 py-2 sm:px-3'>
					<div className='shrink-0'>
						<button
							type='submit'
							className='inline-flex items-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
						>
							Create
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
