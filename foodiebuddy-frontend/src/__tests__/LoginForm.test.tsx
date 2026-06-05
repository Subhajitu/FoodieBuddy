import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/features/auth/LoginForm';
import { authApi } from '@/services/authApi';
import { useRouter } from 'next/navigation';

// Mock the dependencies
jest.mock('@/services/authApi');
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginForm Integration', () => {
  const mockPush = jest.fn();
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it('validates required fields', async () => {
    render(<LoginForm />);
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
    expect(await screen.findByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  it('submits form successfully and redirects', async () => {
    (authApi.login as jest.Mock).mockResolvedValue({ token: 'mock-token' });
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    await waitFor(() => {
      expect(authApi.login).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('displays error message on API failure', async () => {
    (authApi.login as jest.Mock).mockRejectedValue({
      response: { data: { message: 'Invalid credentials' } },
    });
    
    render(<LoginForm />);
    
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrong-password' } });
    
    fireEvent.click(screen.getByRole('button', { name: /login/i }));
    
    expect(await screen.findByText(/invalid credentials/i)).toBeInTheDocument();
  });
});
