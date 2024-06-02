import { Theme } from '@radix-ui/themes';
import { Player } from '@app/modules/videoplayer/feature';
import '@radix-ui/themes/styles.css';
import '@app/shared/assets/styles';

const AppleTVFoundation =
	'https://play-edge.itunes.apple.com/WebObjects/MZPlayLocal.woa/hls/subscription/playlist.m3u8?cc=RU&svcId=tvs.vds.4089&a=1694970310&isExternal=true&brandId=tvs.sbd.4000&id=601599726&l=ru-RU&aec=UHD';
const MUXMadMax =
	'https://stream.mux.com/A3VXy02VoUinw01pwyomEO3bHnG4P32xzV7u1j1FSzjNg.m3u8';

function App() {
	return (
		<Theme>
			<Player
				src={AppleTVFoundation}
				crossOrigin="anonymous"
				title="Dune: Part Two"
				// artist=""
				// album=""
				artwork={[
					{
						src: 'https://stickerpacks.ru/wp-content/uploads/2023/08/nabor-stikerov-tom-hardi-6-dlja-telegram-16.webp',
						sizes: '512x512', // or any appropriate size
						type: 'image/webp', // or image/png, etc.
					},
				]}
			/>
		</Theme>
	);
}

export default App;
