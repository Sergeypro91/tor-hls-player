import * as React from 'react';
import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';
import { type Rendition } from 'media-chrome/dist/media-store/state-mediator';
import { ResolutionIcon } from '@app/shared/assets';
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	Tooltip,
} from '@app/shared/components';

/**
 * A menu button that shows/hides the playback rate options and allows a user to select between them, with
 * the option to provide different playback rates options via the "rates" prop
 */
export const RenditionsMenuButton = () => {
	/**
	 * This is typical/boilerplate MUI menu button code, so we won't focus on it, but
	 * you can check out its {@link https://mui.com/material-ui/react-menu/|Menu docs}
	 */
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
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
	const mediaRenditions = useMediaSelector(
		(state) => state.mediaRenditionList ?? [],
	);
	const mediaRenditionSelected = useMediaSelector(
		(state) => state.mediaRenditionSelected,
	);

	const label = open ? 'close renditions menu' : 'select rendition';

	const handleDefaultRendition = () => {
		const type = MediaActionTypes.MEDIA_RENDITION_REQUEST;
		const detail = undefined;
		dispatch({ type, detail });
	};

	const handleRenditionSelection = (rendition: Rendition) => () => {
		console.log('TRIGGER');
		const type = MediaActionTypes.MEDIA_RENDITION_REQUEST;
		const detail = rendition.id;
		dispatch({ type, detail });
	};

	return (
		<Popover>
			<Tooltip title={label}>
				<PopoverTrigger
					id="renditions"
					aria-controls={label}
					aria-haspopup="true"
					aria-expanded={open ? 'true' : undefined}
					onClick={handleClick}
				>
					<ResolutionIcon />
				</PopoverTrigger>
			</Tooltip>
			<PopoverContent
				id="renditions"
				side="top"
				aria-labelledby="renditions"
			>
				<li key={'auto'} onClick={handleDefaultRendition}>
					Auto
				</li>
				{mediaRenditions.map((rendition) => {
					const selected = rendition.id === mediaRenditionSelected;

					return (
						<li
							key={rendition.id}
							onClick={handleRenditionSelection(rendition)}
						>
							{`${rendition.height}×${rendition.width}`}
						</li>
					);
				})}
			</PopoverContent>
		</Popover>
	);
};

RenditionsMenuButton.displayName = 'RenditionsMenuButton';
