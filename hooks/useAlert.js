'use client';

import { useContext } from 'react';
import AlertContext from '../context/AlertContext';

const useAlert = () => {
	return useContext(AlertContext);
};

export default useAlert;
