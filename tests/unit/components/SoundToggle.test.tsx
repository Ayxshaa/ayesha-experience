import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SoundToggle from '@/components/SoundToggle';

describe('SoundToggle Component', () => {
  it('renders the sound toggle button', () => {
    const mockToggle = vi.fn();
    render(<SoundToggle isMuted={true} onToggle={mockToggle} />);
    
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('displays "Sound Off" tooltip when muted', () => {
    const mockToggle = vi.fn();
    render(<SoundToggle isMuted={true} onToggle={mockToggle} />);
    
    expect(screen.getByText('Sound Off')).toBeInTheDocument();
  });

  it('displays "Sound On" tooltip when not muted', () => {
    const mockToggle = vi.fn();
    render(<SoundToggle isMuted={false} onToggle={mockToggle} />);
    
    expect(screen.getByText('Sound On')).toBeInTheDocument();
  });

  it('calls onToggle when clicked', async () => {
    const mockToggle = vi.fn();
    const user = userEvent.setup();
    render(<SoundToggle isMuted={true} onToggle={mockToggle} />);
    
    const button = screen.getByRole('button');
    await user.click(button);
    
    expect(mockToggle).toHaveBeenCalled();
  });
});
