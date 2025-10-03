'use client';

import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import useSidebar from '@/hooks/useSidebar';

export default function Sidebar() {
	const { sidebarOpen, setSidebarOpen, sidebarContent, sidebarTitle } =
		useSidebar();

	return (
		<Dialog
			open={sidebarOpen}
			onClose={setSidebarOpen}
			className='relative z-10'
		>
			<div className='fixed inset-0' />

			<div className='fixed inset-0 overflow-hidden'>
				<div className='absolute inset-0 overflow-hidden'>
					<div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
						<DialogPanel
							transition
							className='pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-closed:translate-x-full sm:duration-700'
						>
							<div className='flex h-full flex-col overflow-y-scroll bg-gray-800 py-6 shadow-xl'>
								<div className='px-4 sm:px-6'>
									<div className='flex items-start justify-between'>
										<DialogTitle className='text-base font-semibold text-gray-100'>
											{sidebarTitle}
										</DialogTitle>
										<div className='ml-3 flex h-7 items-center'>
											<button
												type='button'
												onClick={() =>
													setSidebarOpen(false)
												}
												className='relative rounded-md bg-gray-700 text-gray-300 hover:text-gray-200 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-hidden'
											>
												<span className='absolute -inset-2.5' />
												<span className='sr-only'>
													Close panel
												</span>
												<XMarkIcon
													aria-hidden='true'
													className='size-6'
												/>
											</button>
										</div>
									</div>
								</div>
								<div className='relative mt-6 flex-1 px-4 sm:px-6'>
									{sidebarContent || (
										<p>
											Something went wrong. Please try
											again later.
										</p>
									)}
								</div>
							</div>
						</DialogPanel>
					</div>
				</div>
			</div>
		</Dialog>
	);
}
