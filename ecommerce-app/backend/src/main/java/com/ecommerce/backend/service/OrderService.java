package com.ecommerce.backend.service;

import com.ecommerce.backend.entity.Order;
import com.ecommerce.backend.entity.OrderItem;
import com.ecommerce.backend.entity.PromoCode;
import com.ecommerce.backend.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class OrderService {

    private final OrderRepository orderRepo;
    private final PromoService promoService;

    public OrderService(OrderRepository orderRepo, PromoService promoService) {
        this.orderRepo = orderRepo;
        this.promoService = promoService;
    }

    public Order placeOrder(Order orderRequest) {
        double totalBefore = computeTotal(orderRequest.getItems());

        PromoCode promo = promoService.validatePromo(orderRequest.getPromoCode());
        double discount = promoService.calculateDiscountAmount(Optional.ofNullable(promo), totalBefore);

        orderRequest.setTotalAmount(totalBefore - discount);
        orderRequest.setPlacedAt(LocalDateTime.now());
        orderRequest.setStatus("PENDING");

        return orderRepo.save(orderRequest);
    }

    private double computeTotal(List<OrderItem> items) {
        if (items == null || items.isEmpty()) return 0.0;
        return items.stream()
                .mapToDouble(it -> (it.getPrice() == null ? 0 : it.getPrice()) * (it.getQuantity() == null ? 1 : it.getQuantity()))
                .sum();
    }

    public List<Order> getAllOrders() { return orderRepo.findAll(); }

    public Order getOrderById(Long id) { return orderRepo.findById(id).orElse(null); }

    public void cancelOrder(Long id) {
        orderRepo.findById(id).ifPresent(o -> {
            o.setStatus("CANCELLED");
            orderRepo.save(o);
        });
    }
}
