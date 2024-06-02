import { DetailedHTMLProps, VideoHTMLAttributes } from 'react';

export type Info = Partial<MediaMetadata>;

export type Player = DetailedHTMLProps<
	VideoHTMLAttributes<HTMLVideoElement>,
	HTMLVideoElement
> &
	Info;
