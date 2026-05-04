import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'slate' | 'blue' | 'emerald' | 'rose' | 'amber';
  size?: 'xs' | 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({ 
  children, 
  variant = 'slate',
  size = 'xs'
}) => {
  const variants = {
    slate: 'bg-slate-100 text-slate-600',
    blue: 'bg-blue-100 text-blue-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    rose: 'bg-rose-100 text-rose-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span className={`inline-flex items-center font-bold rounded-full uppercase tracking-wider ${variants[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
};

export default Badge;
