package com.foodiebuddy.restaurant.controller;

import com.foodiebuddy.restaurant.model.Restaurant;
import com.foodiebuddy.restaurant.repository.RestaurantRepository;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantRepository restaurantRepository;

    public RestaurantController(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @PostMapping
    public ResponseEntity<Restaurant> addRestaurant(@RequestBody Restaurant restaurant) {
        validateRestaurant(restaurant);
        Restaurant savedRestaurant = restaurantRepository.save(restaurant);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRestaurant);
    }

    @GetMapping
    public List<Restaurant> listRestaurants() {
        return restaurantRepository.findAll();
    }

    private void validateRestaurant(Restaurant restaurant) {
        if (restaurant == null
                || !StringUtils.hasText(restaurant.getName())
                || !StringUtils.hasText(restaurant.getAddress())
                || !StringUtils.hasText(restaurant.getCuisine())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Name, address, and cuisine are required");
        }
    }
}
