import DeliveryLayout from '@/components/layout/DeliveryLayout';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DeliveryGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <DeliveryLayout>{children}</DeliveryLayout>
    </ProtectedRoute>
  );
}
