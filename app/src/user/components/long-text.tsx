import { useRef, useState } from 'react'
import { cn } from '../lib/utils'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import * as React from 'react'

type LongTextProps = {
  children: React.ReactNode
  className?: string
  contentClassName?: string
}

export function LongText({
  children,
  className = '',
  contentClassName = '',
}: LongTextProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isOverflown, setIsOverflown] = useState(false)

  // Use ref callback to check overflow when element is mounted
  const refCallback = (node: HTMLDivElement | null) => {
    // assign to ref via callback to satisfy readonly ref types
    if (node && checkOverflow(node)) {
      queueMicrotask(() => setIsOverflown(true))
    }
    // store node in ref if needed
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = node
  }

  if (!isOverflown)
    return (
      <div ref={refCallback} className={cn('truncate', className)}>
        {children}
      </div>
    )

  return (
    <>
      <div className='hidden sm:block'>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div ref={refCallback} className={cn('truncate', className)}>
                {children}
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p className={contentClassName}>{children}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='sm:hidden'>
        <Popover>
          <PopoverTrigger asChild>
            <div ref={refCallback} className={cn('truncate', className)}>
              {children}
            </div>
          </PopoverTrigger>
          <PopoverContent className={cn('w-fit', contentClassName)}>
            <p>{children}</p>
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}

const checkOverflow = (textContainer: HTMLDivElement | null) => {
  if (textContainer) {
    return (
      textContainer.offsetHeight < textContainer.scrollHeight ||
      textContainer.offsetWidth < textContainer.scrollWidth
    )
  }
  return false
}
