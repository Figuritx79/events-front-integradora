/** @type {import('tailwindcss').Config} */
const { heroui } = require('@heroui/react');
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Century Gothic', 'sans-serif'],
			},
		},
		colors: {
			text: {
				50: '#0d0d0d',
				100: '#1a1a1a',
				200: '#333333',
				300: '#4d4d4d',
				400: '#666666',
				500: '#808080',
				600: '#999999',
				700: '#b3b3b3',
				800: '#cccccc',
				900: '#e6e6e6',
				950: '#f2f2f2',
				DEFAULT: "#ff00ff", 
				foreground: "#000000",
			},
			bg: {
				50:  '#f2f2f2',
				100: '#e6e6e6',
				200: '#cccccc',
				300: '#b3b3b3',
				400: '#999999',
				500: '#808080',
				600: '#666666',
				700: '#4d4d4d',
				800: '#333333',
				900: '#1a1a1a',
				950: '#0d0d0d',
				DEFAULT: "#ff00ff", 
				foreground: "#000000",
			},
			primario: {
				50: '#1a0019',
				100: '#330033',
				200: '#660066',
				300: '#990099',
				400: '#cc00cc',
				500: '#ff00ff',
				600: '#ff33ff',
				700: '#ff66ff',
				800: '#ff99ff',
				900: '#ffccff',
				950: '#ffe5ff',
			},
			secundario: {
				50: '#1a0019',
				100: '#330033',
				200: '#660066',
				300: '#990099',
				400: '#cc00cc',
				500: '#ff00ff',
				600: '#ff33ff',
				700: '#ff66ff',
				800: '#ff99ff',
				900: '#ffccff',
				950: '#ffe5ff',
			},
			accent: {
				50: '#00141a',
				100: '#002733',
				200: '#004e66',
				300: '#007599',
				400: '#009ccc',
				500: '#00c3ff',
				600: '#33cfff',
				700: '#66dbff',
				800: '#99e7ff',
				900: '#ccf3ff',
				950: '#e5f9ff',
			},
			blur: {
				50: 'rgba(244,241,244,0.4)',
				100: 'rgba(233,226,233,0.4)',
				200: 'rgba(211,197,211,0.4)',
				300: 'rgba(188,169,188,0.4)',
				400: 'rgba(166,140,166,0.4)',
				500: 'rgba(144,111,144,0.4)',
				600: 'rgba(115,89,115,0.4)',
				700: 'rgba(86,67,86,0.4)',
				800: 'rgba(58,44,58,0.4)',
				900: 'rgba(29,22,29,0.4)',
				950: 'rgba(14,11,14,0.4)',
			},
		},
	},
	darkMode: 'media',
	plugins: [heroui({
		themes: {
		  light: {
			colors: {
				primary: {
					50: '#ffe5ff',
					100: '#ffccff',
					200: '#ff99ff',
					300: '#ff66ff',
					400: '#ff33ff',
					500: '#ff00ff',
					600: '#cc00cc',
					700: '#990099',
					800: '#660066',
					900: '#330033',
					950: '#1a0019',
					DEFAULT: "#ff00ff", 
					foreground: "#000000",
				},
				secondary: {
					50: '#e5f9ff',
					100: '#ccf3ff',
					200: '#99e7ff',
					300: '#66dbff',
					400: '#33cfff',
					500: '#00c3ff',
					600: '#009ccc',
					700: '#007599',
					800: '#004e66',
					900: '#002733',
					950: '#00141a',
					DEFAULT: "#00c3ff",
					foreground: "#000000",
				},
				foreground: {
					50: '#0d0d0d',
					100: '#1a1a1a',
					200: '#333333',
					300: '#4d4d4d',
					400: '#666666',
					500: '#808080',
					600: '#999999',
					700: '#b3b3b3',
					800: '#cccccc',
					900: '#e6e6e6',
					950: '#f2f2f2',
					DEFAULT: "#0d0d0d", 
					foreground: "#000000",
				},	
				background: {
					50:  '#f2f2f2',
					100: '#e6e6e6',
					200: '#cccccc',
					300: '#b3b3b3',
					400: '#999999',
					500: '#808080',
					600: '#666666',
					700: '#4d4d4d',
					800: '#333333',
					900: '#1a1a1a',
					950: '#0d0d0d',
					DEFAULT: "#f2f2f2", 
					foreground: "#000000",
				},		
			}
		  },
		  dark: {
			colors: {
				primary: {
					50: '#1a0019',
					100: '#330033',
					200: '#660066',
					300: '#990099',
					400: '#cc00cc',
					500: '#ff00ff',
					600: '#ff33ff',
					700: '#ff66ff',
					800: '#ff99ff',
					900: '#ffccff',
					950: '#ffe5ff',
					DEFAULT: "#ff00ff", 
					foreground: "#000000",
				},
			  	secondary: {
					50: '#00141a',
					100: '#002733',
					200: '#004e66',
					300: '#007599',
					400: '#009ccc',
					500: '#00c3ff',
					600: '#33cfff',
					700: '#66dbff',
					800: '#99e7ff',
					900: '#ccf3ff',
					950: '#e5f9ff',
					DEFAULT: "#00c3ff",
					foreground: "#000000",
			  	},
				foreground: {
					50: '#f2f2f2',
					100: '#e6e6e6',
					200: '#cccccc',
					300: '#b3b3b3',
					400: '#999999',
					500: '#808080',
					600: '#666666',
					700: '#4d4d4d',
					800: '#333333',
					900: '#1a1a1a',
					950: '#0d0d0d',
					DEFAULT: "#f2f2f2", 
					foreground: "#000000",
				},
				background: {
					50: '#0d0d0d',
					100: '#1a1a1a',
					200: '#333333',
					300: '#4d4d4d',
					400: '#666666',
					500: '#808080',
					600: '#999999',
					700: '#b3b3b3',
					800: '#cccccc',
					900: '#e6e6e6',
					950: '#f2f2f2',
					DEFAULT: "#0d0d0d", 
					foreground: "#000000",
				},		
			}
		  }
		}
	})],
};
