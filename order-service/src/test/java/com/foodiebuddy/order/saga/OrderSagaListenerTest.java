package com.foodiebuddy.order.saga;

import com.foodiebuddy.order.service.OrderService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderSagaListenerTest {

    @Mock
    private OrderService orderService;

    @InjectMocks
    private OrderSagaListener orderSagaListener;

    @Test
    void onPaymentSuccess_ShouldUpdateStatusToConfirmed() {
        orderSagaListener.onPaymentSuccess("123");
        verify(orderService, times(1)).updateOrderStatus(123L, "CONFIRMED");
    }

    @Test
    void onPaymentFailed_ShouldUpdateStatusToCancelled() {
        orderSagaListener.onPaymentFailed("123");
        verify(orderService, times(1)).updateOrderStatus(123L, "CANCELLED");
    }

    @Test
    void onPaymentSuccess_WithInvalidId_ShouldNotUpdateStatus() {
        orderSagaListener.onPaymentSuccess("abc");
        verify(orderService, never()).updateOrderStatus(anyLong(), anyString());
    }
}
