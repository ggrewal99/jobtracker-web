import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAuthHeaders = () => {
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

export const getJobs = async (params = {}) => {
	try {
		const headers = getAuthHeaders();
		const queryParams = new URLSearchParams();
		
		// Add optional parameters
		if (params.page) queryParams.append('page', params.page);
		if (params.limit) queryParams.append('limit', params.limit);
		if (params.sortBy) queryParams.append('sortBy', params.sortBy);
		if (params.sortOrder) queryParams.append('sortOrder', params.sortOrder);
		if (params.search) queryParams.append('search', params.search);
		if (params.status) queryParams.append('status', params.status);
		if (params.company) queryParams.append('company', params.company);
		if (params.position) queryParams.append('position', params.position);
		
		const queryString = queryParams.toString();
		const url = `${API_URL}/jobs${queryString ? `?${queryString}` : ''}`;
		
		const response = await axios.get(url, { headers });
		console.log('Fetched jobs inside apiGetjobs:', response.data);

		return response.data; // { jobs: [...], pagination: {...} }
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
