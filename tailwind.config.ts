import { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { PluginAPI } from "tailwindcss/types/config";

const addScrollbarUtilities = ({ addUtilities }: PluginAPI) => {
  const newUtilities = {
    ".no-scrollbar": {
      /* Hide scrollbar for IE, Edge and Firefox */
      "-ms-overflow-style": "none" /* IE and Edge */,
      "scrollbar-width": "none" /* Firefox */,
    },
    ".no-scrollbar::-webkit-scrollbar": {
      display: "none" /* Safari and Chrome */,
    },
  };

  addUtilities(newUtilities);
};

const config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx,jsx,js}",
    "./components/**/*.{ts,tsx,jsx,js}",
    "./module/**/*.{ts,tsx,jsx,js}",
    "./src/app/**/*.{ts,tsx,jsx,js}",
    "./src/**/*.{html,ts,tsx,jsx,js}",
    "./stories/**/*.{ts,tsx,jsx,js}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      "2xl": "1400px",
      xs: "700px",
      xxs: "375px",
    },
    extend: {
      fontFamily: {
        gelica: ["var(--font-gelica)", ...fontFamily.sans],
        silka: ["var(--font-roboto)", ...fontFamily.sans],
      },
      transitionDuration: {
        "2000": "2000ms",
      },
      colors: {
        border: "hsl(var(--border))",
        divider: "var(--divider)",
        "card-bg": "var(--card-bg)",
        "dim-grey": "var(--dim-grey)",
        "dark-grey": "var(--dark-grey)",
        "light-grey": "var(--light-grey)",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          primaryText: "hsl(var(--primary-text))",
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
        glitchPink: "hsl(var(--glitch-pink))",
        navigationBorder: "#0000001A",
        pink: "#FD94FF",
        baseCampBlue: "hsl(var(--basecamp-blue))",
        ultimateBlue: "hsl(var(--ultimate-blue))",
        virtualGreen: "hsl(var(--virtual-green))",
        hypeYellow: "hsl(var(--hype-yellow))",
        blue: "hsl(var(--blue))",
        red: "var(--red)",
        green: "hsl(var(--green))",
        white: "hsl(var(--white))",
        lightWhite: "var(--light-white)",
        greyStroke: "var(--grey-stroke)",
        tabYellow: "var(--tab-yellow)",
        inactive: "#CFCFCF",
        lightBorder: "#F0F0F0",
        lightGreen: "#00C064",
        upcoming: "#FF565633",
        "dark-blue": "#4170FB",
        ongoing: "#00C06433",
        completed: "#F7F7F7",
        redtext: "#FF5656",
        strikeThrough: "#80A0FF",
        utlimateBlue: "#4170FB",
        jetBlack: "#000617",
        infoBlue: "#006CC0",
        currencySplashBlue: "#ADFFFF",
        currencySplashGreen: "#DCFFAD",
        currencySplashYellow: "#FFFFAD",
        testimonialBorder: "#C8C8C8",
        "red-completed": "#FF565633",
        "grey-100": "hsl(var(--grey-100))",
        "grey-200": "hsl(var(--grey-200))",
        "grey-300": "var(--grey-300)",
        "grey-400": "var(--grey-400)",
        "grey-500": "hsl(var(--grey-500))",
        "grey-600": "var(--grey-600)",
        "mid-black": "#1D1E1F",
        "disable-white": "#898F96",
        "dark-green": "#B0FF4B",
        "off-grey": "#CFCFCF",
        "black-50": "#00000080",
        darkBorder: "#000617",
        secondaryDivider: "#E4E5E7",
        yellow: "#FFE156",
        "light-yellow": "#ffff4b1a",
        "grey-temp": "var(--grey-temp)", // Design to confirm the name
        "lighter-grey": "#A6A6A8",
        rank1Bg: "#FFFFAD",
        rank2Bg: "#DCFFAD",
        rank3Bg: "#BEFFFF",
        selectedGrey: "#EEEEEE",
        lightPink: "#FFEBFF",
        progressBar: "#C3C3C3",
        lightBgGrey: "#F1F1F1",
        lightGlitchPink: "#FEC2FF",
        darkGlitchPink: "#E05EE3",
        arcadeGreen: "#B8F16F",
      },
      // borderRadius: {
      //   lg: 'var(--radius)',
      //   md: 'calc(var(--radius) - 2px)',
      //   sm: 'calc(var(--radius) - 4px)',
      // },
      fontSize: {
        xxs: "10px",
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
        "fade-in-out": {
          "0%, 100%": { opacity: "0" },
          "10%, 90%": { opacity: "1" },
        },
        slideIn: {
          "0%": {
            transform: "translateY(100%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideOut: {
          "0%": {
            transform: "translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "translateY(-100%)",
            opacity: "0",
          },
        },
        slideInWithoutFade: {
          "0%": {
            transform: "translateY(100%)",
          },
          "100%": {
            transform: "translateY(0)",
          },
        },
        slideOutWithoutFade: {
          "0%": {
            transform: "translateY(0)",
          },
          "100%": {
            transform: "translateY(-100%)",
          },
        },
        shake: {
          "0%": { transform: "rotate(0deg)" },
          "20%": { transform: "rotate(-25deg)" },
          "40%": { transform: "rotate(50deg)" },
          "60%": { transform: "rotate(-50deg)" },
          "80%": { transform: "rotate(50deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
        ballBounce: {
          "0%": {
            transform: "translateY(24px)", // Starting position
            animationTimingFunction: "ease-in",
          },
          "12.5%": {
            transform: "translateY(calc(100dvh - 136px))", // First drop
            animationTimingFunction: "ease-out",
          },
          "25%": {
            transform: "translateY(50dvh)", // First bounce up
            animationTimingFunction: "ease-in",
          },
          "37.5%": {
            transform: "translateY(calc(100dvh - 136px))", // Second drop
            animationTimingFunction: "ease-out",
          },
          "50%": {
            transform: "translateY(55dvh)", // Second bounce up
            animationTimingFunction: "ease-in",
          },
          "62.5%": {
            transform: "translateY(calc(100dvh - 136px))", // Third drop
            animationTimingFunction: "ease-out",
          },
          "75%": {
            transform: "translateY(60dvh)", // Third bounce up
            animationTimingFunction: "ease-in",
          },
          "87.5%": {
            transform: "translateY(calc(100dvh - 136px))", // Fourth drop
            animationTimingFunction: "ease-out",
          },

          "100%": {
            transform: "translateY(0)", // Final rest at bottom
            animationTimingFunction: "ease-in-out",
          },
        },
        arcadeBallShake: {
          "0%": {
            transform:
              "rotate(var(--rotationDegree, 0deg)) translate(0px, 0px)",
            animationDelay: "var(--delay, 0s)",
          },
          "25%": {
            transform:
              "rotate(var(--rotationDegree, 0deg)) translate(var(--translateAmountX, 2px), var(--translateAmountY, 2px))",
            animationDelay: "var(--delay, 0s)",
          },
          "50%": {
            transform:
              "rotate(var(--rotationDegree, 0deg)) translate(calc(var(--translateAmountX, 2px) * -1), calc(var(--translateAmountY, 2px) * -1))",
            animationDelay: "var(--delay, 0s)",
          },
          "75%": {
            transform:
              "rotate(var(--rotationDegree, 0deg)) translate(var(--translateAmountX, 2px), calc(var(--translateAmountY, 2px) * -1))",
            animationDelay: "var(--delay, 0s)",
          },
          "100%": {
            transform:
              "rotate(var(--rotationDegree, 0deg)) translate(0px, 0px)",
            animationDelay: "var(--delay, 0s)",
          },
        },
        scaleUp: {
          "0%": {
            transform: "scale(1.1) translateY(25px)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
          },
        },
        scaleDown: {
          "0%": {
            transform: "scale(1) translateY(0)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1.1) translateY(50px)",
            opacity: "0",
          },
        },
        bounceInLeft: {
          "0%": {
            opacity: "0",
            transform: "translateX(40px)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        bounceInRight: {
          "0%": {
            opacity: "0",
            transform: "translateX(-40px)",
          },
          "100%": {
            transform: "translateX(0)",
            opacity: "1",
          },
        },
        mover: {
          "0%": { transform: "translateY(5px)" },
          "100%": { transform: "translateY(-7px)" },
        },
        gradient: {
          "50%": {
            backgroundPosition: "140% 50%",
          },
        },
        rotateIn: {
          "0%": { transform: "rotateY(270deg)" },
          "50%": { transform: "rotateY(0deg)" },
          "80%": { transform: "rotateY(-90deg)" },
          "100%": { transform: "rotateY(-90deg)" },
        },
        flip: {
          "0%": { transform: "rotateY(0deg) " },
          "50%": { transform: "rotateY(170deg)" },
          "100%": { transform: "rotateY(180deg)" },
        },
        move: {
          "0%": {
            transform: "translateY(0) rotateX(0deg)", // Starts smaller
          },
          "25%": {
            transform: "translateY(1px) translateX(1px) rotateX(40deg) ", // Grows larger
          },
          "50%": {
            transform: "translateY(0) rotateX(10deg) ", // Slightly larger
          },
          "75%": {
            transform: "translateY(-1px) translateX(-1px) rotateX(-40deg) ",
          },
          "100%": {
            transform: "translateY(0) rotateX(0deg)", // Back to normal size
          },
        },
        scaleEffect: {
          "0%": {
            transform: "scale(0.9)", // Starts smaller
          },
          "50%": {
            transform: "scale(1.1)", // Grows larger
          },
          "100%": {
            transform: "scale(1)", // Returns to normal size
          },
        },
        moveLeftRight: {
          "0% 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(80px)" },
          "75%": { transform: "translateX(-80px)" },
        },
        swing: {
          "0%": {
            transform: "rotate(0deg)",
            "animation-timing-function": "ease-out",
          },
          "25%": {
            transform: "rotate(70deg)",
            "animation-timing-function": "ease-in",
          },
          "50%": {
            transform: "rotate(0deg)",
            "animation-timing-function": "linear",
          },
        },
        swing2: {
          "0%": {
            transform: "rotate(0deg)",
            "animation-timing-function": "linear",
          },
          "50%": {
            transform: "rotate(0deg)",
            "animation-timing-function": "ease-out",
          },
          "75%": {
            transform: "rotate(-70deg)",
            "animation-timing-function": "ease-in",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        spin: "spin 1.5s linear infinite",
        "spin-slow": "spin 2s linear infinite",
        "fade-in-out": "fade-in-out 4s ease-in ease-out infinite",
        slideIn: "slideIn 1s ease-in-out",
        slideOut: "slideOut 1s ease-in-out",
        slideInWithoutFade: "slideInWithoutFade 1s ease-in-out",
        slideOutWithoutFade: "slideOutWithoutFade 1s ease-in-out",
        topToBottom: "topToBottom 10s infinite 0s",
        shake: "shake 0.7s ease-in-out",
        arcadeBallShake: "arcadeBallShake var(--duration, 1s) ease-in-out",
        scaleUp: "scaleUp 0.3s ease-in-out",
        scaleDown: "scaleDown 0.3s ease-in-out",
        bounceInLeft: "bounceInLeft 0.3s ease-in-out",
        bounceInRight: "bounceInRight 0.3s ease-in-out",
        "vert-move": "mover 0.4s infinite alternate",
        gradient: "gradient 4s ease infinite",
        rotateIn: "rotateIn 1s ease-in-out",
        flip: "flip 1s infinite",
        swing: "swing 1.2s linear infinite",
        swing2: "swing2 1.2s linear infinite",
        moveLeftRight: "moveLeftRight 2s ease-in-out",
        ballBounce: "ballBounce 4.8s ease-in-out",
        move: "move 2s ease-in-out infinite",
        scaleEffect: "scaleEffect 2s ease-out infinite",
      },
      boxShadow: {
        tooltip:
          "0px 10px 3px 0px rgba(0, 0, 0, 0.00), 0px 6px 3px 0px rgba(0, 0, 0, 0.01), 0px 4px 2px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.09)",
        gameStepDialog:
          "0px 10px 3px 0px rgba(0, 0, 0, 0.00), 0px 6px 3px 0px rgba(0, 0, 0, 0.01), 0px 4px 2px 0px rgba(0, 0, 0, 0.05), 0px 2px 2px 0px rgba(0, 0, 0, 0.08), 0px 0px 1px 0px rgba(0, 0, 0, 0.09)",
        bottomNav: "0px 4px 40px 0px rgba(0, 0, 0, 0.08)",
      },
      backgroundImage: {
        progressGradient: "linear-gradient(90deg, #B0FF4B 0%, #00C064 100%)",
        claimProgressButton:
          "linear-gradient(270deg, #FD94FF 0%, #5AFFFF 37.5%, #B0FF4B 64.53%, #FFFF4B 100%);",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), addScrollbarUtilities],
} satisfies Config;

export default config;
