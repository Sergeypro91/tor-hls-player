export const formatSeconds = (seconds: number) => {
	// Calculate hours, minutes, and seconds
	const hours = Math.floor(seconds / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;

	// Pad with leading zeros to ensure two digits
	const hoursFormatted = String(hours.toFixed()).padStart(2, '0');
	const minutesFormatted = String(minutes.toFixed()).padStart(2, '0');
	const secondsFormatted = String(secs.toFixed()).padStart(2, '0');

	// Combine into HH:MM:SS format
	return `${hoursFormatted}:${minutesFormatted}:${secondsFormatted}`;
};
