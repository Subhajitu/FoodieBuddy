package com.foodiebuddy.payment.service;

import com.foodiebuddy.payment.model.Payment;
import com.foodiebuddy.payment.repository.PaymentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class PaymentServiceTest {

    @Mock
    private PaymentRepository paymentRepository;

    @InjectMocks
    private PaymentService paymentService;

    private Payment payment;

    @BeforeEach
    void setUp() {
        payment = new Payment(1L, 50.0, "PAID", LocalDateTime.now());
        payment.setId(1L);
    }

    @Test
    void processPayment_ShouldReturnSavedPayment() {
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        Payment result = paymentService.processPayment(1L, 50.0);

        assertNotNull(result);
        assertTrue(Arrays.asList("PAID", "FAILED").contains(result.getStatus()));
        verify(paymentRepository, times(1)).save(any(Payment.class));
    }

    @Test
    void getAllPayments_ShouldReturnList() {
        when(paymentRepository.findAll()).thenReturn(Arrays.asList(payment));

        List<Payment> result = paymentService.getAllPayments();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(paymentRepository, times(1)).findAll();
    }

    @Test
    void getPaymentByOrderId_WhenIdExists_ShouldReturnPayment() {
        when(paymentRepository.findByOrderId(1L)).thenReturn(Optional.of(payment));

        Payment result = paymentService.getPaymentByOrderId(1L);

        assertNotNull(result);
        assertEquals(1L, result.getOrderId());
    }

    @Test
    void getPaymentByOrderId_WhenIdDoesNotExist_ShouldThrowException() {
        when(paymentRepository.findByOrderId(2L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> paymentService.getPaymentByOrderId(2L));
    }
}
