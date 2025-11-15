'use client';
import { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import Logo from '@/components/logo';
import ServerNotice from '@/components/serverNotice';

export default function Register() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [message, setMessage] = useState('');
	const { register } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (password !== confirmPassword) {
			setError(true);
			setMessage('Passwords do not match');
			setLoading(false);
			return;
		}

		try {
			await register({ firstName, lastName, email, password });
			setError(false);
			setMessage(
				'Registration successful. Check your email to verify your account'
			);
		} catch (error) {
			setError(true);
			setMessage(error.response.data.message);
		}
		setLoading(false);
	};
	return (
		<>
			{loading && <ServerNotice />}
			<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
				<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
					<Logo />
					<h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-100'>
						Sign up for an account
					</h2>
				</div>

				<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
					<form onSubmit={handleSubmit} className='space-y-6'>
						<div>
							<label
								htmlFor='firstName'
								className='block text-sm/6 font-medium text-gray-100'
							>
								First Name
							</label>
							<div className='mt-2'>
								<input
									id='firstName'
									name='firstName'
									type='text'
									required
									onChange={(e) =>
										setFirstName(e.target.value)
									}
									value={firstName}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm/6 font-medium text-gray-100'
							>
								Last Name (Optional)
							</label>
							<div className='mt-2'>
								<input
									id='lastName'
									name='lastName'
									type='text'
									onChange={(e) =>
										setLastName(e.target.value)
									}
									value={lastName}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='email'
								className='block text-sm/6 font-medium text-gray-100'
							>
								Email address
							</label>
							<div className='mt-2'>
								<input
									id='email'
									name='email'
									type='email'
									required
									autoComplete='email'
									onChange={(e) => setEmail(e.target.value)}
									value={email}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm/6 font-medium text-gray-100'
								>
									Password
								</label>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									required
									onChange={(e) =>
										setPassword(e.target.value)
									}
									value={password}
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='confirm-password'
									className='block text-sm/6 font-medium text-gray-100'
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
									className='block w-full rounded-md bg-gray-700 px-3 py-1.5 text-base text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								disabled={loading}
								className='flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500'
							>
								{loading ? 'Signing up...' : 'Sign up'}
							</button>
						</div>
						<div className='text-xs text-center'>
							<a
								href='/auth/login'
								className='font-semibold text-blue-500 hover:text-blue-400'
							>
								Already have an account? Sign in
							</a>
						</div>
						<div>
							<p
								className={`text-sm font-semibold text-center ${
									error ? 'text-red-500' : 'text-green-500'
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
