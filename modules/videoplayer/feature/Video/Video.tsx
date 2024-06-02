import React from 'react';

import { Player as PlayerProps } from '../../types.ts';

import { useLogic } from './useLogic';
import style from './styles.module.css';

type VideoProps = PlayerProps;

export const Video = (props: VideoProps) => {
	const { src, videoPlayerRef, crossOrigin } = useLogic(props);

	return (
		<hls-video
			src={src}
			ref={videoPlayerRef}
			className={style['video-player']}
			crossOrigin={crossOrigin}
		/>
	);
};

Video.displayName = 'Video';
