import { useMediaSelector, timeUtils } from 'media-chrome/react/media-store';

import style from './styles.module.css';

const { formatTime } = timeUtils;

/**
 * A component to show the current media playback time
 */

export const CurrentTimeDisplay = () => {
	/**
	 * The useMediaSelector() hook is how you get the latest bit(s) of media state you care about in your component.
	 * This is a simple use case of grabbing a single bit of state (in this case mediaCurrentTime) and a pattern that
	 * you'd likely use a lot.
	 */
	const mediaCurrentTime = useMediaSelector(
		(state) => state.mediaCurrentTime,
	);
	/**
	 * For this component, we're also grabbing the media's "seekable end" state. This is generally equivalent to "mediaDuration",
	 * except it also accounts for things like live/DVR media playback.
	 */
	const [, seekableEnd] =
		useMediaSelector((state) => state.mediaSeekable) ?? [];
	return (
		<span className={style['current-time-display']}>
			{/**
			 * Media Chrome also has some handy utils that we use in our own web components. This one, formatTime() takes numeric seconds for time and a "guide"
			 * for the maximum possible time and formats it as a time string (e.g. "5:32")
			 */}
			{formatTime(mediaCurrentTime ?? 0, seekableEnd)}
		</span>
	);
};

CurrentTimeDisplay.displayName = 'CurrentTimeDisplay';
