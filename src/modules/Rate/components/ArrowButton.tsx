import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/utils'

export default function ArrowButton ({
  arrow,
  className,
  disabled,
  onClick
}: {
  arrow: string
  disabled: boolean
  className?: string
  onClick: () => void
}): JSX.Element {
  return (
    <Button
      className={cn('text-2xl', className)}
      disabled={disabled}
      onClick={onClick}
    >
      {arrow}
    </Button>
  )
}
