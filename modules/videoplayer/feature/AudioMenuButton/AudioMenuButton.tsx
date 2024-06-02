import * as React from 'react';
import { PlaylistIcon } from '@app/shared/assets';
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

type AudioTrack = { id?: string; label?: string };

/**
 * A menu button that shows/hides the playback rate options and allows a user to select between them, with
 * the option to provide different playback rates options via the "rates" prop
 */
export const AudioMenuButton = () => {
	/**
	 * This is typical/boilerplate MUI menu button code, so we won't focus on it, but
	 * you can check out its {@link https://mui.com/material-ui/react-menu/|Menu docs}
	 */
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleTrackSelection = (audioTrack: AudioTrack) => () => {
		const type = MediaActionTypes.MEDIA_AUDIO_TRACK_REQUEST;
		const detail = audioTrack.id;

		dispatch({ type, detail });
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
	const mediaAudioTrackList = useMediaSelector(
		(state) => state.mediaAudioTrackList ?? [],
	);
	const mediaAudioTrackEnabled = useMediaSelector(
		(state) => state.mediaAudioTrackEnabled,
	);

	const label = open ? 'close audio tracks menu' : 'select audio track';

	return (
		<Popover>
			<Tooltip title={label}>
				<PopoverTrigger
					id="audio-tracks"
					aria-controls={label}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleMenuToggle}
				>
					<PlaylistIcon />
				</PopoverTrigger>
			</Tooltip>
			<PopoverContent
				id="audio-tracks"
				side="top"
				aria-labelledby="subtitles"
			>
				{mediaAudioTrackList.map((audioTrack: AudioTrack) => {
					const selected = audioTrack.id === mediaAudioTrackEnabled;

					return (
						<li
							key={audioTrack.id}
							onClick={handleTrackSelection(audioTrack)}
						>
							{`${audioTrack?.label ?? ''}`}
						</li>
					);
				})}
			</PopoverContent>
		</Popover>
	);
};

AudioMenuButton.displayName = 'AudioMenuButton';
