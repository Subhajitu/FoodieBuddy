package com.foodiebuddy.delivery.saga;

import com.foodiebuddy.delivery.service.DeliveryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class DeliveryListener {

    private static final Logger log = LoggerFactory.getLogger(DeliveryListener.class);
    private final DeliveryService deliveryService;

    public DeliveryListener(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @KafkaListener(topics = "payment-success", groupId = "delivery")
    public void onPaymentSuccess(String orderId) {
        if (!StringUtils.hasText(orderId)) {
            log.warn("Received payment-success event without an order id");
            return;
        }

        try {
            Long id = Long.parseLong(orderId);
            deliveryService.createOrUpdateDelivery(id, "READY_FOR_PICKUP");
            log.info("Delivery started for order {}", orderId);
        } catch (NumberFormatException e) {
            log.error("Invalid order id format: {}", orderId);
        }
    }

    @KafkaListener(topics = "payment-failed", groupId = "delivery")
    public void onPaymentFailed(String orderId) {
        if (!StringUtils.hasText(orderId)) {
            log.warn("Received payment-failed event without an order id");
            return;
        }

        log.warn("Payment failed for order {}; delivery will not be started", orderId);
        try {
            Long id = Long.parseLong(orderId);
            deliveryService.createOrUpdateDelivery(id, "CANCELLED_PAYMENT_FAILED");
        } catch (NumberFormatException e) {
            log.error("Invalid order id format: {}", orderId);
        }
    }
}
