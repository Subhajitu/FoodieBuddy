import { Metadata } from 'next';
import CartClient from './CartClient';

export const metadata: Metadata = {
  title: 'Your Shopping Cart | FoodieBuddy',
  description: 'Review your items and proceed to checkout to get your delicious food delivered.',
};

export default function CartPage() {
  return <CartClient />;
}
