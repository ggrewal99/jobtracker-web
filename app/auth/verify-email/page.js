'use client';
import { verifyEmail } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function VerifyEmail() {
	const searchParams = useSearchParams();
	const token = searchParams.get('token');

	const [success, setSuccess] = useState(false);
	const handleVerifyEmail = async () => {
		try {
			await verifyEmail(token);
			setSuccess(true);
		} catch (error) {
			console.error('Email verification failed:', error);
		}
	};
	useEffect(() => {
		handleVerifyEmail();
	}, []);
	return (
		<div className='flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8'>
			{success ? (
				<>
					<h1 className='font-semibold text-2xl'>
						Email verification successful!
					</h1>
					<p>
						<a href='/auth/login' className='text-indigo-500'>
							Log in
						</a>{' '}
						to continue
					</p>
				</>
			) : (
				<p className='font-semibold'>Verifying email...</p>
			)}
		</div>
	);
}
