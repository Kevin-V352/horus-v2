import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        black_transparent_03: 'rgba(0, 0, 0, 0.3)',
        black_transparent_05: 'rgba(0, 0, 0, 0.5)',
        cyan:                 '#92E5BD',
        lime:                 '#F1EE33'
      }
    }
  },
  plugins: []
};
export default config;
