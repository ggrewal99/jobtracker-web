import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let token = '';
if (typeof window !== 'undefined') {
	token = JSON.parse(localStorage.getItem('token'));

	if (!token || !token.token) {
		throw new Error('No token found');
	}
}

const headers = {
	Authorization: `Bearer ${token.token}`,
};

export const addNewJob = async (jobData) => {
	try {
		const response = await axios.post(`${API_URL}/jobs`, jobData, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Job creation failed:', error);
		throw error;
	}
};
