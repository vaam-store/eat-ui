import '../src/styles/globals.scss';
import type { Preview } from '@storybook/react';
import { withThemeByClassName } from "@storybook/addon-themes";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},

  decorators: [withThemeByClassName({
      themes: {
          light: '',
          dark: 'dark',
      },
      defaultTheme: 'light',
  })]
};

export default preview;
