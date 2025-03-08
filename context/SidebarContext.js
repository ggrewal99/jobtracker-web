'use client';

import { createContext, useState, useContext } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [sidebarContent, setSidebarContent] = useState(null);
	const [sidebarTitle, setSidebarTitle] = useState('');

	return (
		<SidebarContext.Provider
			value={{
				sidebarOpen,
				setSidebarOpen,
				sidebarContent,
				setSidebarContent,
				sidebarTitle,
				setSidebarTitle,
			}}
		>
			{children}
		</SidebarContext.Provider>
	);
};

export default SidebarContext;
