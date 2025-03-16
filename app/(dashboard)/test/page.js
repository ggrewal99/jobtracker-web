'use client';
import NewJob from '@/components/newJob';
import Modal from '@/components/modal';
import Sidebar from '@/components/sidebar';
import useSidebar from '@/hooks/useSidebar';
import GridList from '@/components/gridList';
import Alert from '@/components/alert';
import useAlert from '@/hooks/useAlert';
import useModal from '@/hooks/useModal';
export default function Page() {
	const { setSidebarOpen } = useSidebar();
	const { setShowAlert, setAlertType } = useAlert();
	const { setShowModal, setModalContent } = useModal();
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mx-auto max-w-7xl'>
				<div className='flex justify-end'>
					<button
						onClick={() => setSidebarOpen(true)}
						className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Add Job
					</button>
					<button
						onClick={() => {
							setShowAlert(true);
							setAlertType('success');
						}}
						className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Show Alert
					</button>
					<button
						onClick={() => {
							setShowModal(true);
							setModalContent({
								title: 'Modal Title',
								message: 'Modal Message',
								btnText: 'Close',
							});
						}}
						className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
					>
						Show Modal
					</button>
				</div>
				<Sidebar title='Add Job'>
					<NewJob />
				</Sidebar>
				{/* <GridList /> */}
				<Alert />
				<Modal />
			</div>
		</>
	);
}
