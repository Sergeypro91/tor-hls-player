import type { ReactNode } from 'react';
import { useMediaFullscreenRef } from 'media-chrome/react/media-store';

import style from './styles.module.css';

/**
 * @description A container component for the "root" of the rest of the UI. This type of component could, for example,
 * expect controls to be beneath the video (instead of overlayed, like this example), could manage things like keyboard shortcuts,
 * gestures, and the like, and various other things. It is also relevant because it defines the element used for entering/exiting fullscreen
 * (where supported) for the <MediaProvider/>'s MediaStore.
 * @param { children } - In this simple example, we only care about the children components to include in the UI, including the controls but
 * also the video component itself.
 * @returns A root container react component instance for the player, wired up as the fullscreen element.
 */
export const PlayerContainer = ({ children }: { children: ReactNode }) => {
	/**
	 * The useMediaFullscreenRef() hook returns a ref callback function that will "wire up" an element to be used by the MediaStore for fullscreen
	 * In most cases, you can just pass it to the ref property of the relevant component you want to use as your "fullscreen element".
	 */
	const fullscreenRefCallback = useMediaFullscreenRef();
	return (
		<div
			id="fullscreen"
			ref={fullscreenRefCallback}
			className={style['player-container']}
		>
			{children}
		</div>
	);
};

PlayerContainer.displayName = 'PlayerContainer';
