package com.foodiebuddy.order.service;

import com.foodiebuddy.order.model.Order;
import com.foodiebuddy.order.repository.OrderRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class OrderServiceTest {

    @Mock
    private OrderRepository orderRepository;

    @Mock
    private KafkaTemplate<String, String> kafkaTemplate;

    @InjectMocks
    private OrderService orderService;

    private Order order;

    @BeforeEach
    void setUp() {
        order = new Order(1L, 1L, "PENDING", LocalDateTime.now());
        order.setId(1L);
    }

    @Test
    void createOrder_ShouldReturnSavedOrderWithPendingStatus() {
        when(orderRepository.saveAndFlush(any(Order.class))).thenReturn(order);
        when(kafkaTemplate.send(anyString(), anyString())).thenReturn(CompletableFuture.completedFuture(null));

        Order result = orderService.createOrder(new Order(1L, 1L, null, null));

        assertNotNull(result);
        assertEquals("PENDING", result.getStatus());
        verify(orderRepository, times(1)).saveAndFlush(any(Order.class));
        verify(kafkaTemplate, times(1)).send(eq("order-created"), anyString());
    }

    @Test
    void getAllOrders_ShouldReturnList() {
        when(orderRepository.findAll()).thenReturn(Arrays.asList(order));

        List<Order> result = orderService.getAllOrders();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(orderRepository, times(1)).findAll();
    }

    @Test
    void getOrderById_WhenIdExists_ShouldReturnOrder() {
        when(orderRepository.findById(1L)).thenReturn(Optional.of(order));

        Order result = orderService.getOrderById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void getOrderById_WhenIdDoesNotExist_ShouldThrowException() {
        when(orderRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> orderService.getOrderById(2L));
    }

    @Test
    void orderFallback_ShouldReturnOrderWithRetryStatus() {
        Order inputOrder = new Order(1L, 1L, null, null);
        Throwable throwable = new RuntimeException("Kafka down");

        Order result = orderService.orderFallback(inputOrder, throwable);

        assertEquals("ORDER_PENDING_RETRY", result.getStatus());
        assertNotNull(result.getOrderDate());
    }
}
