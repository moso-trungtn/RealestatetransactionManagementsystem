'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface WebsiteConfig {
  primaryColor: string;
  secondaryColor: string;
  companyLogo: string;
  loadingIcon: 'spinner' | 'dots' | 'pulse';
}

interface WebsiteConfigContextType {
  config: WebsiteConfig;
  updateConfig: (newConfig: Partial<WebsiteConfig>) => void;
  resetToDefaults: () => void;
}

const defaultConfig: WebsiteConfig = {
  primaryColor: '#FF6B35',
  secondaryColor: '#FFFFFF',
  companyLogo: 'https://lh3.googleusercontent.com/zocKBfqQmYOuFFXc6NYKuZ3MdIFTRB__lFwK7W7d_9W1yuvL5YGsfs3kcW9sHwwLcV0tGac94myUm8oLV1gQjoCrMQmth-2Yvn3vPg',
  loadingIcon: 'spinner',
};

const WebsiteConfigContext = createContext<WebsiteConfigContextType | undefined>(undefined);

export function WebsiteConfigProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<WebsiteConfig>(defaultConfig);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('websiteConfig');
      if (saved) {
        const parsed = JSON.parse(saved);
        setConfig({ ...defaultConfig, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load website config:', error);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  const updateConfig = (newConfig: Partial<WebsiteConfig>) => {
    setConfig(prev => {
      const updated = { ...prev, ...newConfig };
      // Save to localStorage
      try {
        localStorage.setItem('websiteConfig', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save website config:', error);
      }
      return updated;
    });
  };

  const resetToDefaults = () => {
    setConfig(defaultConfig);
    try {
      localStorage.setItem('websiteConfig', JSON.stringify(defaultConfig));
    } catch (error) {
      console.error('Failed to reset website config:', error);
    }
  };

  return (
    <WebsiteConfigContext.Provider value={{ config, updateConfig, resetToDefaults }}>
      {children}
    </WebsiteConfigContext.Provider>
  );
}

export function useWebsiteConfig() {
  const context = useContext(WebsiteConfigContext);
  if (context === undefined) {
    throw new Error('useWebsiteConfig must be used within a WebsiteConfigProvider');
  }
  return context;
}