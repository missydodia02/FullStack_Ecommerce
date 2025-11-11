package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class OrderDeliveryScheduler {

    private final OrderRepository orderRepo;

    public OrderDeliveryScheduler(OrderRepository orderRepo) { this.orderRepo = orderRepo; }

    // run every minute for demo; adjust in production
    @Scheduled(fixedRate = 60000)
    public void deliverOrders() {
        List<Order> pending = orderRepo.findAll().stream()
                .filter(o -> "PENDING".equalsIgnoreCase(o.getStatus()))
                .toList();

        LocalDateTime now = LocalDateTime.now();
        for (Order o : pending) {
            if (o.getPlacedAt() != null && o.getPlacedAt().plusHours(6).isBefore(now)) {
                o.setStatus("DELIVERED");
                o.setDeliveredAt(now);
                orderRepo.save(o);
            }
        }
    }
}
