import { useAuthStore } from '@/store/authStore';
import { act } from '@testing-library/react';

// Mock jwt-decode since we don't need to test its implementation
jest.mock('jwt-decode', () => ({
  jwtDecode: jest.fn(() => ({
    sub: '123',
    email: 'test@example.com',
    name: 'Test User',
    role: 'USER',
  })),
}));

describe('Auth Store', () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.getState().logout();
    });
  });

  it('initializes with null user and token', () => {
    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });

  it('sets user and token when setToken is called', () => {
    const mockToken = 'fake-jwt-token';
    
    act(() => {
      useAuthStore.getState().setToken(mockToken);
    });

    const state = useAuthStore.getState();
    expect(state.token).toBe(mockToken);
    expect(state.user).toEqual({
      id: '123',
      email: 'test@example.com',
      name: 'Test User',
      role: 'USER',
    });
  });

  it('clears state on logout', () => {
    act(() => {
      useAuthStore.getState().setToken('some-token');
      useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
  });
});
