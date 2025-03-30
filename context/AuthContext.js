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
	const [userLoading, setUserLoading] = useState(true);
	const router = useRouter();
	const pathname = usePathname();

	useEffect(() => {
		const fetchUser = async () => {
			setUserLoading(true);
			try {
				const storedUser = await getUser();
				if (storedUser) {
					setUser(storedUser);
				} else {
					setUser(null);
					if (!pathname.startsWith('/auth')) {
						router.push('/auth/login');
					}
				}
			} catch (error) {
				console.error('Error fetching user:', error);
				setUser(null);
			} finally {
				setUserLoading(false);
			}
		};

		fetchUser();
	}, [pathname]);

	const register = async (userData) => {
		try {
			setUserLoading(true);
			const user = await apiRegister(userData);
			setUser(user);
			return user;
		} catch (error) {
			throw error;
		} finally {
			setUserLoading(false);
		}
	};

	const login = async (credentials) => {
		try {
			setUserLoading(true);
			const userData = await apiLogin(credentials);
			setUser(userData.user);
			return userData;
		} catch (error) {
			throw error;
		} finally {
			setUserLoading(false);
		}
	};

	const logout = () => {
		setUserLoading(true);
		apiLogout();
		setUser(null);
		setUserLoading(false);
	};

	const resetPassword = async (token, newPassword) => {
		try {
			setUserLoading(true);
			const response = await apiResetPassword(token, newPassword);
			return response;
		} catch (error) {
			throw error;
		} finally {
			setUserLoading(false);
		}
	};

	const requestPasswordReset = async (email) => {
		try {
			setUserLoading(true);
			const response = await apiRequestPasswordReset(email);
			return response;
		} catch (error) {
			throw error;
		} finally {
			setUserLoading(false);
		}
	};

	const updateUser = async (userData) => {
		try {
			setUserLoading(true);
			const response = await apiUpdateUser(userData);
			if (response.ok) {
				setUser(userData);
			}
		} catch (error) {
			throw error;
		} finally {
			setUserLoading(false);
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
				userLoading,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
