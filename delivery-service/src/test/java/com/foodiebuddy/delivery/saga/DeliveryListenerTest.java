package com.foodiebuddy.delivery.saga;

import com.foodiebuddy.delivery.service.DeliveryService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DeliveryListenerTest {

    @Mock
    private DeliveryService deliveryService;

    @InjectMocks
    private DeliveryListener deliveryListener;

    @Test
    void onPaymentSuccess_ShouldCreateDeliveryReadyForPickup() {
        deliveryListener.onPaymentSuccess("123");
        verify(deliveryService).createOrUpdateDelivery(123L, "READY_FOR_PICKUP");
    }

    @Test
    void onPaymentFailed_ShouldUpdateStatusToCancelled() {
        deliveryListener.onPaymentFailed("123");
        verify(deliveryService).createOrUpdateDelivery(123L, "CANCELLED_PAYMENT_FAILED");
    }
}
