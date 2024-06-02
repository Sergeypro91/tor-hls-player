export const debounce = <T>(func: (args: T) => void, timeout = 300) => {
	let timer: ReturnType<typeof setTimeout>;

	return (...args: [args: T]) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
};
