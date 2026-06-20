import * as React from "react"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <button
      className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0079CE] disabled:opacity-50 disabled:pointer-events-none ${className || ''}`}
      ref={ref}
      {...props}
    />
  )
)
Button.displayName = "Button"

export { Button }
