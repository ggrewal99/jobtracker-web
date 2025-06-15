import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/20/solid';
import useAuth from '@/hooks/useAuth';
import Logo from '@/components/logo';
import { useRouter, usePathname } from 'next/navigation';
import useSidebar from '@/hooks/useSidebar';
import { useEffect } from 'react';
import NewJob from './newJob';

export default function Navbar() {
	const { user, logout } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const { setSidebarOpen, setSidebarContent, setSidebarTitle } = useSidebar();

	const links = [
		{ name: 'Dashboard', href: '/' },
		{ name: 'My Jobs', href: '/myJobs' },
		{ name: 'My Tasks', href: '/myTasks' },
	];

	const onNewJobClick = () => {
		setSidebarTitle('Add New Job');
		setSidebarContent(<NewJob />);
		setSidebarOpen(true);
	};
	const onSignout = () => {
		try {
			router.push('/auth/login');
			logout();
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Disclosure as='nav' className='bg-white shadow-lg rounded-lg'>
			<div className='mx-auto max-w-7xl px-2 md:px-8'>
				<div className='flex h-16 justify-between'>
					<div className='flex'>
						<div className='mr-2 -ml-2 flex items-center md:hidden'>
							{/* Mobile menu button */}
							<DisclosureButton className='group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-blue-400 focus:outline-hidden focus:ring-inset'>
								<span className='absolute -inset-0.5' />
								<span className='sr-only'>Open main menu</span>
								<Bars3Icon
									aria-hidden='true'
									className='block size-6 group-data-open:hidden'
								/>
								<XMarkIcon
									aria-hidden='true'
									className='hidden size-6 group-data-open:block'
								/>
							</DisclosureButton>
						</div>
						<div className='flex shrink-0 items-center select-none'>
							<Logo />
						</div>
						<div className='hidden md:ml-6 md:flex md:space-x-8'>
							{links.map((link) => (
								<a
									key={link.name}
									href={link.href}
									className={`inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium text-gray-900 
										${
											pathname === link.href
												? 'border-blue-500'
												: 'border-transparent hover:border-gray-300 hover:text-gray-700'
										}`}
								>
									{link.name}
								</a>
							))}
						</div>
					</div>
					<div className='flex items-center'>
						<div className='shrink-0'>
							<button
								type='button'
								onClick={() => onNewJobClick()}
								className='relative inline-flex items-center gap-x-1.5 rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 hover:cursor-pointer'
							>
								<PlusIcon
									aria-hidden='true'
									className='-ml-0.5 size-5'
								/>
								<span className='hidden md:block'>New Job</span>
							</button>
						</div>
						<div className='hidden md:ml-4 md:flex md:shrink-0 md:items-center'>
							{/* Profile dropdown */}
							<Menu as='div' className='relative ml-3'>
								<div>
									<MenuButton className='relative flex rounded-full bg-white text-sm focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-hidden hover:cursor-pointer'>
										<span className='absolute -inset-1.5' />
										<span className='sr-only'>
											Open user menu
										</span>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth={1.5}
											stroke='currentColor'
											className='size-6'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
											/>
										</svg>
									</MenuButton>
								</div>
								<MenuItems
									transition
									className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-75 data-leave:ease-in'
								>
									<MenuItem>
										<a
											href='/profile'
											className='block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden'
										>
											Your Profile
										</a>
									</MenuItem>
									<MenuItem>
										<button
											onClick={onSignout}
											className=' w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden cursor-pointer'
										>
											Sign out
										</button>
									</MenuItem>
								</MenuItems>
							</Menu>
						</div>
					</div>
				</div>
			</div>

			<DisclosurePanel className='md:hidden'>
				<div className='space-y-1 pt-2 pb-3'>
					{links.map((link) => (
						<DisclosureButton
							key={link.name}
							as='a'
							href={link.href}
							className={`block border-l-4 py-2 pr-4 pl-3 text-base font-medium sm:pr-6 sm:pl-5 ${
								pathname === link.href
									? 'border-blue-400 bg-blue-50 text-blue-600'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
							}`}
						>
							{link.name}
						</DisclosureButton>
					))}
				</div>
				<div className='border-t border-gray-200 pt-4 pb-3'>
					<div className='flex items-center px-4 sm:px-6'>
						<div className='shrink-0 hover:cursor-pointer'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								strokeWidth={1.5}
								stroke='currentColor'
								className='size-6'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
								/>
							</svg>
						</div>
						<div className='ml-3'>
							{user && (
								<>
									<div className='text-base font-medium text-gray-800'>
										{user.firstName} {user.lastName}
									</div>
									<div className='text-sm font-medium text-gray-500'>
										{user.email}
									</div>
								</>
							)}
						</div>
					</div>
					<div className='mt-3 space-y-1'>
						<DisclosureButton
							as='a'
							href='/profile'
							className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6'
						>
							Your Profile
						</DisclosureButton>
						<DisclosureButton
							as='a'
							onClick={onSignout}
							className='block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6'
						>
							Sign out
						</DisclosureButton>
					</div>
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}
