package com.foodiebuddy.order.saga;

import com.foodiebuddy.order.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderSagaListener {

    private static final Logger log = LoggerFactory.getLogger(OrderSagaListener.class);
    private final OrderService orderService;

    public OrderSagaListener(OrderService orderService) {
        this.orderService = orderService;
    }

    @KafkaListener(topics = "payment-success", groupId = "order-group")
    public void onPaymentSuccess(String orderId) {
        log.info("Received payment-success for order {}", orderId);
        try {
            orderService.updateOrderStatus(Long.parseLong(orderId), "CONFIRMED");
        } catch (Exception e) {
            log.error("Error updating order status for order {}: {}", orderId, e.getMessage());
        }
    }

    @KafkaListener(topics = "payment-failed", groupId = "order-group")
    public void onPaymentFailed(String orderId) {
        log.info("Received payment-failed for order {}", orderId);
        try {
            orderService.updateOrderStatus(Long.parseLong(orderId), "CANCELLED");
        } catch (Exception e) {
            log.error("Error updating order status for order {}: {}", orderId, e.getMessage());
        }
    }
}
