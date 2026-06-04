package com.foodiebuddy.delivery.saga;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
public class DeliveryListener {

 private static final Logger log = LoggerFactory.getLogger(DeliveryListener.class);

 @KafkaListener(topics = "payment-success", groupId = "delivery")
 public void onPaymentSuccess(String orderId) {
  if (!StringUtils.hasText(orderId)) {
   log.warn("Received payment-success event without an order id");
   return;
  }

  updateDeliveryStatus(orderId, "READY_FOR_PICKUP");
  log.info("Delivery started for order {}", orderId);
 }

 @KafkaListener(topics = "payment-failed", groupId = "delivery")
 public void onPaymentFailed(String orderId) {
  if (!StringUtils.hasText(orderId)) {
   log.warn("Received payment-failed event without an order id");
   return;
  }

  log.warn("Payment failed for order {}; delivery will not be started", orderId);
  compensateFailedPayment(orderId);
 }

 private void updateDeliveryStatus(String orderId, String status) {
  log.info("Updated delivery status for order {} to {}", orderId, status);
 }

 private void compensateFailedPayment(String orderId) {
  log.info("Compensating order {} after payment failure: releasing delivery slot", orderId);
 }
}
