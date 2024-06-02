import { CSSProperties, SyntheticEvent } from 'react';
import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';

import style from './styles.module.css';

type SeekForwardGestureRegionProps = {
	width?: string;
};

export const SeekForwardGestureRegion = ({
	width,
}: SeekForwardGestureRegionProps) => {
	const dispatch = useMediaDispatch();
	const mediaCurrentTime = useMediaSelector(
		(state) => state.mediaCurrentTime ?? 0,
	);

	const defineStyle = () => {
		return width
			? ({
					'--local-width': width,
				} as CSSProperties)
			: {};
	};

	const handleSeekForward = (event: SyntheticEvent) => {
		event.stopPropagation();
		event.preventDefault();
		const type = MediaActionTypes.MEDIA_SEEK_REQUEST;
		const detail = mediaCurrentTime + 10;

		dispatch({ type, detail });
	};

	return (
		<div
			style={defineStyle()}
			className={style['seek-forward']}
			onDoubleClick={handleSeekForward}
		/>
	);
};

SeekForwardGestureRegion.displayName = 'SeekForwardGestureRegion';
