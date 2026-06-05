import { Metadata } from 'next';
import LoginClient from './LoginClient';

export const metadata: Metadata = {
  title: 'Login | FoodieBuddy',
  description: 'Log in to your FoodieBuddy account to start ordering your favorite meals.',
};

export default function LoginPage() {
  return <LoginClient />;
}
