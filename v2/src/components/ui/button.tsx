import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles
          "btn focus-visible:ring-offset-charcoal-900",
          // Variants
          {
            "btn-primary": variant === "primary",
            "btn-secondary": variant === "secondary",
            "border border-gray-600 bg-transparent text-gray-300 hover:bg-gray-800": variant === "outline",
            "bg-transparent text-gray-400 hover:bg-gray-800 hover:text-white": variant === "ghost",
          },
          // Sizes
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md",
            "h-12 px-6 text-base": size === "lg",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
