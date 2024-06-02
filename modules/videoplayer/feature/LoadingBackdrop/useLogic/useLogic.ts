import { useEffect, useRef, useState } from 'react';
import { useMediaSelector } from 'media-chrome/react/media-store';
import { debounce } from '@app/shared/utils';

export const useLogic = () => {
	const [isLoading, setIsLoading] = useState(false);
	const mediaLoading = useMediaSelector(
		(state) => state.mediaLoading && !state.mediaPaused,
	);

	const updateIsLoadingDebounce = useRef(
		debounce((state: boolean) => {
			setIsLoading(state);
		}, 300),
	).current;

	useEffect(() => {
		updateIsLoadingDebounce(Boolean(mediaLoading));
	}, [mediaLoading, updateIsLoadingDebounce]);

	return { isLoading, mediaLoading };
};
