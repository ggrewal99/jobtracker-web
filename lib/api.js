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
		console.log('Fetched jobs inside apiGetjobs:', response.data);

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

export const deleteMultipleJobs = async (jobIds) => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.post(
			`${API_URL}/jobs/delete-multiple-jobs`,
			{ ids: jobIds },
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error('Failed to delete multiple jobs:', error);
		throw error;
	}
};

export const addNewTask = async (taskData) => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.post(`${API_URL}/tasks`, taskData, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Task creation failed:', error);
		throw error;
	}
};

export const getTasks = async () => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.get(`${API_URL}/tasks`, { headers });
		return response.data;
	} catch (error) {
		console.error('Failed to fetch tasks:', error);
		throw error;
	}
};

export const updateTask = async (taskData, taskId) => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.patch(
			`${API_URL}/tasks/${taskId}`,
			taskData,
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error('Task update failed:', error);
		throw error;
	}
};

export const deleteTask = async (taskId) => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.delete(`${API_URL}/tasks/${taskId}`, {
			headers,
		});
		return response.data;
	} catch (error) {
		console.error('Failed to delete task:', error);
		throw error;
	}
};

export const deleteMultipleTasks = async (taskIds) => {
	try {
		const headers = getAuthHeaders();
		const response = await axios.post(
			`${API_URL}/tasks/delete-multiple-tasks`,
			{ ids: taskIds },
			{ headers }
		);
		return response.data;
	} catch (error) {
		console.error('Failed to delete multiple tasks:', error);
		throw error;
	}
};
