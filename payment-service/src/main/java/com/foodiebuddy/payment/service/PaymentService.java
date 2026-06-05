package com.foodiebuddy.payment.service;

import com.foodiebuddy.payment.model.Payment;
import com.foodiebuddy.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private static final int SUCCESS_RATE_PERCENT = 80;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Payment processPayment(Long orderId, Double amount) {
        String status = simulatePayment() ? "PAID" : "FAILED";
        Payment payment = new Payment(orderId, amount, status, LocalDateTime.now());
        return paymentRepository.save(payment);
    }

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Payment not found for order id: " + orderId));
    }

    private boolean simulatePayment() {
        return ThreadLocalRandom.current().nextInt(100) < SUCCESS_RATE_PERCENT;
    }
}
