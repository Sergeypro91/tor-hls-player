import { FullscreenIcon, FullscreenOffIcon } from '@app/shared/assets';
import { Tooltip } from '@app/shared/components';
import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';

/**
 * A simple button to enter/exit fullscreen mode
 */
export const FullscreenButton = () => {
	/**
	 * The useMediaDispatch() hook is returns a function for dispatching media state change requests to the <MediaProvider/>'s
	 * MediaStore. State change requests, or "actions," have a well defined "type" (defined in MediaActionTypes) and, depending on the type of request, may
	 * also require some well defined "detail" about the request. For an example of a state change request, see below.
	 */
	const dispatch = useMediaDispatch();
	/**
	 * The useMediaSelector() hook is how you get the latest bit(s) of media state you care about in your component.
	 * This is a simple use case of grabbing a single bit of state (in this case mediaIsFullscreen) and a pattern that
	 * you'd likely use a lot.
	 */
	const mediaIsFullscreen = useMediaSelector(
		(state) => state.mediaIsFullscreen,
	);

	/**
	 * Here we're picking which MUI icon to show based on whether or not we're in fullscreen mode
	 */
	const IconComponent = mediaIsFullscreen
		? FullscreenOffIcon
		: FullscreenIcon;
	/**
	 * And also changing the text for both the tooltip and our aria-label (for a11y)
	 */
	const label = mediaIsFullscreen ? 'Exit full screen' : 'Full screen';

	const handleClick = () => {
		const type = mediaIsFullscreen
			? MediaActionTypes.MEDIA_EXIT_FULLSCREEN_REQUEST
			: MediaActionTypes.MEDIA_ENTER_FULLSCREEN_REQUEST;
		dispatch({ type });
	};

	return (
		<Tooltip title={label} placement="top">
			<button
				aria-label={label}
				/**
				 * This is an example of using dispatch() to make a state change request. In this case, whenever
				 * someone clicks the pip button, we want to either make a MEDIA_EXIT_FULLSCREEN_REQUEST (if we're currently in fullscreen mode)
				 * or a MEDIA_ENTER_FULLSCREEN_REQUEST (if we're not).
				 */
				onClick={handleClick}
			>
				<IconComponent />
			</button>
		</Tooltip>
	);
};

FullscreenButton.displayName = 'FullscreenButton';
