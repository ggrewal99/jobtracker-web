'use client';

import { useContext } from 'react';
import JobsContext from '../context/JobsContext';

const useJobs = () => {
	return useContext(JobsContext);
};

export default useJobs;
