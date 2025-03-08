'use client';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import statuses from '@/constants/jobStatus';
import { useState } from 'react';
import { addNewJob as apiAddNewJob } from '@/lib/api';
export default function NewJob() {
	const [position, setPosition] = useState('');
	const [company, setCompany] = useState('');
	const [status, setStatus] = useState('');
	const [description, setDescription] = useState('');
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await apiAddNewJob({
				position,
				company,
				status,
				description,
			});
		} catch (error) {
			console.error('Job creation failed:', error);
		}
		console.log('Form submitted');
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='border-b border-gray-900/10 pb-12'>
					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='sm:col-span-full'>
							<label
								htmlFor='position'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Position
							</label>
							<div className='mt-2'>
								<input
									id='position'
									name='position'
									type='text'
									required
									onChange={(e) =>
										setPosition(e.target.value)
									}
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div className='sm:col-span-full'>
							<label
								htmlFor='company'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Company Name
							</label>
							<div className='mt-2'>
								<input
									id='company'
									name='company'
									type='text'
									required
									onChange={(e) => setCompany(e.target.value)}
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div className='sm:col-span-full'>
							<label
								htmlFor='status'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Status
							</label>
							<div className='mt-2 grid grid-cols-1'>
								<select
									id='status'
									name='status'
									defaultValue='pending'
									onChange={(e) => setStatus(e.target.value)}
									className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								>
									{Object.keys(statuses).map((key) => (
										<option
											key={key}
											value={statuses[key].value}
										>
											{statuses[key].label}
										</option>
									))}
								</select>
								<ChevronDownIcon
									aria-hidden='true'
									className='pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4'
								/>
							</div>
						</div>
						<div className='col-span-full'>
							<label
								htmlFor='about'
								className='block text-sm/6 font-medium text-gray-900'
							>
								Description
							</label>
							<div className='mt-2'>
								<textarea
									id='about'
									name='about'
									rows={3}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='button'
						className='text-sm/6 font-semibold text-gray-900 cursor-pointer'
					>
						Cancel
					</button>
					<button
						type='submit'
						disabled={loading}
						className='rounded-md cursor-pointer bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
					>
						{loading ? 'Loading...' : 'Save'}
					</button>
				</div>
			</form>
		</>
	);
}
