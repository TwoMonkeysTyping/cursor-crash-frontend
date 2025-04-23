import { ButtonHTMLAttributes } from 'react'
import clsx from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'ghost'
}

export function Button({ variant = 'default', className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        'px-4 py-2 rounded-md font-medium transition',
        variant === 'default' && 'bg-blue-600 text-white hover:bg-blue-700',
        variant === 'ghost' && 'bg-transparent text-gray-700 hover:bg-gray-100',
        className
      )}
    />
  )
}
