'use client';

import {
	Combobox,
	ComboboxButton,
	ComboboxInput,
	ComboboxOption,
	ComboboxOptions,
	Label,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';

const timeOptions = [
	{ id: 1, name: 'Morning 8:00 AM' },
	{ id: 2, name: 'Afternoon 2:00 PM' },
	{ id: 3, name: 'Evening 6:00 PM' },
	{ id: 4, name: 'Night 9:00 PM' },
	{ id: 5, name: 'Custom' },
];

// Function to format time to H:MM AM/PM
const formatTime = (input) => {
	// Extract time from predefined options (e.g., "Morning 8:00 AM" → "8:00 AM")
	const predefinedMatch = input.match(/\d{1,2}:\d{2}\s[AP]M/);
	if (predefinedMatch) return predefinedMatch[0];

	// Validate and format custom input (e.g., "7.45pm" → "7:45 PM", "2.3" → "2:03 AM")
	const timeRegex =
		/^(?:(?:([0-1]?[0-9]|2[0-3])[.:]([0-5][0-9]))\s*([AP]M)?|([0-1]?[0-9]|2[0-3])[.:]([0-5][0-9])([AP]M)|([0-1]?[0-9]|2[0-3])[.:]([0-5]))$/i;
	const match = input.match(timeRegex);
	if (!match) return input; // Return input as-is if invalid

	let hours = parseInt(match[1] || match[4] || match[7], 10);
	let minutes = match[2] || match[5] || match[8];
	let period = (match[3] || match[6] || '').toUpperCase();

	// Pad single-digit minutes with leading zero (e.g., "3" → "03")
	minutes = minutes.padStart(2, '0');

	// Convert 24-hour to 12-hour format if needed
	if (!period && hours > 12) {
		period = 'PM';
		hours -= 12;
	} else if (!period && hours === 12) {
		period = 'PM';
	} else if (!period && hours === 0) {
		period = 'AM';
		hours = 12;
	} else if (!period) {
		period = 'AM';
	}

	return `${hours}:${minutes} ${period}`;
};

export default function TimeCombobox({ time, setTime, initialTime }) {
	const [query, setQuery] = useState('');
	const filteredTimes =
		query === ''
			? timeOptions
			: timeOptions.filter((time) =>
					time.name.toLowerCase().includes(query.toLowerCase())
			  );

	useEffect(() => {
		// If initialTime is provided, set it as the selected time
		if (initialTime) {
			const formattedInitialTime = formatTime(initialTime);
			const initialOption = timeOptions.find(
				(option) => formatTime(option.name) === formattedInitialTime
			);
			if (initialOption) {
				console.log('Initial option found:', initialOption);

				setTime({ ...initialOption, name: formattedInitialTime });
			} else {
				// If no matching predefined option, set as custom
				setTime({ id: 5, name: formattedInitialTime });
			}
		} else {
			// If no initial time, set to null
			setTime(null);
		}
	}, [initialTime, setTime]);

	const handleChange = (value) => {
		if (value?.name === 'Custom') {
			// Set empty input for Custom selection
			setTime({ id: 5, name: '' });
		} else if (value) {
			// Format predefined option to show only time
			setTime({ ...value, name: formatTime(value.name) });
		} else {
			// Handle cleared input
			setTime(null);
		}
		setQuery('');
	};

	const handleInputChange = (event) => {
		const inputValue = event.target.value;
		setQuery(inputValue);
		// Update time for custom input or non-matching input
		if (
			time?.name === 'Custom' ||
			!filteredTimes.some(
				(time) =>
					formatTime(time.name).toLowerCase() ===
					inputValue.toLowerCase()
			)
		) {
			const formattedTime = formatTime(inputValue);
			setTime({ id: 5, name: formattedTime });
		}
	};

	return (
		<Combobox as='div' value={time} onChange={handleChange}>
			<Label className='block text-sm/6 font-medium text-gray-100 sr-only'>
				Select Time
			</Label>
			<div className='relative mt-2 md:mt-0'>
				<ComboboxInput
					className='block w-full text-sm rounded-md bg-gray-700 py-1.5 pr-12 pl-3 text-gray-100 outline-1 -outline-offset-1 outline-gray-500 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6'
					onChange={handleInputChange}
					onBlur={() => setQuery('')}
					displayValue={(time) => time?.name || ''}
					placeholder='Type or select a time'
				/>
				<ComboboxButton className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-hidden'>
					<ChevronUpDownIcon
						className='size-5 text-gray-400'
						aria-hidden='true'
					/>
				</ComboboxButton>

				{filteredTimes.length > 0 && (
					<ComboboxOptions className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-hidden sm:text-sm'>
						{filteredTimes.map((time) => (
							<ComboboxOption
								key={time.id}
								value={time}
								className='group relative cursor-default py-2 pr-9 pl-3 text-gray-100 select-none data-[focus]:bg-blue-500 data-[focus]:text-white data-[focus]:outline-hidden'
							>
								<span className='block truncate group-data-[selected]:font-semibold'>
									{time.name}
								</span>
								<span className='absolute inset-y-0 right-0 hidden items-center pr-4 text-blue-500 group-data-[focus]:text-white group-data-[selected]:flex'>
									<CheckIcon
										className='size-5'
										aria-hidden='true'
									/>
								</span>
							</ComboboxOption>
						))}
					</ComboboxOptions>
				)}
			</div>
		</Combobox>
	);
}
