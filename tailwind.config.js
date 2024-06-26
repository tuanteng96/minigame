import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
    mode: 'jit',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["Be Vietnam Pro", 'sans-serif']
        },
        extend: {
            colors: {
                primary: "#3699FF",
                "primary-hover": "#187DE4",
                danger: '#f64e60',
                "danger-hover": '#EE2D41',
                muted: "#B5B5C3"
            },
            animation: {
                'bounce2': 'bounce2 1.5s infinite',
            },
            keyframes: {
                bounce2: {
                    '0%, 100%': { transform: 'translateY(10px)', animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)" },
                    '50%': { transform: 'translateY(0)', animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)" },
                }
            }
        },
    },
    plugins: [
        require('@kamona/tailwindcss-perspective'),
        plugin(function({ matchUtilities, theme }) {
            matchUtilities({
                'translate-z': (value) => ({
                    '--tw-translate-z': value,
                    transform: `translateZ(var(--tw-translate-z))`,
                }), // this is actual CSS
            }, { values: theme('translate'), supportsNegativeValues: true })
        })
    ],
}