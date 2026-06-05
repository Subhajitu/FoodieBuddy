import { Metadata } from 'next';
import RegisterClient from './RegisterClient';

export const metadata: Metadata = {
  title: 'Join FoodieBuddy | Create an Account',
  description: 'Create your FoodieBuddy account today and start ordering delicious food from local restaurants.',
};

export default function RegisterPage() {
  return <RegisterClient />;
}
