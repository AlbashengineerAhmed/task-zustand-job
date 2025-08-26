import React from 'react';
import { cn } from '../../lib/utils.js';

/**
 * Input Component
 * Reusable input field with different variants
 */
const Input = React.forwardRef(({ 
  className, 
  type = 'text',
  placeholder,
  error,
  label,
  ...props 
}, ref) => {
  return (
    <div className="w-full">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      {/* Input field */}
      <input
        type={type}
        className={cn(
          // Base styles
          'flex h-10 w-full rounded-md border px-3 py-2 text-sm',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Default border and focus styles
          error 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
            : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
          // Custom className
          className
        )}
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
      
      {/* Error message */}
      {error && (
        <p className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;