import {
	AirplayButton,
	AudioMenuButton,
	CaptionsMenuButton,
	CenterGestureRegion,
	CurrentTimeDisplay,
	DurationDisplay,
	FullscreenButton,
	PipButton,
	MuteButton,
	PlayButton,
	PlaybackRateMenuButton,
	RenditionsMenuButton,
	Seekbar,
	SeekBackwardButton,
	SeekBackwardGestureRegion,
	SeekForwardButton,
	SeekForwardGestureRegion,
	VolumeSlider,
} from '../';
import { type Info } from '../../types.ts';

import { useLogic } from './useLogic';
import style from './styles.module.css';

type ControlsContainerProps = {
	info: Partial<Info>;
};

export const ControlsContainer = (props: ControlsContainerProps) => {
	const { info } = props;

	const {
		isControlVisible,
		defineStyle,
		handleDisplayingControlOnMove,
		handleDisplayingControlOnLeave,
		handleDisplayingControl,
		handleBubbling,
	} = useLogic();

	return (
		<div
			onPointerDown={handleDisplayingControl}
			onPointerMove={handleDisplayingControlOnMove}
			onPointerLeave={handleDisplayingControlOnLeave}
			className={style['controls-container']}
			data-visible={isControlVisible}
			style={defineStyle()}
		>
			<section className={style.gesture}>
				<SeekBackwardGestureRegion />
				<CenterGestureRegion />
				<SeekForwardGestureRegion />
			</section>
			<section className={style.info}>
				<h2>{info?.title}</h2>
			</section>
			<section className={style.playback} onPointerDown={handleBubbling}>
				<p className={style['playback-header']}>
					<CurrentTimeDisplay />
					<DurationDisplay />
				</p>
				<Seekbar />
			</section>
			<section className={style.actions} onPointerDown={handleBubbling}>
				<SeekBackwardButton />
				<PlayButton />
				<SeekForwardButton />
				<PlaybackRateMenuButton />
				<MuteButton />
				<VolumeSlider />
				<div className={style.separator} />
				<AirplayButton />
				<CaptionsMenuButton />
				<RenditionsMenuButton />
				<AudioMenuButton />
				<PipButton />
				<FullscreenButton />
			</section>
		</div>
	);
};

ControlsContainer.displayName = 'ControlsContainer';
