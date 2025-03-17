'use client';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import statuses from '@/constants/jobStatus';
import { useState } from 'react';
import {
	addNewJob as apiAddNewJob,
	updateJob as apiUpdateJob,
	deleteJob as apiDeleteJob,
} from '@/lib/api';
import useAlert from '@/hooks/useAlert';
import useSidebar from '@/hooks/useSidebar';
import useModal from '@/hooks/useModal';
import useJobs from '@/hooks/useJobs';
export default function NewJob({ exisitingJob }) {
	const [position, setPosition] = useState(exisitingJob?.position || '');
	const [company, setCompany] = useState(exisitingJob?.company || '');
	const [status, setStatus] = useState(exisitingJob?.status || 'pending');
	const [description, setDescription] = useState(
		exisitingJob?.description || ''
	);
	const { setSidebarOpen } = useSidebar();
	const [loading, setLoading] = useState(false);
	const { setShowAlert, setAlertMessage, setAlertType } = useAlert();
	const { setShowModal, setModalContent } = useModal();
	const { addJob, updateJob, removeJob } = useJobs();

	const handleDelete = async () => {
		setShowModal(true);
		setModalContent({
			title: 'Delete Job',
			message: 'Are you sure you want to delete this job?',
			btnText: 'Delete Job',
			onConfirm: async () => {
				try {
					await apiDeleteJob(exisitingJob._id);
					setAlertMessage('Job deleted successfully!');
					setAlertType('success');
					removeJob(exisitingJob._id);
					setShowAlert(true);
					setSidebarOpen(false);
				} catch (error) {
					console.error('Something went wrong.', error);
					setAlertMessage('Failed to delete job.');
					setAlertType('error');
					setShowAlert(true);
				}
			},
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			if (!exisitingJob) {
				// Create New Job
				await apiAddNewJob({
					position,
					company,
					status,
					description,
				});
				addJob({
					position,
					company,
					status,
					description,
				});
				setAlertMessage('Job created successfully!');
			} else {
				// Update Existing Job
				await apiUpdateJob(
					{
						position,
						company,
						status,
						description,
					},
					exisitingJob._id
				);
				updateJob({
					position,
					company,
					status,
					description,
					_id: exisitingJob._id,
				});
				setAlertMessage('Job updated successfully!');
			}

			setAlertType('success');
		} catch (error) {
			console.error('Something went wrong.', error);
			if (!exisitingJob) {
				setAlertMessage('Failed to create job.');
			} else {
				setAlertMessage('Failed to update job.');
			}
			setAlertType('error');
		}
		setShowAlert(true);
		setLoading(false);
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
									defaultValue={position}
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
									defaultValue={company}
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
									defaultValue={status}
									onChange={(e) => setStatus(e.target.value)}
									className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								>
									{Object.keys(statuses).map((key) => (
										<option
											key={key}
											value={statuses[key].value}
										>
											{statuses[key].displayName}
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
									defaultValue={description}
									onChange={(e) =>
										setDescription(e.target.value)
									}
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>
					</div>
				</div>
				<div className='mt-6 flex items-center justify-between gap-x-6'>
					<div>
						{exisitingJob && (
							<button
								type='button'
								className='rounded-md text-sm/6 font-semibold bg-red-700 text-white px-3 py-2 hover:bg-red-600 cursor-pointer'
								onClick={handleDelete}
							>
								Delete
							</button>
						)}
					</div>
					<div>
						<button
							type='button'
							className='text-sm/6 font-semibold text-gray-900 cursor-pointer mr-5'
							onClick={() => setSidebarOpen(false)}
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
				</div>
			</form>
		</>
	);
}
