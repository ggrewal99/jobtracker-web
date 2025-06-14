export default function PageFooter() {
	return (
		<footer className='bg-white text-gray-700 py-4'>
			<div className='container mx-auto text-center'>
				<p className='text-sm'>
					&copy; {new Date().getFullYear()} Created by Guruvindersingh
					Grewal
				</p>
			</div>
		</footer>
	);
}
