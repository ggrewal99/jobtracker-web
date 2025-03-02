'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from '@/hooks/useAuth';
import Navbar from '@/components/navbar';

export default function Dashboard() {
	const router = useRouter();
	const { user, loading } = useAuth();

	useEffect(() => {
		if (!loading && !user) {
			router.push('/auth/login');
		}
	}, [user, loading, router]);

	return <Navbar />;
}
