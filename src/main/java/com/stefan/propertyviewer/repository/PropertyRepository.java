package com.stefan.propertyviewer.repository;

import com.stefan.propertyviewer.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import java.util.List;


@RepositoryRestResource
public interface PropertyRepository extends JpaRepository<Property, Long> {
    List<Property> findByName(String name);
}