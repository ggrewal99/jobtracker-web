'use client';

import GridList from '@/components/gridList';
import { useState, useEffect, useCallback } from 'react';
import { getJobs } from '@/lib/api';
import statuses from '@/constants/jobStatus';
import { ChevronDownIcon, CalendarIcon } from '@heroicons/react/20/solid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format, startOfDay, isValid } from 'date-fns';
import { XCircleIcon } from '@heroicons/react/24/solid';
import useAuth from '@/hooks/useAuth';

function classNames(...classes) {
	return classes.filter(Boolean).join(' ');
}

export default function MyJobs() {
	const { user, userLoading } = useAuth();
	const [jobs, setJobs] = useState([]);
	const [pagination, setPagination] = useState(null);
	const [jobsLoading, setJobsLoading] = useState(true);
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedSearch, setDebouncedSearch] = useState('');
	const [minDateApplied, setMinDateApplied] = useState(null);
	const [maxDateApplied, setMaxDateApplied] = useState(null);
	const [filterByStatus, setFilterByStatus] = useState('All');
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState('dateApplied');
	const [sortOrder, setSortOrder] = useState('desc');
	const limit = 20;

	// Debounce search input
	useEffect(() => {
		const timer = setTimeout(() => {
			setDebouncedSearch(searchQuery);
			setCurrentPage(1); // Reset to page 1 when search changes
		}, 500);

		return () => clearTimeout(timer);
	}, [searchQuery]);

	// Fetch jobs when filters change
	const fetchJobs = useCallback(async () => {
		if (userLoading || !user) return;

		try {
			setJobsLoading(true);
			const params = {
				page: currentPage,
				limit,
				sortBy,
				sortOrder,
				search: debouncedSearch || undefined,
				status: filterByStatus !== 'All' ? filterByStatus : undefined,
			};

			const data = await getJobs(params);
			setJobs(data.jobs);
			setPagination(data.pagination);
		} catch (error) {
			console.error('Failed to fetch jobs:', error);
		} finally {
			setJobsLoading(false);
		}
	}, [user, userLoading, currentPage, sortBy, sortOrder, debouncedSearch, filterByStatus]);

	useEffect(() => {
		fetchJobs();
	}, [fetchJobs]);

	// Listen for global job updates (e.g., when created from navbar)
	useEffect(() => {
		const handleJobsUpdated = () => {
			fetchJobs();
		};

		if (typeof window !== 'undefined') {
			window.addEventListener('jobsUpdated', handleJobsUpdated);
		}

		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('jobsUpdated', handleJobsUpdated);
			}
		};
	}, [fetchJobs]);

	// Client-side date filtering (since API doesn't support date ranges yet)
	const filteredJobs = jobs.filter((job) => {
		const jobDate = job.dateApplied ? new Date(job.dateApplied) : null;
		if (!jobDate || !isValid(jobDate)) {
			return true; // Include job if no date filters are applied
		}

		const matchesMinDate = minDateApplied
			? startOfDay(jobDate) >= startOfDay(minDateApplied)
			: true;
		const matchesMaxDate = maxDateApplied
			? startOfDay(jobDate) <= startOfDay(maxDateApplied)
			: true;

		return matchesMinDate && matchesMaxDate;
	});

	const displayMinDate =
		minDateApplied && isValid(minDateApplied)
			? format(minDateApplied, 'MMM dd, yyyy')
			: 'Min date';

	const displayMaxDate =
		maxDateApplied && isValid(maxDateApplied)
			? format(maxDateApplied, 'MMM dd, yyyy')
			: 'Max date';

	// Refresh jobs after mutations
	const handleRefresh = useCallback(() => {
		fetchJobs();
	}, [fetchJobs]);

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleStatusChange = (e) => {
		setFilterByStatus(e.target.value);
		setCurrentPage(1); // Reset to page 1 when status changes
	};

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		// Scroll to top when page changes
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleClearFilters = () => {
		setSearchQuery('');
		setDebouncedSearch('');
		setMinDateApplied(null);
		setMaxDateApplied(null);
		setFilterByStatus('All');
		setCurrentPage(1);
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

							{searchQuery !== '' && (
								<p className='text-sm/6 font-medium text-gray-300 ms-2'>
									Search results for: {searchQuery}
								</p>
							)}
						</div>
					</div>
				</div>
				{jobsLoading ? (
					<div className='flex items-center justify-center py-12'>
						<svg
							className='animate-spin h-10 w-10 text-gray-300'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
						>
							<path
								fill='none'
								d='M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z'
							/>
							<path
								fill='currentColor'
								d='M12.5 6.5a1.5 1.5 0 1 1-3 .001A7.5 7.5 0 1 0 12.5 6.5z'
							/>
						</svg>
					</div>
				) : (
					<>
						<GridList 
							items={filteredJobs} 
							itemType='job' 
							onRefresh={handleRefresh}
						/>
						
						{/* Pagination Controls */}
						{pagination && pagination.totalPages > 1 && (
							<div className='mt-6 flex flex-col sm:flex-row items-center justify-center gap-4'>
								<div className='flex gap-2'>
									<button
										onClick={() => handlePageChange(currentPage - 1)}
										disabled={!pagination.hasPreviousPage}
										className='px-4 py-2 rounded-md bg-gray-700 text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors cursor-pointer'
									>
										Previous
									</button>
									<div className='flex items-center gap-1'>
										{Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
											.filter(page => {
												// Show first page, last page, current page, and pages around current
												return (
													page === 1 ||
													page === pagination.totalPages ||
													(page >= currentPage - 1 && page <= currentPage + 1)
												);
											})
											.map((page, index, array) => {
												// Add ellipsis if there's a gap
												const showEllipsisBefore = index > 0 && array[index - 1] !== page - 1;
												return (
													<div key={page} className='flex items-center gap-1'>
														{showEllipsisBefore && (
															<span className='px-2 text-gray-400'>...</span>
														)}
														<button
															onClick={() => handlePageChange(page)}
															className={`px-3 py-2 rounded-md transition-colors cursor-pointer ${
																currentPage === page
																	? 'bg-blue-500 text-white'
																	: 'bg-gray-700 text-gray-100 hover:bg-gray-600'
															}`}
														>
															{page}
														</button>
													</div>
												);
											})}
									</div>
									<button
										onClick={() => handlePageChange(currentPage + 1)}
										disabled={!pagination.hasNextPage}
										className='px-4 py-2 rounded-md bg-gray-700 text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition-colors cursor-pointer'
									>
										Next
									</button>
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</>
	);
}
