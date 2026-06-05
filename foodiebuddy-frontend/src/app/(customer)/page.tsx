import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'FoodieBuddy | Delicious Food Delivered to Your Door',
  description: 'Order from your favorite restaurants and get food delivered fast with FoodieBuddy.',
};

export default function HomePage() {
  return <HomeClient />;
}
