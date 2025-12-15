import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4ade80', // Green 400
                    dark: '#16a34a', // Green 600
                },
                secondary: '#facc15', // Yellow 400
            }
        },
    },
    plugins: [],
};
export default config;
