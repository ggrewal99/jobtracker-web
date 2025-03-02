export default function Home() {
	return (
		<div>
			<h1>Welcome to Jobtracker</h1>
			<div>
				<a href='/auth/login' className='text-indigo-500'>
					Login
				</a>
			</div>
			<div>
				<a href='/auth/register' className='text-indigo-500'>
					Register
				</a>
			</div>
		</div>
	);
}
