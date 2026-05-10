import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-[#4CC9F0] text-[#0F172A] hover:bg-[#3AA7CC] hover:-translate-y-0.5 active:scale-[0.97] shadow-[0_0_15px_rgba(76,201,240,0.3)]",
        secondary: "bg-[#1F2937] text-[#E5E7EB] border border-[rgba(255,255,255,0.12)] hover:bg-[#2D3748] active:scale-[0.97]",
        outline: "border border-[#4CC9F0]/50 bg-transparent text-[#4CC9F0] hover:bg-[#4CC9F0]/10 active:scale-[0.97]",
        ghost: "bg-transparent text-[#6B7280] border border-transparent hover:bg-[rgba(255,255,255,0.05)] hover:text-[#9CA3AF] active:scale-[0.97]",
        destructive: "bg-[#EF4444] text-white hover:bg-red-600 hover:-translate-y-0.5 active:scale-[0.97] shadow-[0_0_15px_rgba(239,68,68,0.3)]",
        primary: "bg-[#F97316] text-white hover:bg-[#EA580C] hover:-translate-y-0.5 active:scale-[0.97] shadow-[0_0_15px_rgba(249,115,22,0.3)]",
        secondaryLight: "bg-[#FFEDD5] text-[#9A3412] border border-[rgba(0,0,0,0.1)] hover:bg-[#FED7AA] active:scale-[0.97]",
        outlineLight: "border border-[#F97316]/50 bg-transparent text-[#F97316] hover:bg-[#F97316]/10 active:scale-[0.97]",
        ghostLight: "bg-transparent text-[#9A3412] border border-transparent hover:bg-[rgba(0,0,0,0.05)] hover:text-[#7C2D12] active:scale-[0.97]",
      },
      size: {
        default: "h-9 px-4 py-1.5",
        sm: "h-8 px-3 text-xs",
        lg: "h-10 px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    as_child?: boolean
  }

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, as_child = false, ...props }, ref) => {
    const Comp = as_child ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }