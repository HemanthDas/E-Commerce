package com.example.backend.controller;

import com.example.backend.service.LocationService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LocationController {
    private final LocationService locationService;
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }
    @GetMapping("/getlocation")
    public String getLocation(@RequestParam int pincode) {
        return locationService.getLocation(String.valueOf(pincode));
    }
}
