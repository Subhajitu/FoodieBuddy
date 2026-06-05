package com.foodiebuddy.restaurant.service;

import com.foodiebuddy.restaurant.model.Restaurant;
import com.foodiebuddy.restaurant.repository.RestaurantRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class RestaurantServiceTest {

    @Mock
    private RestaurantRepository restaurantRepository;

    @InjectMocks
    private RestaurantService restaurantService;

    private Restaurant restaurant;

    @BeforeEach
    void setUp() {
        restaurant = new Restaurant("Pasta Place", "123 Italian Way", "Italian");
        restaurant.setId(1L);
    }

    @Test
    void createRestaurant_ShouldReturnSavedRestaurant() {
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(restaurant);

        Restaurant result = restaurantService.createRestaurant(restaurant);

        assertNotNull(result);
        assertEquals("Pasta Place", result.getName());
        verify(restaurantRepository, times(1)).save(restaurant);
    }

    @Test
    void getAllRestaurants_ShouldReturnList() {
        when(restaurantRepository.findAll()).thenReturn(Arrays.asList(restaurant));

        List<Restaurant> result = restaurantService.getAllRestaurants();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        verify(restaurantRepository, times(1)).findAll();
    }

    @Test
    void getRestaurantById_WhenIdExists_ShouldReturnRestaurant() {
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));

        Restaurant result = restaurantService.getRestaurantById(1L);

        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    @Test
    void getRestaurantById_WhenIdDoesNotExist_ShouldThrowException() {
        when(restaurantRepository.findById(2L)).thenReturn(Optional.empty());

        assertThrows(ResponseStatusException.class, () -> restaurantService.getRestaurantById(2L));
    }

    @Test
    void updateRestaurant_ShouldReturnUpdatedRestaurant() {
        Restaurant updatedDetails = new Restaurant("Pizza Place", "456 Italian Way", "Italian");
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));
        when(restaurantRepository.save(any(Restaurant.class))).thenReturn(restaurant);

        Restaurant result = restaurantService.updateRestaurant(1L, updatedDetails);

        assertEquals("Pizza Place", result.getName());
        assertEquals("456 Italian Way", result.getAddress());
        verify(restaurantRepository, times(1)).save(any(Restaurant.class));
    }

    @Test
    void deleteRestaurant_ShouldCallDelete() {
        when(restaurantRepository.findById(1L)).thenReturn(Optional.of(restaurant));

        restaurantService.deleteRestaurant(1L);

        verify(restaurantRepository, times(1)).delete(restaurant);
    }
}
