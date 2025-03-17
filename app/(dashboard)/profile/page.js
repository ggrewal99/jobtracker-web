'use client';
import useAuth from '@/hooks/useAuth';
export default function Page() {
	const { user } = useAuth();
	return (
		<div className='min-h-full px-6 py-4 lg:px-8 mx-auto max-w-7xl'>
			<div className='divide-y divide-gray-900/10'>
				<div className='grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3'>
					<div className='px-4 sm:px-0'>
						<h2 className='text-base/7 font-semibold text-gray-900'>
							Profile
						</h2>
						<p className='mt-1 text-sm/6 text-gray-600'>
							You can edit your profile here.
						</p>
					</div>

					<form className='bg-white ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2'>
						<div className='px-4 py-6 sm:p-8'>
							<div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-3'>
									<label
										htmlFor='first-name'
										className='block text-sm/6 font-medium text-gray-900'
									>
										First name
									</label>
									<div className='mt-2'>
										<input
											id='first-name'
											name='first-name'
											type='text'
											autoComplete='given-name'
											defaultValue={user.firstName}
											className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
										/>
									</div>
								</div>

								<div className='sm:col-span-3'>
									<label
										htmlFor='last-name'
										className='block text-sm/6 font-medium text-gray-900'
									>
										Last name
									</label>
									<div className='mt-2'>
										<input
											id='last-name'
											name='last-name'
											type='text'
											autoComplete='family-name'
											defaultValue={user.lastName}
											className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
										/>
									</div>
								</div>

								<div className='sm:col-span-4'>
									<label
										htmlFor='email'
										className='block text-sm/6 font-medium text-gray-900'
									>
										Email address
									</label>
									<div className='mt-2'>
										<input
											id='email'
											name='email'
											type='email'
											autoComplete='email'
											defaultValue={user.email}
											className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
										/>
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8'>
							<button
								type='button'
								className='text-sm/6 font-semibold text-gray-900'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
							>
								Save
							</button>
						</div>
					</form>
				</div>
				<div className='grid grid-cols-1 gap-x-8 gap-y-8 py-10 md:grid-cols-3'>
					<div className='px-4 sm:px-0'>
						<h2 className='text-base/7 font-semibold text-gray-900'>
							Change Password
						</h2>
						<p className='mt-1 text-sm/6 text-gray-600'>
							You can change your password here.
						</p>
					</div>

					<form className='bg-white ring-1 shadow-xs ring-gray-900/5 sm:rounded-xl md:col-span-2'>
						<div className='px-4 py-6 sm:p-8'>
							<div className='grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
								<div className='sm:col-span-4'>
									<label
										htmlFor='password'
										className='block text-sm/6 font-medium text-gray-900'
									>
										New Password
									</label>
									<div className='mt-2'>
										<div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500'>
											<input
												id='password'
												name='password'
												type='password'
												className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
											/>
										</div>
									</div>
								</div>
								<div className='sm:col-span-4'>
									<label
										htmlFor='confirmPassword'
										className='block text-sm/6 font-medium text-gray-900'
									>
										Confirm New Password
									</label>
									<div className='mt-2'>
										<div className='flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-blue-500'>
											<input
												id='confirmPassword'
												name='confirmPassword'
												type='password'
												className='block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6'
											/>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className='flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8'>
							<button
								type='button'
								className='text-sm/6 font-semibold text-gray-900'
							>
								Cancel
							</button>
							<button
								type='submit'
								className='rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
							>
								Change Password
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
