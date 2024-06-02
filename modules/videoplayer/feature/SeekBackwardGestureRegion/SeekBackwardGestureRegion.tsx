import { CSSProperties } from 'react';
import {
	useMediaDispatch,
	useMediaSelector,
	MediaActionTypes,
} from 'media-chrome/react/media-store';

import style from './styles.module.css';

type SeekBackwardGestureRegionProps = {
	width?: string;
};

export const SeekBackwardGestureRegion = ({
	width,
}: SeekBackwardGestureRegionProps) => {
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

	const handleSeekBackward = () => {
		const type = MediaActionTypes.MEDIA_SEEK_REQUEST;
		const detail = mediaCurrentTime - 10;

		dispatch({ type, detail });
	};

	return (
		<div
			style={defineStyle()}
			className={style['seek-backward']}
			onDoubleClick={handleSeekBackward}
		/>
	);
};

SeekBackwardGestureRegion.displayName = 'SeekBackwardGestureRegion';
