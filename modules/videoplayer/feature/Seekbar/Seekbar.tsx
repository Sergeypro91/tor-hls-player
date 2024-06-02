import { useEffect, useState } from 'react';
import { Slider } from '@app/shared/components';
import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';

/**
 * A component for seeking through the video and seeing its playback progress
 */

export const Seekbar = () => {
	const [playbackPercent, setPlaybackPercent] = useState(0);
	const dispatch = useMediaDispatch();
	const mediaCurrentTime = useMediaSelector(
		(state) => state.mediaCurrentTime,
	);
	const [min, max] = useMediaSelector((state) => state.mediaSeekable) ?? [];

	const handlePlaybackChange = ([percent]: [number]) => {
		const type = MediaActionTypes.MEDIA_SEEK_REQUEST;

		dispatch({ type, detail: percent });
		setPlaybackPercent(percent);
	};

	useEffect(() => {
		if (mediaCurrentTime) {
			setPlaybackPercent(mediaCurrentTime);
		}
	}, [mediaCurrentTime, max]);

	return (
		<Slider
			value={[playbackPercent]}
			min={min}
			max={max}
			step={1}
			type="time"
			onValueChange={handlePlaybackChange}
		/>
	);
};

Seekbar.displayName = 'Seekbar';
