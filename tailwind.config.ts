import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss"
import tailwindcssAnimate from 'tailwindcss-animate';
const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        'custom1': "#746cec",
        'custom2':"#4741ce",

      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        "fade-in-left":{
          "0%":{opacity:"0",transform:"translateX(-100px)"},
          "100%":{opacity:"1",transform:"translateX(0)"},
        },
        "fade-in-right":{
          "0%":{opacity:"0",transform:"translateX(100px)"},
          "100%":{opacity:"1",transform:"translateX(0)"},
        },
        "fade-in-top":{
          "0%":{opacity:"0",transform:"translateY(-100px)"},
          "100%":{opacity:"1",transform:"translateY(0)"}
        },
        "fade-in-bottom":{
          "0%":{opacity:"0",transform:"translateY(0))"},
          "100%":{opacity:"1",transform:"translateY(-100px)"}
        } 
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in-right":"fade-in-right 1s  ease-in forwards ",
        "fade-in-left":"fade-in-left 1s ease-in forwards ",
        "fade-in-top":"fade-in-top 1s ease-in forwards",
        "fade-in-bottom":"fade-in-bottom 1s ease-in forwards"
        },
        dropShadow:{
          "custom1":"10px 10px 20px rgba(250,130,65,0.5)"
        },
        textOutline: {
          "outline": "2px 2px 0 #000000",
        },
    },
  },
  plugins: [tailwindcssAnimate,nextui()],
} satisfies Config

export default config