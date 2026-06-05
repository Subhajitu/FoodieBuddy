package com.foodiebuddy.delivery.controller;

import com.foodiebuddy.delivery.model.Delivery;
import com.foodiebuddy.delivery.service.DeliveryService;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/deliveries")
public class DeliveryController {

    private final DeliveryService deliveryService;

    public DeliveryController(DeliveryService deliveryService) {
        this.deliveryService = deliveryService;
    }

    @PostMapping("/assign/{orderId}")
    public ResponseEntity<Delivery> assignDelivery(@PathVariable Long orderId, @RequestParam String deliveryPerson) {
        return ResponseEntity.ok(deliveryService.assignDelivery(orderId, deliveryPerson));
    }

    @PutMapping("/delivered/{orderId}")
    public ResponseEntity<Delivery> markAsDelivered(@PathVariable Long orderId) {
        return ResponseEntity.ok(deliveryService.markAsDelivered(orderId));
    }

    @GetMapping
    public List<Delivery> listDeliveries() {
        return deliveryService.getAllDeliveries();
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Delivery> getDeliveryByOrder(@PathVariable Long orderId) {
        return ResponseEntity.ok(deliveryService.getDeliveryByOrderId(orderId));
    }
}
