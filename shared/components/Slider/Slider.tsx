import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';
import { cn } from '@app/shared/utils';

import { SliderType } from './types.ts';
import { useLogic } from './useLogic';
import style from './styles.module.css';
import { Tooltip } from '@app/shared/components';

type SliderRef = ElementRef<typeof SliderPrimitive.Root>;
export type SliderProps = ComponentPropsWithoutRef<
	typeof SliderPrimitive.Root
> & {
	type?: SliderType;
};

export const Slider = forwardRef<SliderRef, SliderProps>((props, ref) => {
	const {
		thumbValue,
		isGrabbing,
		shadowRangeWidth,
		shadowThumbValue,
		getThumbValue,
		handleGrabbing,
		handleTrackNavigation,
		handleResetShadowRange,
		handleGrabbingRelease,
	} = useLogic(props);

	return (
		<SliderPrimitive.Root
			ref={ref}
			onPointerDown={handleGrabbing}
			onPointerUp={handleGrabbingRelease}
			onPointerMove={handleTrackNavigation}
			onPointerLeave={handleResetShadowRange}
			data-grabbing={isGrabbing}
			className={cn(style['slider'], props.className)}
			{...props}
		>
			<SliderPrimitive.Track className={style['track']}>
				<SliderPrimitive.Range className={style['range']} />
			</SliderPrimitive.Track>
			<span
				className={style['shadow-range']}
				style={{ width: `${shadowRangeWidth}px` }}
			/>
			{props.type && (
				<Tooltip title={getThumbValue(shadowThumbValue)}>
					<span
						className={style['shadow-thumb']}
						style={{
							left: `${shadowRangeWidth}px`,
						}}
					/>
				</Tooltip>
			)}
			<Tooltip title={getThumbValue(thumbValue)}>
				<SliderPrimitive.Thumb className={style['thumb']} />
			</Tooltip>
		</SliderPrimitive.Root>
	);
});

Slider.displayName = SliderPrimitive.Root.displayName;
