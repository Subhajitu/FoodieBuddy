package com.foodiebuddy.order.saga;

import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class OrderProducer {
 private final KafkaTemplate<String,String> kafka;

 public OrderProducer(KafkaTemplate<String,String> kafka) {
  this.kafka = kafka;
 }

 public void publishOrderCreated(Long orderId) {
  kafka.send("order-created", orderId.toString());
 }
}
