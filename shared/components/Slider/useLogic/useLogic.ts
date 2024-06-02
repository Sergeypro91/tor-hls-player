import { useState, PointerEvent } from 'react';

import { SliderProps } from '../';
import { convertValueAccordingToType } from '@app/shared/components/Slider/utils/convertValueAccordingToType/convertValueAccordingToType.ts';

type UseLogicProps = SliderProps;

export const useLogic = ({
	value,
	max = 0,
	type = 'percent',
}: UseLogicProps) => {
	const [isGrabbing, setIsGrabbing] = useState(false);
	const [shadowRangeWidth, setShadowRangeWidth] = useState(0);
	const [shadowThumbValue, setShadowThumbValue] = useState(0);
	const thumbValue = value?.[0] ?? 0;

	const handleTrackNavigation = (
		event: PointerEvent<HTMLDivElement> | undefined,
	) => {
		const trackElement = event?.currentTarget;
		const { x: trackElementX = 0, width: trackElementWidth = 0 } =
			trackElement?.getBoundingClientRect() ?? {};
		const cursorX = Math.round(event?.clientX ?? 0) - trackElementX;

		setShadowRangeWidth(cursorX);
		setShadowThumbValue(Math.round((max / trackElementWidth) * cursorX));
	};

	const handleResetShadowRange = () => {
		setShadowRangeWidth(0);
	};

	const handleGrabbing = () => {
		setIsGrabbing(true);
	};

	const handleGrabbingRelease = () => {
		setIsGrabbing(false);
	};

	const getThumbValue = (value: number) => {
		return convertValueAccordingToType({
			type,
			value,
		});
	};

	return {
		thumbValue,
		isGrabbing,
		shadowRangeWidth,
		shadowThumbValue,
		getThumbValue,
		handleGrabbing,
		handleTrackNavigation,
		handleResetShadowRange,
		handleGrabbingRelease,
	};
};
