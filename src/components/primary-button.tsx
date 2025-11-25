import * as React from 'react';
import { Button, ButtonProps } from './button';
import { useThemeColors } from "@/hooks/useThemeColors";

export interface PrimaryButtonProps extends ButtonProps {}

const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ className, style, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const { primaryColor, getPrimaryHoverStyle } = useThemeColors();
    const [isHovered, setIsHovered] = React.useState(false);

    const combinedStyle = {
      backgroundColor: primaryColor,
      color: 'white',
      ...(isHovered ? getPrimaryHoverStyle() : {}),
      ...style,
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(true);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
      setIsHovered(false);
      onMouseLeave?.(e);
    };

    return (
      <Button
        ref={ref}
        className={className}
        style={combinedStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export { PrimaryButton };
