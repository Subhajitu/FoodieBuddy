package com.foodiebuddy.delivery.service;

import com.foodiebuddy.delivery.model.Delivery;
import com.foodiebuddy.delivery.repository.DeliveryRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class DeliveryService {

    private final DeliveryRepository deliveryRepository;

    public DeliveryService(DeliveryRepository deliveryRepository) {
        this.deliveryRepository = deliveryRepository;
    }

    public Delivery createOrUpdateDelivery(Long orderId, String status) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElse(new Delivery(orderId, status));
        delivery.setStatus(status);
        return deliveryRepository.save(delivery);
    }

    public Delivery assignDelivery(Long orderId, String deliveryPerson) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElse(new Delivery(orderId, "ASSIGNED"));
        delivery.setDeliveryPerson(deliveryPerson);
        delivery.setStatus("ASSIGNED");
        delivery.setAssignedAt(LocalDateTime.now());
        return deliveryRepository.save(delivery);
    }

    public Delivery markAsDelivered(Long orderId) {
        Delivery delivery = deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery not found for order id: " + orderId));
        delivery.setStatus("DELIVERED");
        delivery.setDeliveredAt(LocalDateTime.now());
        return deliveryRepository.save(delivery);
    }

    public List<Delivery> getAllDeliveries() {
        return deliveryRepository.findAll();
    }

    public Delivery getDeliveryByOrderId(Long orderId) {
        return deliveryRepository.findByOrderId(orderId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Delivery not found for order id: " + orderId));
    }
}
