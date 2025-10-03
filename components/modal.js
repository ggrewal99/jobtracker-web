'use client';

import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import useModal from '@/hooks/useModal';

export default function Modal() {
	const { showModal, setShowModal, modalContent } = useModal();

	return (
		<Dialog
			open={showModal}
			onClose={setShowModal}
			className='relative z-10'
		>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in'
			/>

			<div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className='relative transform overflow-hidden rounded-lg bg-gray-800 px-4 pt-5 pb-4 text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95'
					>
						<div className='sm:flex sm:items-start'>
							<div className='mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10'>
								<ExclamationTriangleIcon
									aria-hidden='true'
									className='size-6 text-red-600'
								/>
							</div>
							<div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
								<DialogTitle
									as='h3'
									className='text-base font-semibold text-gray-100'
								>
									{modalContent?.title}
								</DialogTitle>
								<div className='mt-2'>
									<p className='text-sm text-gray-300'>
										{modalContent?.message}
									</p>
								</div>
							</div>
						</div>
						<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
							<button
								type='button'
								onClick={async () => {
									if (modalContent?.onConfirm) {
										await modalContent.onConfirm();
									}
									setShowModal(false);
								}}
								className='inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto cursor-pointer'
							>
								{modalContent?.btnText}
							</button>
							<button
								type='button'
								data-autofocus
								onClick={() => setShowModal(false)}
								className='mt-3 inline-flex w-full justify-center rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-gray-100 ring-1 shadow-xs ring-gray-500 ring-inset hover:bg-gray-600 sm:mt-0 sm:w-auto cursor-pointer'
							>
								Cancel
							</button>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
}
