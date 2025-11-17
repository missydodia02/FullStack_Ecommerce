package com.ecommerce.backend.config;

import com.ecommerce.backend.entity.Product;
import com.ecommerce.backend.entity.PromoCode;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.PromoCodeRepository;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Scanner;

/**
 * ✅ DataSeeder:
 * Runs automatically on application startup
 *  - Fetches products from Fake Store API
 *  - Saves them into PostgreSQL (if DB is empty)
 *  - Seeds a few promo codes
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepo;
    private final PromoCodeRepository promoRepo;

    public DataSeeder(ProductRepository productRepo, PromoCodeRepository promoRepo) {
        this.productRepo = productRepo;
        this.promoRepo = promoRepo;
    }

    @Override
    public void run(String... args) throws Exception {

        // 🟢 1. Import Products from Fake Store API (only if DB is empty)
        if (productRepo.count() == 0) {
            System.out.println("⏳ Fetching products from Fake Store API...");

            String apiUrl = "https://fakestoreapi.com/products";
            URL url = new URL(apiUrl);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            try (InputStream is = conn.getInputStream(); Scanner sc = new Scanner(is)) {
                String json = sc.useDelimiter("\\A").next();
                JSONArray arr = new JSONArray(json);

                for (int i = 0; i < arr.length(); i++) {
                    JSONObject obj = arr.getJSONObject(i);

                    Product p = new Product();
                    // ID should NOT be set manually if it's auto-generated
                    p.setTitle(obj.getString("title"));
                    p.setDescription(obj.getString("description"));
                    p.setCategory(obj.getString("category"));
                    p.setPrice(obj.getDouble("price"));
                    p.setImageUrl(obj.getString("image"));
                    p.setRating(4.0 + Math.random()); // random rating
                    p.setRatingCount((int) (Math.random() * 1000));

                    productRepo.save(p);
                }

                System.out.println("✅ Products imported successfully from Fake Store API!");
            } catch (Exception e) {
                e.printStackTrace(); // full error if fails
            }
        }

        // 🟢 2. Seed Promo Codes (only if DB is empty)
        if (promoRepo.count() == 0) {
            List<PromoCode> promos = List.of(
                    new PromoCode(null, "SAVE10", true, 10.0,
                            LocalDateTime.now().minusDays(1),
                            LocalDateTime.now().plusDays(30), true),

                    new PromoCode(null, "FLAT500", false, 500.0,
                            LocalDateTime.now().minusDays(1),
                            LocalDateTime.now().plusDays(15), true),

                    new PromoCode(null, "NEWUSER50", true, 50.0,
                            LocalDateTime.now().minusDays(1),
                            LocalDateTime.now().plusDays(60), true)
            );

            promoRepo.saveAll(promos);
            System.out.println("✅ Promo codes seeded successfully!");
        }

        System.out.println("🎉 Database seeding completed!");
    }
}
