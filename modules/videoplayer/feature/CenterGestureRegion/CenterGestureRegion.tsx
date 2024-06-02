import { PointerEvent } from 'react';
import { PlayButton, SeekBackwardButton, SeekForwardButton } from '../';

import style from './styles.module.css';

export const CenterGestureRegion = () => {
	const handleBubbling = (event: PointerEvent<HTMLDivElement>) => {
		event.stopPropagation();
	};

	return (
		<div className={style['center-gesture']}>
			<div
				className={style['action-wrapper']}
				onPointerDown={handleBubbling}
			>
				<SeekBackwardButton />
				<PlayButton />
				<SeekForwardButton />
			</div>
		</div>
	);
};

CenterGestureRegion.displayName = 'CenterGestureRegion';
