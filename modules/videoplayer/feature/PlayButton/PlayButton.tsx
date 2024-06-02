import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';
import { PlayIcon, PauseIcon } from '@app/shared/assets';
import { Tooltip } from '@app/shared/components';

export const PlayButton = () => {
	/**
	 * The useMediaDispatch() hook is returns a function for dispatching media state change requests to the <MediaProvider/>'s
	 * MediaStore. State change requests, or "actions," have a well defined "type" (defined in MediaActionTypes) and, depending on the type of request, may
	 * also require some well defined "detail" about the request. For an example of a state change request, see below.
	 */
	const dispatch = useMediaDispatch();
	/**
	 * The useMediaSelector() hook is how you get the latest bit(s) of media state you care about in your component.
	 * NOTE: in this case, we're doing some mildly fancier logic to make sure (for things like SSR/async) that mediaPaused
	 * has been set to a boolean before treating the media as unpaused. In the future, we may account for more of these
	 * kinds of cases automatically to reduce complexity/cognitive load for folks using the MediaStore and/or react hooks.
	 */
	const mediaPaused = useMediaSelector(
		(state) => typeof state.mediaPaused !== 'boolean' || state.mediaPaused,
	);

	/**
	 * Here we're picking which MUI icon to show based on whether or not we're paused
	 */
	const IconComponent = mediaPaused ? PlayIcon : PauseIcon;
	/**
	 * And also changing the text for both the tooltip and our aria-label (for a11y)
	 */
	const label = mediaPaused ? 'Play' : 'Pause';

	const handleClick = () => {
		const type = mediaPaused
			? MediaActionTypes.MEDIA_PLAY_REQUEST
			: MediaActionTypes.MEDIA_PAUSE_REQUEST;

		dispatch({ type });
	};

	return (
		<Tooltip title={label} placement="top">
			<button onClick={handleClick}>
				<IconComponent />
			</button>
		</Tooltip>
	);
};

PlayButton.displayName = 'PlayButton';
