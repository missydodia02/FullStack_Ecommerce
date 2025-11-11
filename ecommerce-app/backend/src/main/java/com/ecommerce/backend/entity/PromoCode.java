package com.ecommerce.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "promo_codes")
public class PromoCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String code; // e.g. SAVE10

    private boolean percentage; // true if percent
    private Double value; // e.g. 10 for 10%, or 100 for flat ₹100 off

    private LocalDateTime validFrom;
    private LocalDateTime validUntil;
    private boolean active;

    public PromoCode() {}

    public PromoCode(Long id, String code, boolean percentage, Double value, LocalDateTime validFrom, LocalDateTime validUntil, boolean active) {
        this.id = id;
        this.code = code;
        this.percentage = percentage;
        this.value = value;
        this.validFrom = validFrom;
        this.validUntil = validUntil;
        this.active = active;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public boolean isPercentage() { return percentage; }
    public void setPercentage(boolean percentage) { this.percentage = percentage; }

    public Double getValue() { return value; }
    public void setValue(Double value) { this.value = value; }

    public LocalDateTime getValidFrom() { return validFrom; }
    public void setValidFrom(LocalDateTime validFrom) { this.validFrom = validFrom; }

    public LocalDateTime getValidUntil() { return validUntil; }
    public void setValidUntil(LocalDateTime validUntil) { this.validUntil = validUntil; }

    public boolean isActive() { return active; }
    public void setActive(boolean active) { this.active = active; }
}