'use client';

import { useState } from 'react';
import { CalendarIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import TimeCombobox from '@/components/timeCombobox';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function TaskForm() {
	const [selectedDate, setSelectedDate] = useState(null);
	const [selectedTime, setSelectedTime] = useState(null);

	const displayDate = selectedDate
		? format(selectedDate, 'MMM dd, yyyy')
		: 'Due date';

	const today = new Date();

	return (
		<form
			action='#'
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
							dateFormat='MMM dd, yyyy, h:mm a'
							placeholderText='Select due date and time'
							minDate={today}
						/>
					</div>
					<div>
						<TimeCombobox
							value={selectedTime}
							setValue={setSelectedTime}
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
