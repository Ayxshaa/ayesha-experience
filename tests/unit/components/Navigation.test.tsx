import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navigation from '@/components/Navigation';
import { NavigationContext } from '@/context/NavigationContext';

describe('Navigation Component', () => {
  const mockScrollToSection = vi.fn();

  const renderNavigation = () => {
    return render(
      <NavigationContext.Provider value={{ scrollToSection: mockScrollToSection }}>
        <Navigation />
      </NavigationContext.Provider>
    );
  };

  it('renders the navigation component', () => {
    renderNavigation();
    expect(screen.getByText('AYESHA.')).toBeInTheDocument();
  });

  it('has navigation links', () => {
    renderNavigation();
    expect(screen.getByText('HOME')).toBeInTheDocument();
    expect(screen.getByText('ABOUT')).toBeInTheDocument();
    expect(screen.getByText('VALUES')).toBeInTheDocument();
    expect(screen.getByText('PROJECTS')).toBeInTheDocument();
  });

  it('calls scrollToSection when navigation link is clicked', async () => {
    const user = userEvent.setup();
    renderNavigation();
    
    const homeLink = screen.getByText('HOME');
    await user.click(homeLink);
    
    expect(mockScrollToSection).toHaveBeenCalledWith('hero');
  });
});
