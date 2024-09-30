package com.example.backend.repository;

import com.example.backend.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface LocationRepository extends JpaRepository<Address, UUID> {
    List<Address> findAddressesByUser_Id(UUID id);
}
