package com.example.backend.service;

import org.json.JSONObject;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
@Service
public class LocationService {
    private final RestTemplate restTemplate;
    public LocationService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
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
}
