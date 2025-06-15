import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";


export default {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
				bgColor1:'#F5F0EC',
				bgColor2:'#FDFBFA',
				brown:"#906433",
				brown1:'#B18A53',
				brown2:'#E2BB86',
				gray:'#474747',
				gray1:'#636363',
				gray2:'#9D9D9D',
				gray3:'#CFCFCF',
				gray4:'#E0DFDF',
				gray5:'#F5F3F3',
				green:"#6EB653",
  			red: '#F30000',
				blue:'#0368BB',
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
			backgroundImage:{
        'gradient-black': 'linear-gradient(90deg, #636363 0%, #07061F 100%)',
        'gradient-black-hover': 'linear-gradient(90deg, #9D9D9D 0%, #474747 100%)',
        'gradient-black-active': 'linear-gradient(90deg, #474747 0%, #07061F 100%)', 
				'gradient-brown-hover': 'linear-gradient(90deg, #FFF 0%, rgba(177, 138, 83, 0.20) 100%)',
				'gradient-brown-active':'linear-gradient(90deg, #B18A53 0%, #906433 100%);',
				'gradient-white-hover':'linear-gradient(90deg, rgba(255, 255, 255, 0.48) 0%, rgba(255, 255, 255, 0.12) 100%)',
				'gradient-brown-nav':'linear-gradient(90deg, #906433 0%, rgba(144, 100, 51, 0.50) 100%)',
				'gradient-white-brown': 'linear-gradient(90deg, #FDFBFA 0%, rgba(226, 187, 134, 0.50) 100%)',
				'gradient-white-brown-hover': 'linear-gradient(90deg, rgba(226, 187, 134, 0.50) 0%, #E2BB86 100%)',
				'gradient-white-brown-active': 'linear-gradient(90deg, #E2BB86 0%, #B18A53 100%)',
				'brown-40':'linear-gradient(0deg, rgba(177, 138, 83, 0.40) 0%, rgba(177, 138, 83, 0.40) 100%)',
			},
  		fontFamily: {
  			sans: [
  				'Noto Sans TC',
  				'sans-serif'
  			],
  			roboto: [
  				'Roboto',
  				'sans-serif'
  			]
  		},
  		boxShadow: {
  			sm: '0px 4px 4px 0px rgba(0, 0, 0, 0.05)',
  			custom: '0px -4px 4px 0px rgba(0, 0, 0, 0.10)',
  			custom2: '0px 0px 4px 0px rgba(0, 0, 0, 0.08)',
  			Card: '0px 0px 8px 0px rgba(0,0,0,0.10)'
  		},
  		borderRadius: {
  			sm: 'calc(var(--radius) - 4px)',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)'
  		}
  	}
  },
	plugins: [tailwindcssAnimate],
} satisfies Config;
