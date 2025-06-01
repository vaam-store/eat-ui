import '../src/styles/globals.scss';
import { withThemeByClassName } from '@storybook/addon-themes';
import type { Preview } from '@storybook/react';

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},

	decorators: [
		withThemeByClassName({
			themes: {
				light: '',
				dark: 'vymalo-light-v2',
			},
			defaultTheme: 'vymalo-light-v2',
		}),
	],
};

export default preview;
