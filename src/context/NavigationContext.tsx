import React, { createContext } from 'react';

export interface NavigationContextType {
  scrollToSection: (sectionId: string) => void;
}

export const NavigationContext = createContext<NavigationContextType>({
  scrollToSection: () => {},
});

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
};
