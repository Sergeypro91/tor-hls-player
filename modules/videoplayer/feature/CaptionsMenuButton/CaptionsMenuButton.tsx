import React, { useState, MouseEvent } from 'react';
import { CaptionsIcon, CaptionsOffIcon } from '@app/shared/assets';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Tooltip,
} from '@app/shared/components';
import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';

type Subtitle = Pick<TextTrack, 'label' | 'kind' | 'language'>;

/**
 * A menu button that shows/hides the playback rate options and allows a user to select between them, with
 * the option to provide different playback rates options via the "rates" prop
 */
export const CaptionsMenuButton = () => {
	/**
	 * This is typical/boilerplate MUI menu button code, so we won't focus on it, but
	 * you can check out its {@link https://mui.com/material-ui/react-menu/|Menu docs}
	 */
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	/**
	 * The useMediaDispatch() hook is returns a function for dispatching media state change requests to the <MediaProvider/>'s
	 * MediaStore. State change requests, or "actions," have a well defined "type" (defined in MediaActionTypes) and, depending on the type of request, may
	 * also require some well defined "detail" about the request. For an example of a state change request, see below.
	 */
	const dispatch = useMediaDispatch();
	/**
	 * The useMediaSelector() hook is how you get the latest bit(s) of media state you care about in your component.
	 * This is a simple use case of grabbing a single bit of state (in this case mediaPlaybackRate) and a pattern that
	 * you'd likely use a lot.
	 */
	const mediaSubtitlesList = useMediaSelector(
		(state) => state.mediaSubtitlesList ?? [],
	);
	const mediaSubtitlesShowing = useMediaSelector(
		(state) => state.mediaSubtitlesShowing ?? [],
	);
	const subtitlesOff = !mediaSubtitlesShowing?.length;

	const label = open ? 'close subtitles menu' : 'select subtitles';

	const handleCationSelection = (subtitleTrack: Subtitle) => () => {
		dispatch({
			type: MediaActionTypes.MEDIA_TOGGLE_SUBTITLES_REQUEST,
			detail: false,
		});
		const type = MediaActionTypes.MEDIA_SHOW_SUBTITLES_REQUEST;
		const detail = subtitleTrack;
		dispatch({ type, detail });
	};

	return (
		<Popover>
			<Tooltip title={label} placement="top">
				<PopoverTrigger
					id="subtitles"
					aria-controls={label}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					{subtitlesOff ? <CaptionsOffIcon /> : <CaptionsIcon />}
				</PopoverTrigger>
			</Tooltip>
			<PopoverContent
				id="subtitles"
				side="top"
				aria-labelledby="subtitles"
			>
				<li
					key={'auto'}
					onClick={() => {
						dispatch({
							type: MediaActionTypes.MEDIA_TOGGLE_SUBTITLES_REQUEST,
							detail: false,
						});
					}}
				>
					None
				</li>
				{mediaSubtitlesList.map((subtitleTrack: Subtitle) => {
					const selected = mediaSubtitlesShowing.some(
						(showingSubtitle) =>
							showingSubtitle.label === subtitleTrack.label,
					);

					return (
						<li
							key={`${subtitleTrack.kind}-${subtitleTrack.label}-${subtitleTrack.language}`}
							onClick={handleCationSelection(subtitleTrack)}
						>
							{`${subtitleTrack.label}`}
						</li>
					);
				})}
			</PopoverContent>
		</Popover>
	);
};

CaptionsMenuButton.displayName = 'CaptionsMenuButton';
