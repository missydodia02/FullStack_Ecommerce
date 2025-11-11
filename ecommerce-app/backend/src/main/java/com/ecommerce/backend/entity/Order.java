package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "order_id")
    private List<OrderItem> items;

    private Double totalAmount;
    private String address;
    private String promoCode;
    private String status; // PENDING, DELIVERED, CANCELLED
    private LocalDateTime placedAt;
    private LocalDateTime deliveredAt;

    public Order() {}

    public Order(Long id, List<OrderItem> items, Double totalAmount, String address, String promoCode, String status, LocalDateTime placedAt, LocalDateTime deliveredAt) {
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.address = address;
        this.promoCode = promoCode;
        this.status = status;
        this.placedAt = placedAt;
        this.deliveredAt = deliveredAt;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getPromoCode() { return promoCode; }
    public void setPromoCode(String promoCode) { this.promoCode = promoCode; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getPlacedAt() { return placedAt; }
    public void setPlacedAt(LocalDateTime placedAt) { this.placedAt = placedAt; }

    public LocalDateTime getDeliveredAt() { return deliveredAt; }
    public void setDeliveredAt(LocalDateTime deliveredAt) { this.deliveredAt = deliveredAt; }
}
