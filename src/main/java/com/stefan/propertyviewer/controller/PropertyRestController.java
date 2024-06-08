package com.stefan.propertyviewer.controller;

import com.stefan.propertyviewer.GeoApifyApi;
import com.stefan.propertyviewer.entity.Property;
import com.stefan.propertyviewer.repository.PropertyRepository;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Collection;
import java.util.Optional;

@RestController
@RequestMapping("/properties")
public class PropertyRestController {

    @Autowired
    private PropertyRepository repository;

    // Submit property by POST
    @PostMapping
    public ResponseEntity<?> addProperty(@RequestBody Property property) throws IOException, JSONException, InterruptedException {
        checkCoordinates(property);
        return new ResponseEntity<>(repository.save(property), HttpStatus.CREATED);
    }

    // Call API if necessary
    private void checkCoordinates(Property property){
        Double[] coordinatesToTest = property.getCoordinates();
        if(coordinatesToTest == null || coordinatesToTest.length < 2 || Double.isNaN(coordinatesToTest[0]) || Double.isNaN(coordinatesToTest[1])){
            Double[] tempCoordinates = GeoApifyApi.getCoordinatesFromGeoApi(property);
            property.setCoordinates(tempCoordinates);
        }
    }

    @GetMapping
    public ResponseEntity<Collection<Property>> getAllProperties() {
        return new ResponseEntity<>(repository.findAll(), HttpStatus.OK);
}

    @GetMapping("/{id}")
    public ResponseEntity<Property> getPropertyWithId(@PathVariable Long id) {
        return new ResponseEntity<Property>(repository.findById(id).get(), HttpStatus.OK);
    }

    @GetMapping(params = {"buildingName"})
    public ResponseEntity<Collection<Property>> findPropertyWithBuildingName(@RequestParam(value = "buildingName") String buildingName) {
        return new ResponseEntity<>(repository.findByBuildingName(buildingName), HttpStatus.OK);
    }

    @GetMapping(params = {"postcode"})
    public ResponseEntity<Collection<Property>> findPropertyWithPostcode(@RequestParam(value = "postcode") String postcode) {
        return new ResponseEntity<>(repository.findByPostcode(postcode), HttpStatus.OK);
    }

    // Update property by PUT
    @PutMapping("/{id}")
    public ResponseEntity<Property> updatePropertyFromDB(@PathVariable("id") long id, @RequestBody Property property) {

        Optional<Property> currentPropertyOpt = repository.findById(id);
        Property currentProperty = currentPropertyOpt.get();
        currentProperty.setBuildingName(property.getBuildingName());
        currentProperty.setDescription(property.getDescription());
        currentProperty.setCity(property.getCity());
        currentProperty.setCountry(property.getCountry());
        checkCoordinates(property);
        currentProperty.setCoordinates(property.getCoordinates());     
        currentProperty.setNumber(property.getNumber());
        currentProperty.setPostcode(property.getPostcode());
        return new ResponseEntity<>(repository.save(currentProperty), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public void deletePropertyWithId(@PathVariable Long id) {
        repository.deleteById(id);
    }

    @DeleteMapping
    public void deleteAllProperties() {
        repository.deleteAll();
    }
}