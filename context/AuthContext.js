'use client';
import { createContext, useState, useEffect } from 'react';
import {
	register as apiRegister,
	login as apiLogin,
	logout as apiLogout,
	getUser,
	updateUser as apiUpdateUser,
	resetPassword as apiResetPassword,
	requestPasswordReset as apiRequestPasswordReset,
} from '../lib/auth';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const storedUser = getUser();
		if (storedUser) {
			setUser(storedUser);
		} else {
			setUser(null);
			if (!pathname.startsWith('/auth')) {
				router.push('/auth/login');
			}
		}
		setLoading(false);
	}, []);

	const register = async (userData) => {
		try {
			const user = await apiRegister(userData);
			setUser(user);
			return user;
		} catch (error) {
			throw error;
		}
	};

	const login = async (credentials) => {
		try {
			const userData = await apiLogin(credentials);
			setUser(userData.user);
			return userData;
		} catch (error) {
			throw error;
		}
	};

	const logout = () => {
		apiLogout();
		setUser(null);
	};

	const resetPassword = async (token, newPassword) => {
		try {
			const response = await apiResetPassword(token, newPassword);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const requestPasswordReset = async (email) => {
		try {
			const response = await apiRequestPasswordReset(email);
			return response;
		} catch (error) {
			throw error;
		}
	};

	const updateUser = async (userData) => {
		try {
			const response = await apiUpdateUser(userData);
			if (response.ok) {
				setUser(userData);
			}
		} catch (error) {
			throw error;
		}
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				register,
				login,
				logout,
				updateUser,
				resetPassword,
				requestPasswordReset,
				loading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
