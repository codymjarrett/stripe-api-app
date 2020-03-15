module.exports = {
	theme: {
		extend: {
			colors: {
				sapphire: '#142850',
				veniceBlue: '#27496d',
				gainsboro: '#0c7b93',
				pacificBlue: '#00a8cc',
			},
			spacing: {
				'36': '9.375rem',
				'72': '18rem',
				'84': '21rem',
				'96': '24rem',
			},
			margin: {
				'30vh': '30vh',
			},
			// backgroundColors: {
			//  black: '#000',
			//  'black-60': 'rgba(0, 0, 0, 0.6)',
			// },
		},
		inset: {
			'-16': '-4rem',
			'-575': '-.575rem',
			'0': 0,
			'1r': '1rem',
			'6r': '6rem',
			'50': '50%',
		},
		minHeight: {
			'0': '0',
			'32': '8rem',
			'1/4': '25%',
			'1/2': '50%',
			'3/4': '75%',
			full: '100%',
		},
	},
	variants: {
		opacity: ['responsive', 'hover', 'focus', 'disabled'],
	},
	plugins: [
		require('tailwindcss-pseudo-elements'),
		function({ addUtilities }) {
			addUtilities(
				{
					'.empty-content': {
						content: "''",
					},
				},
				['before']
			)
		},
		// require('tailwindcss-alpha')({
		// 	modules: {
		// 	  backgroundColors: []
		// 	},
		// 	alpha: {
		// 	  '10': 0.1,
		// 	  '30': 0.3,
		// 	  '60': 0.6,
		// 	}
		//   })
	],
	modules: {
		appearance: ['responsive'],
		backgroundAttachment: ['responsive'],
		backgroundColors: ['responsive', 'hover'],
		backgroundPosition: ['responsive'],
		backgroundRepeat: ['responsive'],
		textColors: ['responsive', 'hover', 'focus', 'before', 'after'],
		// ...
	},
}
