package com.foodiebuddy.payment.saga;

import com.foodiebuddy.payment.model.Payment;
import com.foodiebuddy.payment.service.PaymentService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.concurrent.CompletableFuture;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PaymentListenerTest {

    @Mock
    private KafkaTemplate<String, String> kafkaTemplate;

    @Mock
    private PaymentService paymentService;

    @InjectMocks
    private PaymentListener paymentListener;

    @Test
    void onOrderCreated_ShouldProcessPaymentAndSendSuccess() {
        Payment payment = new Payment(123L, 50.0, "PAID", null);
        when(paymentService.processPayment(eq(123L), anyDouble())).thenReturn(payment);
        when(kafkaTemplate.send(anyString(), anyString())).thenReturn(CompletableFuture.completedFuture(null));

        paymentListener.onOrderCreated("123");

        verify(paymentService).processPayment(123L, 50.0);
        verify(kafkaTemplate).send("payment-success", "123");
    }

    @Test
    void onOrderCreated_ShouldProcessPaymentAndSendFailure() {
        Payment payment = new Payment(123L, 50.0, "FAILED", null);
        when(paymentService.processPayment(eq(123L), anyDouble())).thenReturn(payment);
        when(kafkaTemplate.send(anyString(), anyString())).thenReturn(CompletableFuture.completedFuture(null));

        paymentListener.onOrderCreated("123");

        verify(kafkaTemplate).send("payment-failed", "123");
    }
}
