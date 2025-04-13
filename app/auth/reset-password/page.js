import { Suspense } from 'react';
import ResetPasswordPage from '@/components/resetPasswordPage';

export default function Page() {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<ResetPasswordPage />
		</Suspense>
	);
}
