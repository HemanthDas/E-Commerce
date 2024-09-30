package com.example.backend.service;

import com.example.backend.model.Address;
import com.example.backend.model.User;
import com.example.backend.repository.LocationRepository;
import jakarta.transaction.Transactional;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.UUID;

@Service
public class LocationService {
    private final RestTemplate restTemplate;
    private final LocationRepository locationRepository;
    public LocationService(RestTemplate restTemplate, LocationRepository locationRepository) {
        this.restTemplate = restTemplate;
        this.locationRepository = locationRepository;
    }

    public String getLocation(String pincode){
        String url = "http://api.zippopotam.us/in/"+pincode;
        try{
            String response = restTemplate.getForObject(url, String.class);
            JSONObject jsonObject = new JSONObject(response);
            String city = jsonObject.getJSONArray("places").getJSONObject(0).getString("place name");
            String state = jsonObject.getJSONArray("places").getJSONObject(0).getString("state");
            return city + ", " + state;
        }catch (Exception e){
            e.printStackTrace();
            return "Invalid Pincode or Location not found";
        }
    }
    @Transactional
    public Address addAddress(Address address, UUID userId) {
        User user = new User();
        user.setId(userId);
        address.setUser(user);
        return locationRepository.save(address); // Save to the repository
    }
    public List<Address> getAddressesByUserId(UUID userId){
        return locationRepository.findAddressesByUser_Id(userId);
    }
}
