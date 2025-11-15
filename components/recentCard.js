'use client';
import statuses from '@/constants/jobStatus';
import { Loading } from './loading';
import { format, isValid } from 'date-fns';

export default function RecentCard({ recentApplications }) {

	console.log('recentApplications', recentApplications);

	return (
		<div className='bg-gray-800 rounded-lg border border-gray-600 h-full'>
			<div className='sm:flex sm:items-center top-0 z-20'>
				<div className='sm:flex-auto p-3'>
					<h1 className='text-xl md:text-2xl text-gray-100'>
						Recently Added
					</h1>
					<p className='mt-2 text-xs md:text-sm text-gray-300'>
						Last 7 days
					</p>
				</div>
			</div>

			<div className='overflow-auto h-48 md:h-64 w-full'>
				<div className='inline-block min-w-full align-middle'>
					<table className='min-w-full divide-y divide-gray-600'>
						<thead className='sticky top-0 bg-gray-800 z-10'>
							<tr>
								<th
									scope='col'
									className='py-3.5 pr-3 pl-3 text-left text-sm font-semibold text-gray-100'
								>
									Company Name
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'
								>
									Position
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'
								>
									Status
								</th>
								<th
									scope='col'
									className='px-3 py-3.5 text-left text-sm font-semibold text-gray-100'
								>
									Date Applied
								</th>
							</tr>
						</thead>

						
							<tbody className='divide-y divide-gray-200'>
								{recentApplications.length === 0 ? (
									<tr>
										<td
											colSpan={4}
											className='text-center py-4 text-sm text-gray-500'
										>
											No Jobs added in the past 7 days
										</td>
									</tr>
								) : (
									recentApplications.map((application) => (
										<tr key={application._id}>
											<td className='whitespace-nowrap py-4 pr-3 pl-3 text-sm font-medium text-gray-100'>
												{application.company}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-100'>
												{application.position}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-100'>
												{
													statuses[application.status]
														.displayName
												}
											</td>
											<td className='whitespace-nowrap px-3 py-4 text-sm text-gray-100'>
												{isValid(
													new Date(application.dateApplied)
												)
													? format(
															new Date(
																application.dateApplied
															),
															'dd MMM yyyy'
													  )
													: 'Invalid date'}
											</td>
										</tr>
									))
								)}
							</tbody>
						
					</table>
				</div>
			</div>
		</div>
	);
}
