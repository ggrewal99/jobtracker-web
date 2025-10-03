'use client';

import GridList from '@/components/gridList';
import { useState } from 'react';
import useJobs from '@/hooks/useJobs';
import statuses from '@/constants/jobStatus';
import { ChevronDownIcon, CalendarIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, startOfDay, isValid } from 'date-fns';
import { XCircleIcon } from '@heroicons/react/24/solid';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function MyJobs() {
	const { jobs } = useJobs();
	const [searchQuery, setSearchQuery] = useState('');
	const [minDateApplied, setMinDateApplied] = useState(null);
	const [maxDateApplied, setMaxDateApplied] = useState(null);
	const [filterByStatus, setFilterByStatus] = useState('All');

	const today = startOfDay(new Date()); // Normalize to start of day (June 1, 2025, 00:00 AEST)

	const displayMinDate =
		minDateApplied && isValid(minDateApplied)
			? format(minDateApplied, 'MMM dd, yyyy')
			: 'Min date';

	const displayMaxDate =
		maxDateApplied && isValid(maxDateApplied)
			? format(maxDateApplied, 'MMM dd, yyyy')
			: 'Max date';

	const filteredJobs = jobs.filter((job) => {
		const matchesSearch =
			job.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
			job.company.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesStatus =
			filterByStatus === 'All' || job.status === filterByStatus;

		const jobDate = job.dateApplied ? new Date(job.dateApplied) : null;
		if (!jobDate || !isValid(jobDate)) {
			console.warn(`Invalid or missing dateApplied for job:`, job);
			return matchesSearch && matchesStatus; // Include job if no date filters are applied
		}

		const matchesMinDate = minDateApplied
			? startOfDay(jobDate) >= startOfDay(minDateApplied)
			: true;
		const matchesMaxDate = maxDateApplied
			? startOfDay(jobDate) <= startOfDay(maxDateApplied)
			: true;

		return (
			matchesSearch && matchesStatus && matchesMinDate && matchesMaxDate
		);
	});

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleStatusChange = (e) => {
		setFilterByStatus(e.target.value);
	};

	const handleClearFilters = () => {
		setSearchQuery('');
		setMinDateApplied(null);
		setMaxDateApplied(null);
		setFilterByStatus('All');
	};

	const handleClearStatusFilter = () => {
		setFilterByStatus('All');
	};

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-3 py-6 md:px-6 md:py-12 lg:px-8 mx-auto max-w-7xl'>
				<div className='flex flex-col md:flex-row items-center justify-center md:gap-0 mb-5'>
					<div className='mb-5 bg-gray-800 p-3 rounded-lg border border-gray-600 w-full'>
						<span className='text-sm/6 font-semibold text-gray-100 w-fit'>
							Refine Search
						</span>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4 px-2 py-2 rounded-md place-items-center'>
							<div className='flex items-center gap-x-3 w-full'>
								<label
									htmlFor='filterByStatus'
									className='block text-sm/6 font-medium text-gray-100'
								>
									Status
								</label>
								<div className='grid grid-cols-1 w-full'>
									<select
										id='filterByStatus'
										name='filterByStatus'
										value={filterByStatus}
										onChange={handleStatusChange}
										className='col-start-1 row-start-1 w-full appearance-none rounded-md bg-gray-700 py-1.5 pr-8 pl-3 text-xs text-gray-100 outline-1 -outline-offset-1 outline-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
									>
										<option value='All'>All</option>
										{Object.keys(statuses).map((key) => (
											<option key={key} value={key}>
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
							<div className='flex flex-col md:flex-row items-start md:items-center gap-x-3 w-full lg:w-fit'>
								<label className='block text-sm/6 font-medium text-gray-100'>
									Date Applied
								</label>
								<div className='flex flex-row flex-1 gap-x-2 items-center justify-start w-full'>
									<div className='relative shrink-0'>
										<DatePicker
											selected={minDateApplied}
											onChange={(date) =>
												setMinDateApplied(date)
											}
											customInput={
												<button
													type='button'
													className='relative flex gap-2 items-center justify-center rounded-lg bg-gray-700 px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-300 hover:bg-gray-600 sm:px-3 w-full'
												>
													<CalendarIcon
														aria-hidden='true'
														className={classNames(
															minDateApplied
																? 'text-gray-300'
																: 'text-gray-500',
															'size-5 shrink-0 sm:-ml-1'
														)}
													/>
													<span
														className={classNames(
															minDateApplied
																? 'text-gray-100'
																: '',
															'sm:ml-2'
														)}
													>
														{displayMinDate}
													</span>
												</button>
											}
											popperClassName='z-10'
											className='text-sm'
											dateFormat='MMM dd, yyyy'
											placeholderText='Select min date'
										/>
									</div>
									<span className='text-sm/6 font-medium text-gray-100'>
										to
									</span>
									<div className='relative shrink-0'>
										<DatePicker
											selected={maxDateApplied}
											onChange={(date) =>
												setMaxDateApplied(date)
											}
											customInput={
												<button
													type='button'
													className='relative inline-flex gap-2 items-center rounded-lg bg-gray-700 px-2 py-2 text-sm font-medium whitespace-nowrap text-gray-300 hover:bg-gray-600 sm:px-3 w-full'
												>
													<CalendarIcon
														aria-hidden='true'
														className={classNames(
															maxDateApplied
																? 'text-gray-300'
																: 'text-gray-500',
															'size-5 shrink-0 sm:-ml-1'
														)}
													/>
													<span
														className={classNames(
															maxDateApplied
																? 'text-gray-100'
																: '',
															'sm:ml-2 sm:block'
														)}
													>
														{displayMaxDate}
													</span>
												</button>
											}
											popperClassName='z-10'
											className='text-sm'
											dateFormat='MMM dd, yyyy'
											placeholderText='Select max date'
										/>
									</div>
								</div>
							</div>
							<div className='flex flex-col md:flex-row items-start md:items-center min-w-full gap-x-3'>
								<label
									htmlFor='search'
									className='w-fit text-sm/6 font-medium text-gray-100'
								>
									Quick search
								</label>
								<div className='flex-1 w-full'>
									<div className='flex rounded-md bg-gray-700 outline-1 -outline-offset-1 outline-gray-500 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500 w-full'>
										<input
											id='search'
											name='search'
											type='text'
											value={searchQuery}
											onChange={handleSearchChange}
											className='block grow px-3 py-1.5 text-base text-gray-100 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
										/>
										<div className='flex py-1.5 pr-1.5'>
											<kbd className='inline-flex items-center rounded-sm border border-gray-500 px-1 font-sans text-xs text-gray-400'>
												⌘K
											</kbd>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='mt-2 flex items-center justify-start gap-x-3'>
							{filterByStatus !== 'All' ||
							minDateApplied ||
							maxDateApplied ? (
								<>
									<button
										type='button'
										className='rounded-md bg-gray-600 px-2 py-1 text-sm text-gray-200 font-semibold cursor-pointer'
										onClick={handleClearFilters}
									>
										Clear Filters
									</button>
									<p className='text-sm/6 font-medium text-gray-300 ms-2'>
										Applied Filters:
									</p>
								</>
							) : null}
							{filterByStatus !== 'All' && (
								<div
									className='flex items-center gap-x-2 relative cursor-pointer'
									onClick={handleClearStatusFilter}
								>
									<span
										className='inline-flex items-center rounded-md bg-gray-600 px-2 py-1 text-sm font-medium text-gray-200 cursor-pointer'
										onClick={handleClearStatusFilter}
									>
										{statuses[filterByStatus].displayName}
									</span>
									<span className='absolute -top-1.5 -right-2 text-xs font-semibold text-gray-500'>
										<XCircleIcon className='h-4 w-4' />
									</span>
								</div>
							)}
							{minDateApplied && (
								<button
									className='flex items-center gap-x-2 relative cursor-pointer'
									onClick={() => setMinDateApplied(null)}
								>
									<span className='inline-flex items-center rounded-md bg-gray-600 px-2 py-1 text-sm font-medium text-gray-200'>
										From {displayMinDate}
									</span>
									<span className='absolute -top-1.5 -right-2 text-xs font-semibold text-gray-500'>
										<XCircleIcon className='h-4 w-4' />
									</span>
								</button>
							)}
							{maxDateApplied && (
								<button
									className='flex items-center gap-x-2 relative cursor-pointer'
									onClick={() => setMaxDateApplied(null)}
								>
									<span className='inline-flex items-center rounded-md bg-gray-600 px-2 py-1 text-sm font-medium text-gray-200'>
										To {displayMaxDate}
									</span>
									<span className='absolute -top-1.5 -right-2 text-xs font-semibold text-gray-500'>
										<XCircleIcon className='h-4 w-4' />
									</span>
								</button>
							)}
						</div>
					</div>
				</div>
				<GridList items={filteredJobs} itemType='job' />
			</div>
		</>
	);
}
