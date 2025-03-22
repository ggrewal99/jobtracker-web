'use client';
import { createContext, useState, useEffect } from 'react';
import {
	register as apiRegister,
	login as apiLogin,
	logout as apiLogout,
	getUser,
	updateUser as apiUpdateUser,
} from '../lib/auth';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const storedUser = getUser();
		if (storedUser) {
			setUser(storedUser);
		} else {
			setUser(null);
			router.push('/auth/login');
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

	// const updateUser = async (userData) => {
	// 	try {
	// 		const response = await apiUpdateUser(userData);
	// 		if (response.ok) {
	// 			setUser(userData);
	// 		}
	// 	} catch (error) {
	// 		throw error;
	// 	}
	// };

	return (
		<AuthContext.Provider
			value={{ user, register, login, logout, loading }}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
