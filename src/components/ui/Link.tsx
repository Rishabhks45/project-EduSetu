import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const Link: React.FC<LinkProps> = ({ href, children, className = '' }) => {
  return (
    <a
      href={href}
      className={`text-gray-700 hover:text-primary-600 transition-colors duration-200 ${className}`}
    >
      {children}
    </a>
  );
};