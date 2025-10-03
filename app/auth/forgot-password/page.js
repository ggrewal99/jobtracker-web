'use client';
import { useState } from 'react';
import Logo from '@/components/logo';
import useAuth from '@/hooks/useAuth';

export default function Page() {
	const [email, setEmail] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');
	const { requestPasswordReset } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const response = await requestPasswordReset(email);
			setMessage(response.message);
			setError(false);
		} catch (error) {
			setMessage(error.message);
			setError(true);
		}

		setLoading(false);
	};
	return (
		<>
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<Logo />
					<h2 className='mt-10 text-center text- font-bold tracking-tight text-gray-100'>
						Send Password Reset Email
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='email'
									className='block text-sm/6 font-medium text-gray-100'
								>
									Email
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									required
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading}
								className='flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 cursor-pointer'
							>
								{loading
									? 'Loading...'
									: 'Send Password Reset Email'}
							</button>
						</div>

						<div>
							<p
								className={`text-sm text-center ${
									error
										? 'text-red-400'
										: 'text-blue-400 font-bold'
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
