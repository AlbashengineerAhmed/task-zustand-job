import React from 'react';
import { cn } from '../../lib/utils.js';

/**
 * Badge Component
 * Small status indicators and labels
 */
const Badge = React.forwardRef(({ 
  className, 
  variant = 'default', 
  children,
  ...props 
}, ref) => {
  // Badge variant styles
  const variants = {
    default: 'bg-gray-100 text-gray-800 hover:bg-gray-200 border border-gray-200',
    primary: 'bg-blue-100 text-blue-800 hover:bg-blue-200 border border-blue-200',
    success: 'bg-green-100 text-green-800 hover:bg-green-200 border border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 border border-yellow-200',
    danger: 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  };

  return (
    <span
      className={cn(
        // Base styles
        'inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium',
        'transition-colors cursor-default shadow-sm',
        // Variant styles
        variants[variant],
        // Custom className
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;