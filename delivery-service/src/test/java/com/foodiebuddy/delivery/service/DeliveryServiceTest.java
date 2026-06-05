package com.foodiebuddy.delivery.service;

import com.foodiebuddy.delivery.model.Delivery;
import com.foodiebuddy.delivery.repository.DeliveryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class DeliveryServiceTest {

    @Mock
    private DeliveryRepository deliveryRepository;

    @InjectMocks
    private DeliveryService deliveryService;

    private Delivery delivery;

    @BeforeEach
    void setUp() {
        delivery = new Delivery(1L, "READY_FOR_PICKUP");
        delivery.setId(1L);
    }

    @Test
    void createOrUpdateDelivery_ShouldReturnSavedDelivery() {
        when(deliveryRepository.findByOrderId(1L)).thenReturn(Optional.empty());
        when(deliveryRepository.save(any(Delivery.class))).thenReturn(delivery);

        Delivery result = deliveryService.createOrUpdateDelivery(1L, "READY_FOR_PICKUP");

        assertNotNull(result);
        assertEquals("READY_FOR_PICKUP", result.getStatus());
        verify(deliveryRepository, times(1)).save(any(Delivery.class));
    }

    @Test
    void assignDelivery_ShouldSetDeliveryPersonAndStatus() {
        when(deliveryRepository.findByOrderId(1L)).thenReturn(Optional.of(delivery));
        when(deliveryRepository.save(any(Delivery.class))).thenReturn(delivery);

        Delivery result = deliveryService.assignDelivery(1L, "John Doe");

        assertEquals("ASSIGNED", result.getStatus());
        assertEquals("John Doe", result.getDeliveryPerson());
        assertNotNull(result.getAssignedAt());
    }

    @Test
    void markAsDelivered_ShouldSetStatusAndDate() {
        when(deliveryRepository.findByOrderId(1L)).thenReturn(Optional.of(delivery));
        when(deliveryRepository.save(any(Delivery.class))).thenReturn(delivery);

        Delivery result = deliveryService.markAsDelivered(1L);

        assertEquals("DELIVERED", result.getStatus());
        assertNotNull(result.getDeliveredAt());
    }

    @Test
    void markAsDelivered_WhenNotFound_ShouldThrowException() {
        when(deliveryRepository.findByOrderId(2L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> deliveryService.markAsDelivered(2L));
    }

    @Test
    void getAllDeliveries_ShouldReturnList() {
        when(deliveryRepository.findAll()).thenReturn(Arrays.asList(delivery));

        List<Delivery> result = deliveryService.getAllDeliveries();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }
}
