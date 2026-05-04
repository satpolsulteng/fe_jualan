import React from 'react';
import { Icon } from '@iconify/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: string;
  rightIcon?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/50 shadow-lg shadow-primary/20',
    secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200 focus:ring-slate-300',
    outline: 'border-2 border-slate-200 text-slate-600 hover:border-primary hover:text-primary focus:ring-primary/30',
    ghost: 'text-slate-500 hover:bg-slate-100 hover:text-slate-700',
    danger: 'bg-rose-500 text-white hover:bg-rose-600 focus:ring-rose-300 shadow-lg shadow-rose-200',
    success: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-300 shadow-lg shadow-emerald-200',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3.5 text-base',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Icon icon="mdi:loading" className="animate-spin mr-2 text-lg" />
      ) : leftIcon ? (
        <Icon icon={leftIcon} className="mr-2 text-lg" />
      ) : null}
      {children}
      {!isLoading && rightIcon && (
        <Icon icon={rightIcon} className="ml-2 text-lg" />
      )}
    </button>
  );
};

export default Button;
