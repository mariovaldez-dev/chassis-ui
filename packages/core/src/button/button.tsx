import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@synthetix-ui/utils";

import type { ButtonProps } from "./button.types";

export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-md text-sm font-medium transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary:   "bg-muted text-foreground hover:bg-accent/80 shadow-sm",
        secondary: "border border-border bg-background text-foreground hover:bg-muted",
        outline:   "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost:     "text-foreground hover:bg-muted",
        danger:    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        link:      "text-foreground underline-offset-4 hover:text-foreground/80 hover:underline",
      },
      size: {
        sm:   "h-8 rounded-md px-3 text-xs",
        md:   "h-9 px-4 py-2",
        lg:   "h-10 rounded-md px-6",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export function Button({
  variant,
  size,
  asChild = false,
  isLoading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonProps): React.JSX.Element {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant ?? "primary"}
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={!asChild ? (disabled ?? isLoading) : undefined}
      aria-busy={!asChild ? isLoading : undefined}
      {...props}
    >
      {!asChild && isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      )}
      {children}
    </Comp>
  );
}
