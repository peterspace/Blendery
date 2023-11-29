import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-bgPrimary text-white hover:bg-bgPrimary/90',
        destructive: 'bg-bgPrimary text-white hover:bg-bgPrimary/90',
        outline: 'bg-bgPrimary text-white hover:bg-bgPrimary/90',
        secondary: 'bg-bgPrimary text-white hover:bg-bgPrimary/90',
        ghost: 'bg-bgPrimary text-white hover:bg-bgPrimary/90',
        link: 'bg-bgPrimary text-white hover:bg-bgPrimary/90',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);


const Button = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <button
      type={type ? type : 'button'}
      className={cn(
        'cursor-pointer shadow-lg hover:-translate-y-0.5 transform transition flex flex-row justify-center items-center bg-bgPrimary hover:opacity-90 text-white shrink-0 rounded px-2 py-2 w-fit',
        className
      )}
      ref={ref}
      {...props}
    ></button>
  );
});
Button.displayName = 'Button';

// export { Button, buttonVariants };
export { Button };
