import * as React from 'react';

import { cn } from '../lib/utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  // return (
  //   <input
  //     type={type}
  //     className={cn(
  //       "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-black dark:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  //       className
  //     )}
  //     ref={ref}
  //     {...props}
  //   />
  // );
  // return (
  //   <input
  //     type={type}
  //     className={cn(
  //       'outline-none flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50 bg-white hover:bg-gray-100 hover:outline hover:outline-lightslategray-300 hover:outline-[1px] text-black placeholder:text-black dark:bg-bgDarkMode dark:hover:bg-hoverDark dark:hover:outline dark:hover:outline-lightslategray-300 dark:hover:outline-[1px] dark:text-white dark:placeholder:text-white',
  //       className
  //     )}
  //     ref={ref}
  //     {...props}
  //   />
  // );

  return (
    <div className="flex text-gray-600 focus-within:text-gray-400 w-full">
      <input
        type={type}
        className={cn(
          'w-full py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900',
          className
        )}
        placeholder="Search..."
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };

{
  /* <div className="relative text-gray-600 focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <button type="submit" className="p-1 focus:outline-none focus:shadow-outline">
          <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" className="w-6 h-6"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
      </span>
      <input type="search" name="q" className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none focus:bg-white focus:text-gray-900" placeholder="Search..." autocomplete="off">
    </div> */
}
