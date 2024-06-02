import { useEffect, useRef, useCallback } from 'react';
import { Hls } from 'hls-video-element';
import { useMediaRef } from 'media-chrome/react/media-store';

import { Player as UseLogicArgs } from '../../../types.ts';

export const useLogic = (props: UseLogicArgs) => {
	const { src, crossOrigin, title, artist, album, artwork } = props;
	const mediaRefCallback = useMediaRef();
	const videoPlayerRef = useRef<HTMLVideoElement>(null);

	const runMediaSession = useCallback(() => {
		if ('mediaSession' in navigator) {
			navigator.mediaSession.metadata = new MediaMetadata({
				title,
				artist,
				album,
				artwork: artwork as MediaImage[],
			});
		}
	}, [album, artist, artwork, title]);

	const buildAirplayStream = useCallback(() => {
		const videoPlayerElement = videoPlayerRef.current;

		if (videoPlayerElement && Hls.isSupported() && src) {
			const hlsPlayer = new Hls();
			const hlsSource = document.createElement('source');
			const regularSource = document.createElement('source');

			mediaRefCallback(videoPlayerElement);
			hlsPlayer.loadSource(src);

			hlsSource.src = src;
			hlsSource.type = 'application/x-mpegURL';
			regularSource.type = 'video/mp4';
			videoPlayerElement.disableRemotePlayback = false;
			// TODO: It is necessary to clarify the scenario for using MMS to HTMLSourceElemen (https://github.com/muxinc/media-elements/issues/17)
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			hlsPlayer.attachMedia(regularSource);
			videoPlayerElement.appendChild(hlsSource);
			videoPlayerElement.appendChild(regularSource);

			return hlsPlayer;
		} else if (
			src &&
			videoPlayerElement?.canPlayType('application/vnd.apple.mpegURL')
		) {
			videoPlayerElement.src = src;
		}
	}, [mediaRefCallback, src]);

	useEffect(() => {
		const hlsPlayer = buildAirplayStream();

		runMediaSession();

		return () => {
			if (hlsPlayer) {
				hlsPlayer.destroy();
			}
		};
	}, [buildAirplayStream, runMediaSession]);

	return { src, videoPlayerRef, crossOrigin };
};
