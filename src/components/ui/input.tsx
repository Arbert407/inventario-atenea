import * as React from "react"
import { cn } from "@/lib/utils"
import { useTheme } from "@/hooks/useTheme"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const { theme } = useTheme()
    
    const styles = {
      dark: {
        bg: 'rgba(255,255,255,0.05)',
        border: 'rgba(255,255,255,0.12)',
        text: '#E5E7EB',
        placeholder: '#6B7280',
      },
      light: {
        bg: 'rgba(0,0,0,0.05)',
        border: 'rgba(0,0,0,0.15)',
        text: '#1F2937',
        placeholder: '#6B7280',
      },
    }
    
    const s = styles[theme]
    
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        style={{
          backgroundColor: s.bg,
          borderColor: s.border,
          color: s.text,
        }}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }