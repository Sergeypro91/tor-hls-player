import { formatSeconds } from '@app/shared/utils';

import { SliderType } from '../../types.ts';

type ValueAccordingToTypeArgs = {
	type: SliderType;
	value: number;
};

export const convertValueAccordingToType = ({
	type,
	value,
}: ValueAccordingToTypeArgs) => {
	switch (type) {
		case 'percent':
			return `${value.toFixed()}%`;
		case 'time':
			return `${formatSeconds(value)}`;
		default:
			return value.toFixed();
	}
};
