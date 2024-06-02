import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgrPlugin from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// Svgr config
const svgrOptions = {
	svgrOptions: { icon: true, svgProps: { fill: 'currentColor' } },
	include: '**/*.svg?react',
};

// https://vitejs.dev/config/
export default defineConfig({
	root: 'application',
	plugins: [react(), svgrPlugin(svgrOptions), tsconfigPaths()],
});
