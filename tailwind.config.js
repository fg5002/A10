import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
    screens: {
      'sm': '340px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
		extend: {
      spacing: {
        'keyboard-safe': 'calc(env(keyboard-inset-height, 0px) + 48px)'
      },
			zIndex: {
        '100': '100',
        '1000': '1000',
        '2000': '2000',
        '3000': '3000',
        '5000': '5000',
        '10000': '10000',
        '20000': '20000',
      },
      scale: {
        '200': '2.00',
        '250': '2.50',
        '300': '3.00',
      },
      gridTemplateRows: {
        // Define your custom class
        'keyboard-adjust': '1fr env(keyboard-inset-height, 0px)',
      }
		}
	},

	plugins: [
    require("daisyui"),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".field-sizing-content": {
          "field-sizing": "content",
        },
      });
    }),
  ]
};
