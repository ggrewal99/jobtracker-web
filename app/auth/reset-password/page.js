'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from '@/components/logo';

export default function Page() {
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');
	const router = useRouter();

	const handleSubmit = async (e) => {
		e.preventDefault();
	};
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<Logo />
					<h2 className='mt-10 text-center text- font-bold tracking-tight text-gray-900'>
						Reset Password
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='new-password'
									className='block text-sm/6 font-medium text-gray-900'
								>
									New Password
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='new-password'
									name='new-password'
									type='password'
									required
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
									value={newPassword}
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm/6 font-medium text-gray-900'
								>
									Confirm Password
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='confirm-password'
									name='confirm-password'
									type='password'
									required
									onChange={(e) =>
										setConfirmPassword(e.target.value)
									}
									value={confirmPassword}
									className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<p
								className={`text-sm text-center ${
									error ? 'text-red-500' : ''
								} `}
							>
								{message}
							</p>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
