'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import Navbar from '@/components/navbar';
import useAuth from '@/hooks/useAuth';
import Sidebar from '@/components/sidebar';
import useSidebar from '@/hooks/useSidebar';

export default function DashboardLayout({ children }) {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { user, loading } = useAuth();
	const { SidebarOpen } = useSidebar();

	useEffect(
		() => {
			const token = localStorage.getItem('token');
			if (!token) {
				router.push('/auth/login');
			} else {
				try {
					const decoded = jwtDecode(token);
					const currentTime = Math.floor(Date.now() / 1000);

					if (decoded.exp < currentTime) {
						localStorage.removeItem('token');
						router.push('/auth/login');
					} else {
						setIsAuthenticated(true);
					}
				} catch (err) {
					localStorage.removeItem('token');
					router.push('/auth/login');
					console.log(err);
				}
			}
		},
		[router],
		[loading],
		[user]
	);
	if (!isAuthenticated) {
		return null;
	}
	return (
		<>
			<div className='flex h-full flex-col mx-auto'>
				<Navbar />
				<Sidebar />
				<main className='flex-1 p-4'>{children}</main>
			</div>
		</>
	);
}
