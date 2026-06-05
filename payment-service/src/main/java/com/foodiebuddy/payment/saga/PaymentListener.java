package com.foodiebuddy.payment.saga;

import com.foodiebuddy.payment.model.Payment;
import com.foodiebuddy.payment.service.PaymentService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class PaymentListener {

    private static final String PAYMENT_SUCCESS_TOPIC = "payment-success";
    private static final String PAYMENT_FAILED_TOPIC = "payment-failed";

    private final KafkaTemplate<String, String> kafkaTemplate;
    private final PaymentService paymentService;

    public PaymentListener(KafkaTemplate<String, String> kafkaTemplate, PaymentService paymentService) {
        this.kafkaTemplate = kafkaTemplate;
        this.paymentService = paymentService;
    }

    @KafkaListener(topics = "order-created", groupId = "payment")
    public void onOrderCreated(String orderId) {
        if (!StringUtils.hasText(orderId)) {
            kafkaTemplate.send(PAYMENT_FAILED_TOPIC, "");
            return;
        }

        try {
            Long id = Long.parseLong(orderId);
            // Assuming a default amount for simulation via Kafka
            Payment payment = paymentService.processPayment(id, 50.0);

            String resultTopic = "PAID".equals(payment.getStatus())
                    ? PAYMENT_SUCCESS_TOPIC
                    : PAYMENT_FAILED_TOPIC;

            kafkaTemplate.send(resultTopic, orderId);
        } catch (NumberFormatException e) {
            kafkaTemplate.send(PAYMENT_FAILED_TOPIC, orderId);
        }
    }
}
