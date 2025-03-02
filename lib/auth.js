import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const register = async (userData) => {
	try {
		const response = await axios.post(`${API_URL}/auth/register`, userData);
		return response.data;
	} catch (error) {
		console.error('Registration failed:', error);
		throw error;
	}
};

export const login = async (credentials) => {
	try {
		const response = await axios.post(`${API_URL}/auth/login`, credentials);
		localStorage.setItem('user', JSON.stringify(response.data));
		return response.data;
	} catch (error) {
		console.error('Login failed:', error);
		throw error;
	}
};

export const logout = () => {
	localStorage.removeItem('user');
};

export const getUser = () => {
	const user = localStorage.getItem('user');
	return user ? JSON.parse(user) : null;
};
