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

    public String getLocation(String pincode) {
        String url = "http://api.zippopotam.us/in/" + pincode;
        try {
            String response = restTemplate.getForObject(url, String.class);
            JSONObject jsonObject = new JSONObject(response);
            String city = jsonObject.getJSONArray("places").getJSONObject(0).getString("place name");
            String state = jsonObject.getJSONArray("places").getJSONObject(0).getString("state");
            return city + ", " + state;
        } catch (Exception e) {
            e.printStackTrace();
            return "Invalid Pincode or Location not found";
        }
    }

    @Transactional
    public Address addAddress(Address address, UUID userId) {
        User user = new User();
        user.setId(userId);

        // Check if there's already a default address for the user
        if (address.isDefault()) {
            Address existingDefaultAddress = locationRepository.findByUserIdAndIsDefaultTrue(userId);
            if (existingDefaultAddress != null) {
                existingDefaultAddress.setDefault(false);
                locationRepository.save(existingDefaultAddress);
            }
        }

        // Set user association and save the new address
        address.setUser(user);
        return locationRepository.save(address);
    }

    public List<Address> getAddressesByUserId(UUID userId) {
        return locationRepository.findAddressesByUser_Id(userId);
    }

    public Address getAddress(UUID addressId) {
        // Avoid duplicate repository queries
        return locationRepository.findAddressById(addressId);
    }

    public boolean deleteAddress(UUID addressId) {
        try {
            if (locationRepository.existsById(addressId)) {
                locationRepository.deleteById(addressId);
                return true;
            }
            return false;
        } catch (Exception e) {
            throw new RuntimeException("Failed to delete address", e);
        }
    }

    @Transactional
    public Address updateAddress(Address address, UUID userId) {
        // Fetch the existing address
        Address existingAddress = locationRepository.findByUserIdAndId(userId, address.getId());
        if (existingAddress == null) {
            return null; // Address not found
        }

        // Handle default address logic
        if (address.isDefault()) {
            // Find any other address for the user that is marked as default
            Address defaultAddress = locationRepository.findByUserIdAndIsDefaultTrue(userId);
            if (defaultAddress != null && !defaultAddress.getId().equals(existingAddress.getId())) {
                // Unmark the other address as default
                defaultAddress.setDefault(false);
                locationRepository.save(defaultAddress);
            }
        }

        // Update the existing address fields
        existingAddress.setStreet(address.getStreet());
        existingAddress.setPhonenumber(address.getPhonenumber());
        existingAddress.setRecipientName(address.getRecipientName());
        existingAddress.setCity(address.getCity());
        existingAddress.setState(address.getState());
        existingAddress.setPostalCode(address.getPostalCode());
        existingAddress.setCountry(address.getCountry());
        existingAddress.setDefault(address.isDefault());

        // Save and return the updated address
        return locationRepository.save(existingAddress);
    }
}
