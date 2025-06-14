'use client';

import { createContext, useState, useEffect } from 'react';
import { getJobs as apiGetJobs } from '@/lib/api';
import useAuth from '@/hooks/useAuth';

const JobsContext = createContext();

export const JobsProvider = ({ children }) => {
	const [jobs, setJobs] = useState([]);
	const [jobsLoading, setJobsLoading] = useState(true);
	const { user, userLoading } = useAuth();

	const getJobs = async () => {
		try {
			const data = await apiGetJobs();
			setJobs(data);
		} catch (error) {
			console.error('Failed to fetch jobs:', error);
		} finally {
			setJobsLoading(false);
		}
	};

	useEffect(() => {
		if (!userLoading && user) {
			getJobs();
		} else {
			setJobsLoading(false);
		}
	}, [user, userLoading]);

	const removeJob = (jobId) => {
		setJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
	};

	const removeMultipleJobs = (jobIds) => {
		setJobs((prevJobs) =>
			prevJobs.filter((job) => !jobIds.includes(job._id))
		);
	};

	const updateJob = (updatedJob) => {
		setJobs((prevJobs) =>
			prevJobs.map((job) =>
				job._id === updatedJob._id ? updatedJob : job
			)
		);
	};

	return (
		<JobsContext.Provider
			value={{
				jobs,
				getJobs,
				removeJob,
				removeMultipleJobs,
				updateJob,
				jobsLoading,
			}}
		>
			{children}
		</JobsContext.Provider>
	);
};

export default JobsContext;
