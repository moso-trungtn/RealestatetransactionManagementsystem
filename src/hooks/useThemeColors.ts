import { useWebsiteConfig } from "@/providers/WebsiteConfigContext";

/**
 * Hook to get dynamic theme colors and utilities
 */
export function useThemeColors() {
  const { config } = useWebsiteConfig();

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const getLighterShade = (hex: string, percent: number = 90) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const r = Math.round(rgb.r + (255 - rgb.r) * (percent / 100));
    const g = Math.round(rgb.g + (255 - rgb.g) * (percent / 100));
    const b = Math.round(rgb.b + (255 - rgb.b) * (percent / 100));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  const getDarkerShade = (hex: string, percent: number = 15) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const r = Math.round(rgb.r * (1 - percent / 100));
    const g = Math.round(rgb.g * (1 - percent / 100));
    const b = Math.round(rgb.b * (1 - percent / 100));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  return {
    primaryColor: config.primaryColor,
    secondaryColor: config.secondaryColor,
    primaryLight: getLighterShade(config.primaryColor, 90),
    primaryDark: getDarkerShade(config.primaryColor, 15),
    // Utility function for inline styles
    getPrimaryStyle: (variant: 'bg' | 'text' | 'border' = 'bg') => {
      switch (variant) {
        case 'bg':
          return { backgroundColor: config.primaryColor };
        case 'text':
          return { color: config.primaryColor };
        case 'border':
          return { borderColor: config.primaryColor };
      }
    },
    // Utility for light backgrounds
    getPrimaryLightStyle: (variant: 'bg' | 'text' | 'border' = 'bg') => {
      const lightColor = getLighterShade(config.primaryColor, 90);
      switch (variant) {
        case 'bg':
          return { backgroundColor: lightColor };
        case 'text':
          return { color: config.primaryColor };
        case 'border':
          return { borderColor: lightColor };
      }
    },
    // Utility for hover states
    getPrimaryHoverStyle: () => ({
      backgroundColor: getDarkerShade(config.primaryColor, 15),
    }),
    // Helper function to get light background color
    getLightPrimaryBg: () => getLighterShade(config.primaryColor, 90),
    // Helper function to get primary text class (returns empty string, use inline styles instead)
    getPrimaryTextClass: () => '',
  };
}
