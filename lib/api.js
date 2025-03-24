import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const getAuthHeaders = () => {
	if (typeof window !== 'undefined') {
		const token = localStorage.getItem('token');
		if (token) {
			return { Authorization: `Bearer ${JSON.parse(token).token}` };
		}
	}
	return {};
};

export const addNewJob = async (jobData) => {
	try {
		const headers = getAuthHeaders();
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
		const headers = getAuthHeaders();
		const response = await axios.patch(
			`${API_URL}/jobs/${jobId}`,
			jobData,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error('Job update failed:', error);
		throw error;
	}
};

export const getJobs = async () => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.get(`${API_URL}/jobs`, { headers });
		return response.data;
	} catch (error) {
		console.error('Failed to fetch jobs:', error);
		throw error;
	}
};

export const deleteJob = async (jobId) => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.delete(`${API_URL}/jobs/${jobId}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Failed to delete job:', error);
		throw error;
	}
};
