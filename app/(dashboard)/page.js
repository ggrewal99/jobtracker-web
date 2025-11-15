'use client';

import PieChart from '@/components/pieChart';
import RecentCard from '@/components/recentCard';
import Stats from '@/components/stats';
import useAuth from '@/hooks/useAuth';
import { useEffect, useState } from 'react';
import TasksCard from '@/components/tasksCard';
import { getAuthHeaders } from '@/lib/api';
export default function Dashboard() {
	const { user, userLoading } = useAuth();
	const [analytics, setAnalytics] = useState(null);
	const [analyticsLoading, setAnalyticsLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchDashboardAnalytics = async () => {
			try {
				setAnalyticsLoading(true);
				const token = localStorage.getItem('token'); // Adjust based on your auth storage
				
				const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/analytics/dashboard`, {
					headers: getAuthHeaders(),
				});

				if (!response.ok) {
					throw new Error('Failed to fetch dashboard analytics');
				}

				const result = await response.json();
				
				if (result.success) {
					setAnalytics(result.data);
				} else {
					throw new Error(result.message || 'Failed to fetch analytics');
				}
			} catch (err) {
				setError(err.message || 'An error occurred');
				console.error('Error fetching dashboard analytics:', err);
			} finally {
				setAnalyticsLoading(false);
			}
		};

		fetchDashboardAnalytics();
	}, []);

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-0 py-3 lg:px-8 mx-auto max-w-screen'>
				<h2 className='text-left text-xl font-semibold tracking-tight text-gray-100 mb-2 lg:mb-0'>
					{!userLoading ? `Welcome, ${user?.firstName}` : ``}
				</h2>
				
				{analyticsLoading || userLoading ? (
					<div className='flex items-center justify-center h-screen'>
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
				) : error ? (
					<div className='flex items-center justify-center h-screen'>
						<p className='text-red-500'>Error: {error}</p>
					</div>
				) : analytics ? (
					<div className='grid sm:grid-cols-1 lg:grid-cols-2 gap-6 md:grid-rows-[auto_1fr] h-fit sm:mt-5 md:mt-12 overflow-x-hidden'>
						<div className='col-span-1 sm:col-span-1 lg:col-span-2'>
							<Stats
								stats={analytics.byStatus}
								totalJobs={analytics.totalApplications}
							/>
						</div>
						<div className='sm:col-span-1 lg:col-span-1'>
							<PieChart stats={analytics.byStatus} />
						</div>
						<div className='sm:col-span-1 lg:col-span-1 overflow-auto'>
							<RecentCard recentApplications={analytics.recentApplications} />
						</div>
						<div className='col-span-1 sm:col-span-1 lg:col-span-2 overflow-auto'>
							<TasksCard upcomingTasks={analytics.upcomingTasks} />
						</div>
					</div>
				) : null}
			</div>
		</>
	);
}