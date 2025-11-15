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
export default function NewJob({ exisitingJob, onRefresh }) {
	const [position, setPosition] = useState(exisitingJob?.position || '');
	const [company, setCompany] = useState(exisitingJob?.company || '');
	const [status, setStatus] = useState(
		exisitingJob?.status || Object.keys(statuses)[0]
	);
	const [dateApplied, setDateApplied] = useState(
		exisitingJob?.dateApplied
			? new Date(exisitingJob.dateApplied).toISOString().split('T')[0]
			: new Date().toISOString().split('T')[0]
	);
	const [notes, setNotes] = useState(exisitingJob?.notes || '');
	const { setSidebarOpen } = useSidebar();
	const [loading, setLoading] = useState(false);
	const { setShowAlert, setAlertMessage, setAlertType } = useAlert();
	const { setShowModal, setModalContent } = useModal();
	const { setSidebarContent } = useSidebar();

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
					setShowAlert(true);
					setSidebarOpen(false);
					// Refresh jobs list if callback provided
					if (onRefresh) {
						onRefresh();
					}
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
				// capitalize first letter of each word in position and company
				await apiAddNewJob({
					position:
						position.charAt(0).toUpperCase() + position.slice(1),
					company: company.charAt(0).toUpperCase() + company.slice(1),
					status,
					dateApplied: new Date(dateApplied),
					notes,
				});
				setAlertMessage('Job created successfully!');
				// Refresh jobs list if callback provided
				if (onRefresh) {
					onRefresh();
				}
				setSidebarOpen(false);
				// Dispatch custom event for global refresh (e.g., when created from navbar)
				if (typeof window !== 'undefined') {
					window.dispatchEvent(new CustomEvent('jobsUpdated'));
				}
			} else {
				// Update Existing Job
				await apiUpdateJob(
					{
						position:
							position.charAt(0).toUpperCase() +
							position.slice(1),
						company:
							company.charAt(0).toUpperCase() + company.slice(1),
						status,
						dateApplied: new Date(dateApplied),
						notes,
					},
					exisitingJob._id
				);
				setAlertMessage('Job updated successfully!');
				// Refresh jobs list if callback provided
				if (onRefresh) {
					onRefresh();
				}
				setSidebarOpen(false);
				// Dispatch custom event for global refresh
				if (typeof window !== 'undefined') {
					window.dispatchEvent(new CustomEvent('jobsUpdated'));
				}
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

	console.log('exisitingJob date applied', exisitingJob?.dateApplied);

	return (
		<>
			<form onSubmit={handleSubmit}>
				<div className='border-b border-gray-900/10 pb-12'>
					<div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
						<div className='sm:col-span-full'>
							<label
								htmlFor='position'
								className='block text-sm/6 font-medium text-gray-100'
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
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div className='sm:col-span-full'>
							<label
								htmlFor='company'
								className='block text-sm/6 font-medium text-gray-100'
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
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div className='sm:col-span-full'>
							<label
								htmlFor='date-applied'
								className='block text-sm/6 font-medium text-gray-100'
							>
								Date Applied
							</label>
							<div className='mt-2'>
								<input
									id='date-applied'
									name='date-applied'
									type='date'
									required
									value={dateApplied}
									onChange={(e) =>
										setDateApplied(e.target.value)
									}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div className='sm:col-span-full'>
							<label
								htmlFor='status'
								className='block text-sm/6 font-medium text-gray-100'
							>
								Status
							</label>
							<div className='mt-2 grid grid-cols-1'>
								<select
									id='status'
									name='status'
									defaultValue={status}
									onChange={(e) => setStatus(e.target.value)}
									className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-700 py-1.5 pr-8 pl-3 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
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
								className='block text-sm/6 font-medium text-gray-100'
							>
								Notes
							</label>
							<div className='mt-2'>
								<textarea
									id='about'
									name='about'
									rows={3}
									defaultValue={notes}
									onChange={(e) => setNotes(e.target.value)}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
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
							className='text-sm/6 font-semibold text-gray-100 cursor-pointer mr-5'
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
