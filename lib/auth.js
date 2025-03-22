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
		localStorage.setItem('token', JSON.stringify(response.data));
		return response.data;
	} catch (error) {
		console.error('Login failed:', error);
		throw error;
	}
};

export const verifyEmail = async (token) => {
	try {
		const response = await axios.get(
			`${API_URL}/auth/verify-email?token=${token}`
		);
		return response.data;
	} catch (error) {
		console.error('Email verification failed:', error);
		throw error;
	}
};

export const resetPassword = async (id, resetToken) => {
	try {
		const response = await axios.post(
			`${API_URL}/auth/reset-password?token=${resetToken}`,
			{
				id,
			}
		);
		return response.data;
	} catch (error) {
		console.error('Password reset failed:', error);
		throw error;
	}
};

export const changePassword = async (currentPassword, newPassword) => {
	let token = null;

	if (typeof window !== 'undefined') {
		const storedData = localStorage.getItem('token');
		if (storedData) {
			try {
				const localStorageData = JSON.parse(storedData);
				token = localStorageData?.token; // Ensure token exists
			} catch (error) {
				console.error('Error parsing token from localStorage:', error);
				return null;
			}
		}

		if (!token) {
			console.error('No authentication token found.');
			return null;
		}
	}

	try {
		const response = await axios.put(
			`${API_URL}/auth/change-password`,
			{
				currentPassword,
				newPassword,
			},
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			}
		);
		return response.data;
	} catch (error) {
		console.log(error);
		console.error('Password change failed:', error);
		throw error;
	}
};

export const logout = () => {
	localStorage.removeItem('token');
};

export const getUser = () => {
	if (typeof window === 'undefined') {
		return null;
	}

	try {
		const token = localStorage.getItem('token');
		const user = token ? JSON.parse(token).user : null;
		return user;
	} catch (error) {
		console.error('Error parsing user from localStorage:', error);
		localStorage.removeItem('token');
		return null;
	}
};

// export const updateUser = async (userData) => {
// 	let token = null;

// 	if (typeof window !== 'undefined') {
// 		const storedData = localStorage.getItem('token');
// 		if (storedData) {
// 			try {
// 				const localStorageData = JSON.parse(storedData);
// 				token = localStorageData?.token;
// 			} catch (error) {
// 				console.error('Error parsing token from localStorage:', error);
// 				return null;
// 			}
// 		}

// 		if (!token) {
// 			console.error('No authentication token found.');
// 			return null;
// 		}
// 	}

// 	try {
// 		const response = await axios.put(`${API_URL}/auth/update`, userData, {
// 			headers: {
// 				Authorization: `Bearer ${token}`,
// 				'Content-Type': 'application/json',
// 			},
// 		});
// 		if (response.data?.user) {
// 			const updatedTokenData = JSON.parse(localStorage.getItem('token'));
// 			updatedTokenData.user = response.data.user;

// 			localStorage.setItem('token', JSON.stringify(updatedTokenData));
// 		}

// 		return response.data.user;
// 	} catch (error) {
// 		console.error('Update failed:', error);
// 		throw error;
// 	}
// };
