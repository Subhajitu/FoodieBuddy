package com.foodiebuddy.payment.saga;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class PaymentListener {

 private final KafkaTemplate<String,String> kafka;

 public PaymentListener(KafkaTemplate<String,String> kafka) {
  this.kafka = kafka;
 }

 @KafkaListener(topics="order-created", groupId="payment")
 public void onOrder(String orderId) {
  kafka.send("payment-success", orderId);
 }
}
