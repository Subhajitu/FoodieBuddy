package com.foodiebuddy.payment.saga;

import java.util.concurrent.ThreadLocalRandom;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class PaymentListener {

 private static final String PAYMENT_SUCCESS_TOPIC = "payment-success";
 private static final String PAYMENT_FAILED_TOPIC = "payment-failed";
 private static final int SUCCESS_RATE_PERCENT = 80;

 private final KafkaTemplate<String, String> kafkaTemplate;

 public PaymentListener(KafkaTemplate<String, String> kafkaTemplate) {
  this.kafkaTemplate = kafkaTemplate;
 }

 @KafkaListener(topics = "order-created", groupId = "payment")
 public void onOrderCreated(String orderId) {
  if (!StringUtils.hasText(orderId)) {
   kafkaTemplate.send(PAYMENT_FAILED_TOPIC, "");
   return;
  }

  String resultTopic = simulatePayment()
    ? PAYMENT_SUCCESS_TOPIC
    : PAYMENT_FAILED_TOPIC;

  kafkaTemplate.send(resultTopic, orderId);
 }

 private boolean simulatePayment() {
  return ThreadLocalRandom.current().nextInt(100) < SUCCESS_RATE_PERCENT;
 }
}
