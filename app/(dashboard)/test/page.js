'use client';
import NewJob from '@/components/newJob';
import Modal from '@/components/modal';
import Sidebar from '@/components/sidebar';
import useSidebar from '@/hooks/useSidebar';
export default function Page() {
	const { setSidebarOpen } = useSidebar();
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				{/* <Modal /> */}
				<div className='flex justify-end'>
					<button
						onClick={() => setSidebarOpen(true)}
						className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Add Job
					</button>
				</div>
				<Sidebar title='Add Job'>
					<NewJob />
				</Sidebar>
			</div>
		</>
	);
}
