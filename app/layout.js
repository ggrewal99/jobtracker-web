import { Roboto, Archivo_Black } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { AlertProvider } from '@/context/AlertContext';

const roboto = Roboto({
	variable: '--font-roboto',
	subsets: ['latin'],
	display: 'swap',
});

const archivoBlack = Archivo_Black({
	variable: '--font-archivo-black',
	subsets: ['latin'],
	display: 'swap',
	weight: '400',
});

export const metadata = {
	title: 'Jobtracker',
	description: 'Keep track of your job applications',
	icons: '/favicon.png',
};

export default function RootLayout({ children }) {
	return (
		<html lang='en'>
			<body
				className={`${roboto.variable} ${archivoBlack.variable} antialiased`}
			>
				<AuthProvider>
					<AlertProvider>
						<SidebarProvider>{children}</SidebarProvider>
					</AlertProvider>
				</AuthProvider>
			</body>
		</html>
	);
}
