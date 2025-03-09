'use client';

import { createContext, useState, useEffect } from 'react';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
	const [showAlert, setShowAlert] = useState(false);
	const [alertMessage, setAlertMessage] = useState('');
	const [alertType, setAlertType] = useState('success');

	useEffect(() => {
		if (showAlert) {
			const timer = setTimeout(() => {
				setShowAlert(false);
			}, 5000);
			return () => clearTimeout(timer);
		}
	}, [showAlert]);

	return (
		<AlertContext.Provider
			value={{
				showAlert,
				setShowAlert,
				alertMessage,
				setAlertMessage,
				alertType,
				setAlertType,
			}}
		>
			{children}
		</AlertContext.Provider>
	);
};

export default AlertContext;
