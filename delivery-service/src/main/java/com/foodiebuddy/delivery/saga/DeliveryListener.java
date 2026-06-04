package com.foodiebuddy.delivery.saga;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class DeliveryListener {

 @KafkaListener(topics="payment-success", groupId="delivery")
 public void startDelivery(String orderId) {
  System.out.println("Delivery started for order " + orderId);
 }
}
