/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ipl: {
                    blue: '#1e3a8a',
                    orange: '#f97316',
                    dark: '#0f172a',
                    card: '#1e293b',
                }
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
