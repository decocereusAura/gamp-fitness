"use client";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { forwardRef, Ref, useRef } from "react";

export const textVariants = cva("", {
  variants: {
    intent: {
      leading: "text-[96px] leading-[100%] tracking-[-4.32px]",
      subLeading:
        "text-[51px] xxs:text-[60px] leading-[120%] tracking-[-2.24px]",
      largestHeadline: "text-[56px] leading-[120%] tracking-[-2.24px]",
      largeHeadline: "text-5xl leading-[120%] tracking-[-1.92px]", // 48px
      mediumHeadline: "text-[40px] leading-[120%] tracking-[-1.6px]", // 40px
      secondaryHeading: "text-[44px] leading-[80%] tracking-[-1.76px]", // 44px
      primaryHeadline: "text-4xl leading-[120%] tracking-[-1.44px]", // 36px
      secondaryHeadline: "text-[35px] leading-[120%] tracking-[-1.28px]",
      largePageHeadline: "text-[32px] leading-[120%] tracking-[-1.28px]",
      pageHeadline: "text-[28px] leading-[120%] tracking-[-1.12px]",
      pageSummary: "text-[26px] leading-[120%] tracking-[-0.39px]",
      pageSubheading: "text-[24px] leading-[120%] tracking-[-0.96px]",
      heading: "text-[22px] leading-[120%] tracking-[-0.88px]",
      headline: "text-[20px] leading-[120%]",
      sectionHeadline: "text-lg leading-[120%] tracking-[-0.18px]", // 18px
      paragraph: "text-base leading-[140%]", // 16px
      body: "text-sm", // 14px
      caption: "text-sm leading-[120%] tracking-[0.28px]",
      label: "text-[13px] leading-[120%] tracking-[0.13px]",
      info: "text-xs leading-[120%] tracking-[0.13px]", // 12px
      infoSecondary: "text-[11px] leading-[120%] tracking-[-0.44px]", // 11px
      secondaryInfo: "text-[11px] leading-[170%] tracking-[-0.1px]", // 11px
      miniInfo: "text-[10px] leading-[120%] tracking-[-0.1px]", // 10px
      miniText: "text-[9px] leading-[120%] tracking-[0.09px]",
      axisText: "text-[8px] -tracking-[0.16px]",
      cardReward: "text-[7px] leading-[120%]",
      custom: "",
    },
    color: {
      default: "text-white",
      primary: "text-primaryText",
      muted: "text-muted",
      glitchPink: "text-glitchPink",
      basecampBlue: "text-basecampBlue",
      ultimateBlue: "text-ultimateBlue",
      virtualGreen: "text-virtualGreen",
      hypeYellow: "text-hypeYellow",
      blue: "text-blue",
      red: "text-red",
      secondaryRed: "text-redtext",
      green: "text-green",
      lightGreen: "text-lightGreen",
      yellow: "text-yellow",
      white: "text-white",
      lightWhite: "text-lightWhite",
      strikeThrough: "text-strikeThrough",
      lighterGrey: "text-lighter-grey",
      black: "text-black",
      midBlack: "text-mid-black",
      jetBlack: "text-jetBlack",
      infoBlue: "text-infoBlue",
      offGrey: "text-off-grey",
      "dark-blue": "text-dark-blue",
      "disable-white": "text-disable-white",
      "grey-100": "text-grey-100",
      "grey-200": "text-grey-200",
      "grey-300": "text-grey-300",
      "grey-400": "text-grey-400",
      "grey-500": "text-grey-500",
      "grey-600": "text-grey-600",
      "dim-grey": "text-dim-grey",
      "dark-grey": "text-dark-grey",
      "mid-black": "text-mid-black",
      "black-50": "text-black-50",
    },
    opacity: {
      "opacity-50": "opacity-50",
      "opacity-60": "opacity-60",
    },
    weight: {
      // 700
      bold: "font-bold",
      // 600
      "semi-bold": "font-semibold",
      // 500
      medium: "font-medium",
      // 400
      normal: "font-normal",
      // 300
      light: "font-light",
    },
    textTransform: {
      uppercase: "uppercase",
      lowercase: "lowercase",
      capitalize: "capitalize",
    },
    align: {
      center: "text-center",
      right: "text-right",
      left: "text-left",
      justify: "text-justify",
    },
    textOverflow: {
      ellipsis: "text-ellipsis whitespace-nowrap overflow-hidden",
      "break-word": "break-words",
      all: "break-all",
    },
    fontFamily: {
      silka: "font-silka",
      gelica: "font-gelica",
    },
  },
  defaultVariants: {
    intent: "body",
    color: "black",
    fontFamily: "silka",
  },
});

interface TextProps<T extends React.ElementType>
  extends VariantProps<typeof textVariants> {
  as?: T;
  className?: string;
  children?: React.ReactNode;
}

const Text = <T extends React.ElementType = "span">(
  {
    className,
    intent,
    color,
    weight,
    opacity,
    textTransform,
    fontFamily,
    textOverflow,
    align,
    as,
    ...props
  }: TextProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof TextProps<T>>,
  ref: Ref<HTMLElement>
) => {
  const localRef = useRef(null);
  const textRef = ref || localRef;
  const Component = as ?? "span";

  return (
    <Component
      ref={textRef}
      className={cn(
        textVariants({
          intent,
          color,
          weight,
          opacity,
          fontFamily,
          textTransform,
          textOverflow,
          align,
        }),
        className
      )}
      {...props}
    />
  );
};

Text.displayName = "Text";

export default forwardRef(Text);
