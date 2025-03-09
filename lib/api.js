import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

let token = '';
if (typeof window !== 'undefined') {
	token = JSON.parse(localStorage.getItem('token'));

	if (!token) {
		return null;
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

export const updateJob = async (jobData, jobId) => {
	try {
		const response = await axios.patch(
			`${API_URL}/jobs/${jobId}`,
			jobData,
			{
				headers,
			}
		);
		return response.data;
	} catch (error) {
		console.error('Job update failed:', error);
		throw error;
	}
};

export const getJobs = async () => {
	try {
		const response = await axios.get(`${API_URL}/jobs`, { headers });
		return response.data;
	} catch (error) {
		console.error('Failed to fetch jobs:', error);
		throw error;
	}
};
