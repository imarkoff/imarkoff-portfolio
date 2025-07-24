import type { Config } from 'tailwindcss';

const config: Config = {
    theme: {
        extend: {
            colors: {
                // Text colors
                'text-primary': '#EAF2FB',
                'text-secondary': '#EAF2FBAB',
                'text-tertiary': '#EAF2FB59',

                // Background colors
                'background-dark': '#151719',
                'on-background': '#24262880',

                // Surface colors
                'surface': '#3D404333',
                'on-surface': '#B4D9FD14',
                'on-surface-hover': '#C9D9E821',
                'on-surface-disabled': '#B4D9FD0A',
                'on-surface-focus-border': '#B3BFCC',

                // Border colors
                'border-default': '#FFFFFF08',
                'border-menu': '#FFFFFF1A',

                // State colors
                'active-filled': '#6FADEB',
                'active-tinted': '#134D861A',
                'active-filled-text': '#233343',
                'active-filled-hover': '#8CBFF2',
                'active-filled-disabled': '#6FADEB80',
                'active-filled-text-disabled': '#07192CAB',

                // Button colors
                'ghost-button-fg': '#D8EAFFDE',
                'ghost-button-hover-fg': '#A7D0FF',
                'ghost-button-disabled-fg': '#D8EAFF4D',
                'ghost-button-hover-bg': '#2B3B4B80',
                'ghost-button-active-bg': '#6FADEB1F',
                'ghost-button-active-hover-bg': '#6FADEB33',

                // Functional colors
                'green-filled': '#4CE672',
                'green-tinted': '#4CE6721F',
                'yellow-filled': '#E6CC4C',
                'yellow-tinted': '#E6CC4C1F',
                'red-filled': '#EB6F6F',
                'red-tinted': '#8613131F',
            },

            spacing: {
                "section-gap-lg": "6.25rem",
                "section-gap-md": "2.25rem",
                "section-gap-sm": "1.25rem",

                "button-md-spacing-x": "1.25rem",
                "button-md-spacing-y": "0.625rem",
                "button-sm-spacing-x": "0.75rem",
                "button-sm-spacing-y": "0.375rem",

                "icon-xl": "3rem",
                "icon-lg": "2rem",
                "icon-md": "1.25rem",
                "icon-sm": "1rem",
                "icon-xs": "0.75rem",
            },

            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                handwriting: ['"Just Another Hand"', 'cursive'],
            },

            fontSize: {
                'hero-lg': ['5rem', { fontWeight: '800' }],
                'hero-md': ['3.75rem', { fontWeight: '800' }],
                'hero-sm': ['2rem', { fontWeight: '800', letterSpacing: '2%' }],

                'tagline-lg': ['2rem', { fontWeight: '800' }],
                'tagline-md': ['1.75rem', { fontWeight: '800' }],
                'tagline-sm': ['1.25rem', { fontWeight: '800', letterSpacing: '1%' }],

                'h1-lg': ['2rem', { fontWeight: '800' }],
                'h1-md': ['1.75rem', { fontWeight: '800' }],
                'h1-sm': ['1.5rem', { fontWeight: '800' }],

                'h2-lg': ['1.375rem', { fontWeight: '700' }],
                'h2-md': ['1.25rem', { fontWeight: '700' }],
                'h2-sm': ['1.25rem', { fontWeight: '700' }],

                'h3-lg': ['1.125rem', { fontWeight: '700' }],
                'h3-md': ['1.125rem', { fontWeight: '700' }],
                'h3-sm': ['1.53rem', { fontWeight: '700' }],

                'body': ['1rem', { fontWeight: '400' }],
                'caption': ['0.75rem', { fontWeight: '400' }],
            },

            borderRadius: {
                button: '0.625rem',
                "button-sm": '0.5rem',
                input: '0.5rem',
                card: '1.25rem',
            },

            boxShadow: {
                'card': '0 4px 26px rgba(0, 0, 0, 0.15)',
            },

            backgroundImage: {
                'hero-gradient': 'linear-gradient(90deg, rgb(163, 173, 195), rgb(220, 205, 255), rgb(112, 90, 136))',
                'text-gradient': 'linear-gradient(90deg, rgb(49, 152, 255), rgb(235, 111, 212), rgb(249, 90, 93), rgb(181, 111, 235))',
                'button-gradient': 'linear-gradient(90deg, rgb(235, 111, 212) 29.327%, rgb(181, 111, 235) 100%)',
                'logo-gradient': 'linear-gradient(90deg, rgb(167, 111, 235), rgb(235, 111, 208), rgb(225, 111, 235))',
            }
        }
    }
}

export default config;