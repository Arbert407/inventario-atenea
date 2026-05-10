import * as React from 'react'
import { cn } from '@/lib/utils'

type DialogProps = Readonly<{
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}>

function DialogRoot({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

const DialogTrigger = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <button type="button" onClick={onClick} className="cursor-pointer">
      {children}
    </button>
  )
}

function Dialog({
  open,
  onOpenChange,
  children,
}: DialogProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const isControlled = open !== undefined
  const isOpenFinal = isControlled ? open : isOpen

  const handleOpenChange = (value: boolean) => {
    if (!isControlled) {
      setIsOpen(value)
    }
    onOpenChange?.(value)
  }

  return (
    <DialogRoot>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<{
            open?: boolean
            onOpenChange?: (open: boolean) => void
          }>, {
            open: isOpenFinal,
            onOpenChange: handleOpenChange,
          })
        }
        return child
      })}
    </DialogRoot>
  )
}

type DialogContentProps = Readonly<{
  className?: string
  children: React.ReactNode
  onClose?: () => void
}>

function DialogContent({ className, children, onClose }: DialogContentProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          'relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background p-6 shadow-xl',
          className
        )}
      >
        {children}
      </div>
    </div>
  )
}

const DialogHeader = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div className={cn('mb-4', className)}>{children}</div>
)

const DialogTitle = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <h2 className={cn('text-xl font-semibold text-text-primary', className)}>
    {children}
  </h2>
)

const DialogDescription = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => <p className={cn('text-sm text-text-secondary mt-1', className)}>{children}</p>

const DialogFooter = ({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) => (
  <div className={cn('mt-6 flex gap-3 justify-end', className)}>{children}</div>
)

export { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter }