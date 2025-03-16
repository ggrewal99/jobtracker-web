'use client';

import { createContext, useState, useEffect } from 'react';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
	const [showModal, setShowModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	return (
		<ModalContext.Provider
			value={{ showModal, setShowModal, modalContent, setModalContent }}
		>
			{children}
		</ModalContext.Provider>
	);
};

export default ModalContext;
