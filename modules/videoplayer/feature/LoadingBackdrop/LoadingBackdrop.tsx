import { LoaderIcon } from '@app/shared/assets';

import { useLogic } from './useLogic';
import style from './styles.module.css';

export const LoadingBackdrop = () => {
	const { isLoading, mediaLoading } = useLogic();

	if (!isLoading || !mediaLoading) {
		return null;
	}

	return (
		<div className={style['loading-backdrop']}>
			<LoaderIcon className={style['loader']} />
		</div>
	);
};

LoadingBackdrop.displayName = 'LoadingBackdrop';
