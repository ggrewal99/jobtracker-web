'use client';

import { createContext, useState, useEffect, use } from 'react';
import { getJobs as apiGetJobs } from '@/lib/api';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		if (!localStorage.getItem('token')) {
			return;
		}
		const getJobs = async () => {
			try {
				const data = await apiGetJobs();
				setJobs(data);
			} catch (error) {
				console.error('Failed to fetch jobs:', error);
			}
		};
		getJobs();
	}, []);

	const addJob = (newJob) => {
		setJobs((prevJobs) => [...prevJobs, newJob]);
	};

	const removeJob = (jobId) => {
		setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
	};

	const updateJob = (updatedJob) => {
		setJobs((prevJobs) =>
			prevJobs.map((job) =>
				job._id === updatedJob._id ? updatedJob : job
			)
		);
	};

	return (
		<JobsContext.Provider value={{ jobs, addJob, removeJob, updateJob }}>
			{children}
		</JobsContext.Provider>
	);
};

export default JobsContext;
