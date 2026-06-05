import { Metadata } from 'next';
import RestaurantsClient from './RestaurantsClient';

export const metadata: Metadata = {
  title: 'Restaurants | FoodieBuddy',
  description: 'Discover the best local restaurants and order delicious food for delivery or pickup.',
};

export default function RestaurantsPage() {
  return <RestaurantsClient />;
}
