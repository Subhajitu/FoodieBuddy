package com.foodiebuddy.order.service;

import com.foodiebuddy.order.model.Order;
import com.foodiebuddy.order.repository.OrderRepository;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import java.time.LocalDateTime;
import java.util.concurrent.ExecutionException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);
    private static final String CREATED_STATUS = "CREATED";
    private static final String PENDING_RETRY_STATUS = "ORDER_PENDING_RETRY";
    private static final String ORDER_CREATED_TOPIC = "order-created";

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, String> kafkaTemplate;

    public OrderService(
            OrderRepository orderRepository,
            KafkaTemplate<String, String> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional
    @CircuitBreaker(name = "orderServiceCB", fallbackMethod = "orderFallback")
    public Order createOrder(Order order) {
        order.setId(null);
        order.setStatus(CREATED_STATUS);
        order.setOrderDate(LocalDateTime.now());

        Order savedOrder = orderRepository.saveAndFlush(order);
        publishOrderCreated(savedOrder);

        return savedOrder;
    }

    public Order orderFallback(Order order, Throwable throwable) {
        log.warn("Order saga fallback triggered: {}", throwable.getMessage());
        Order fallbackOrder = order == null ? new Order() : order;
        fallbackOrder.setStatus(PENDING_RETRY_STATUS);
        if (fallbackOrder.getOrderDate() == null) {
            fallbackOrder.setOrderDate(LocalDateTime.now());
        }
        return fallbackOrder;
    }

    private void publishOrderCreated(Order order) {
        try {
            kafkaTemplate.send(ORDER_CREATED_TOPIC, order.getId().toString()).get();
        } catch (InterruptedException ex) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Interrupted while publishing order-created event", ex);
        } catch (ExecutionException ex) {
            throw new IllegalStateException("Failed to publish order-created event", ex);
        }
    }
}
