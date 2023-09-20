/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				//Dark Mode
				'background1-DM': '#000000',
				'htext1-DM': '#39D0BF',
				'ptext1-DM': '#94A3B8',
				'btn1-DM':	'#1DD762',
				'btn1Text-DM': '#000000',
				'link1-DM': '#39D0BF',
				'link1Hov-DM': '#B4EEE7',
				'alert1-DM': '#F3AD95',
				'border1-DM': '#F0F0F0',
				'icon1-DM': '#F0F0F0',
				'logo1-DM': '#F0F0F0',
				'highlight1-DM': '#1DD762',
				'iconbg1-DM': '#FFFFFF',
				'inputBorder1-DM': '#A9A9A9',

				'background2-DM': '#1F2937',
				'htext2-DM': '#39D0BF',
				'ptext2-DM': '#F0F0F0',
				'btn2-DM': '#1DD762',
				'btn2Text-DM': '#000000',
				'link2-DM': '#39D0BF',
				'link2Hov-DM': '#B4EEE7',
				'alert2-DM': '#F3AD95',
				'border2-DM': '#F0F0F0',
				'icon2-DM': '#F0F0F0',
				'logo2-DM': '#F0F0F0',
				'highlight2-DM': '#1DD762',
				'iconbg2-DM': '',
				'inputBorder2-DM': '',

				//Light Mode
				'background1': '#FFFFFF',
				'htext1': '#1B5C74',
				'ptext1': '#000000',
				'btn1': '#296312',
				'btn1Text': '#FFFFFF',
				'link1': '#1B5C74',
				'link1Hov': '#202A44',
				'alert1': '#A11286',
				'border1': '#212121',
				'icon1': '#000000',
				'logo1': '#000000',
				'highlight1': '#296312',
				'iconbg1': '#FFFFFF',
				'inputBorder1': '#A9A9A9',

				'background2': '#2D2D2D',
				'htext2': '#39D0BF',
				'ptext2': '#F0F0F0',
				'btn2': '#25DA49',
				'btn2Text': '#2D2D2D',
				'link2': '#39D0BF',
				'link2Hov': '#B4EEE7',
				'alert2': '#F3AD95',
				'border2': '#F0F0F0',
				'icon2': '#F0F0F0',
				'logo2': '#F0F0F0',
				'highlight2': '#25DA49',
				'iconbg2': '',
				'inputBorder2': '',

				'shadow-LM': '#9E9E9E',
				'shadow-DM': '#616161',
			},
		},
	},
	plugins: [require('@tailwindcss/typography'),],
}