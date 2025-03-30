'use client';
import useJobs from '@/hooks/useJobs';
import statuses from '@/constants/jobStatus';
import { Loading } from './loading';

export default function RecentCard() {
	const { jobs, jobsLoading } = useJobs();
	const recentJobs = jobs.filter((job) => {
		const date = new Date(job.createdAt);
		const today = new Date();
		const diffTime = Math.abs(today - date);
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
		return diffDays <= 7;
	});
	console.log(recentJobs);

	return (
		<div>
			<div className='sm:flex sm:items-center'>
				<div className='sm:flex-auto'>
					<h1 className='text-2xl'>Recently Added</h1>
					<p className='mt-2 text-sm text-gray-700'>Last 7 days</p>
				</div>
			</div>
			<div className='mt-8 flow-root'>
				<div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
					<div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
						<table className='min-w-full divide-y divide-gray-300'>
							<thead>
								<tr>
									<th
										scope='col'
										className='py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0'
									>
										Company Name
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Position
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Status
									</th>
									<th
										scope='col'
										className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
									>
										Date
									</th>
								</tr>
							</thead>

							{recentJobs ? (
								<tbody className='divide-y divide-gray-200'>
									{recentJobs.length === 0 ? (
										<tr>
											<td
												colSpan={4}
												className='text-center py-4 text-sm text-gray-500'
											>
												No Jobs added in the past 7 days
											</td>
										</tr>
									) : (
										recentJobs.map((job) => (
											<tr key={job._id}>
												<td className='whitespace-nowrap py-4 pr-3 pl-4 text-sm font-medium text-gray-900 sm:pl-0'>
													{job.company}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													{job.position}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													{
														statuses[job.status]
															.displayName
													}
												</td>
												<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
													{new Date(
														job.createdAt
													).toLocaleDateString()}
												</td>
											</tr>
										))
									)}
								</tbody>
							) : (
								<Loading />
							)}
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
