import { DetailedHTMLProps, HTMLAttributes } from 'react';

declare global {
	namespace JSX {
		type MediaChrome = DetailedHTMLProps<
			HTMLAttributes<HTMLMediaElement>,
			HTMLMediaElement
		> &
			Partial<HTMLMediaElement>;
		interface IntrinsicElements {
			'youtube-video': MediaChrome;
			'dash-video': MediaChrome;
			'hls-video': MediaChrome;
			'player-x': MediaChrome;
		}
	}
}
