import React from 'react';
import './Card.css';

export interface CardProps {
  /**
   * Card title
   */
  title?: string;
  /**
   * Card description/content
   */
  children: React.ReactNode;
  /**
   * Card size variant
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Show shadow
   */
  shadow?: boolean;
  /**
   * Card border style
   */
  bordered?: boolean;
  /**
   * Custom CSS class
   */
  className?: string;
  /**
   * Click handler
   */
  onClick?: () => void;
}

/**
 * Card component for displaying content in a styled container
 */
export const Card: React.FC<CardProps> = ({
  title,
  children,
  size = 'medium',
  shadow = true,
  bordered = true,
  className = '',
  onClick,
  ...props
}) => {
  const classes = [
    'storybook-card',
    `storybook-card--${size}`,
    shadow ? 'storybook-card--shadow' : '',
    bordered ? 'storybook-card--bordered' : '',
    onClick ? 'storybook-card--clickable' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} onClick={onClick} {...props}>
      {title && <div className="storybook-card__header">{title}</div>}
      <div className="storybook-card__content">{children}</div>
    </div>
  );
};

export default Card;