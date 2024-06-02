import { MediaProvider } from 'media-chrome/react/media-store';

import {
	Video,
	PlayerContainer,
	ControlsContainer,
	LoadingBackdrop,
} from '../';
import { Player as PlayerProps } from '../../types.ts';

export const Player = (props: PlayerProps) => {
	return (
		<MediaProvider>
			<PlayerContainer>
				<Video {...props} />
				<LoadingBackdrop />
				<ControlsContainer info={{ title: props.title }} />
			</PlayerContainer>
		</MediaProvider>
	);
};

Player.displayName = 'Player';
