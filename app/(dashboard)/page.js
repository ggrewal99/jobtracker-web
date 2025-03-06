'use client';

import useAuth from '@/hooks/useAuth';

export default function Dashboard() {
	const { user } = useAuth();

	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<h2 className='text-left text-xl font-bold tracking-tight text-gray-900'>
					{user ? `Welcome, ${user.firstName}` : ``}
				</h2>
			</div>
		</>
	);
}
