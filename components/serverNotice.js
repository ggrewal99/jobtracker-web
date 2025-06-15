'use client';
import React, { useEffect, useState } from 'react';

const noticeStyle = {
	position: 'fixed',
	bottom: '30px',
	right: '30px',
	background: '#fffbe6',
	border: '1px solid #ffe58f',
	borderRadius: '8px',
	padding: '16px 24px',
	boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
	zIndex: 1000,
	fontSize: '16px',
};

export default function ServerNotice() {
	const [show, setShow] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => setShow(true), 3000);
		return () => clearTimeout(timer);
	}, []);

	if (!show) return null;

	return (
		<div style={noticeStyle}>
			<strong>Notice:</strong> The backend server is hosted on a free
			Render plan. It may take up to a minute to spin up and respond to
			queries if it’s been idle.
		</div>
	);
}
