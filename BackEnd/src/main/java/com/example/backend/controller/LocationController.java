package com.example.backend.controller;

import com.example.backend.model.Address;
import com.example.backend.service.LocationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
@RestController
@RequestMapping(path = "/address")
public class LocationController {
    private final LocationService locationService;

    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @GetMapping("/getlocation")
    public ResponseEntity<Map<String, String>> getLocation(@RequestParam int pincode) {
        String location = locationService.getLocation(String.valueOf(pincode));

        Map<String, String> response = new HashMap<>();
        response.put("location", location);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Address>> getAllAddress(@PathVariable UUID userId) {
        List<Address> addresses = locationService.getAddressesByUserId(userId);

        if (addresses.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(addresses);
        }

        return ResponseEntity.ok(addresses);
    }
    @GetMapping("/single/{addressId}")
    public ResponseEntity<Address> getSingleAddress(@PathVariable UUID addressId) {
        Address address = locationService.getAddress(addressId);
        if(address != null) {
            return ResponseEntity.ok(address);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
    @PostMapping("/{userId}/add")
    public ResponseEntity<Address> addAddress(@PathVariable UUID userId, @RequestBody Address address) {
        Address savedAddress = locationService.addAddress(address, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAddress);
    }

    @PutMapping("/{userId}/update")
    public ResponseEntity<Address> putAddress(@PathVariable UUID userId, @RequestBody Address address) {
        System.out.println(userId);
        Address updatedAddress = locationService.updateAddress(address,userId);
        if(updatedAddress != null) {
            return ResponseEntity.ok(updatedAddress);
        }
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(address);
    }

    @DeleteMapping("/{userId}/delete/{addressId}")
    public ResponseEntity<Address> deleteAddress(@PathVariable UUID userId, @PathVariable UUID addressId) {
        boolean isDeleted = locationService.deleteAddress(addressId);
        if (isDeleted) {
            return ResponseEntity.ok().build();
        }else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
    }
}
