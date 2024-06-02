import { CSSProperties, PointerEvent, useEffect, useState } from 'react';
import { useMediaSelector } from 'media-chrome/react/media-store';

export const useLogic = () => {
	const [isControlVisible, setIsControlVisible] = useState(true);

	const mediaPaused = useMediaSelector(
		(state) => typeof state.mediaPaused !== 'boolean' || state.mediaPaused,
	);

	const defineStyle = () => {
		return {
			'--local-opacity': mediaPaused ? 1 : 0,
		} as CSSProperties;
	};

	const handleDisplayingControlOnMove = () => {
		document.body.style.cursor = 'auto';
		setIsControlVisible(true);
	};

	const handleDisplayingControlOnLeave = () => {
		if (!mediaPaused) {
			setIsControlVisible(false);
		}

		const timer = setTimeout(() => {
			document.body.style.cursor = 'auto';
			clearTimeout(timer);
		});
	};

	const handleDisplayingControl = () => {
		setIsControlVisible((previous) => !previous);
	};

	const handleBubbling = (event: PointerEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;

		if (!mediaPaused && isControlVisible) {
			timer = setTimeout(() => {
				setIsControlVisible(false);
			}, 3000);
		}

		if (!isControlVisible) {
			document.body.style.cursor = 'none';
		}

		return () => {
			clearTimeout(timer);
		};
	}, [mediaPaused, isControlVisible]);

	return {
		isControlVisible,
		defineStyle,
		handleDisplayingControlOnMove,
		handleDisplayingControlOnLeave,
		handleDisplayingControl,
		handleBubbling,
	};
};
