package com.stefan.propertyviewer.entity;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String buildingName;
    private String description;
    private String number;
    private String postcode;
    private String city;
    private Country country;
    private Double[] coordinates;

    public Property(String buildingName, String description, String number, String city, String postcode, String country, Double[] coordinates) {
        this.buildingName = buildingName;
        this.description = description;
        this.number = number;
        this.city = city;
        this.postcode = postcode;
        this.country = Country.valueOf(country);
        this.coordinates = coordinates;
    }

    public Property() {
    }

    public Long getId() {
        return id;
    }

    public String getBuildingName() {
        return buildingName;
    }

    public void setBuildingName(String buildingName) {
        this.buildingName = buildingName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNumber(){
        return number;
    }
    public void setNumber(String number){
        this.number = number;
    }

    public Double[] getCoordinates() {
        return this.coordinates;
    }

    public void setCoordinates(Double[] coordinates){
        this.coordinates = coordinates;
    }

    public String getCity(){
        return city;
    }

    public void setCity(String city){
        this.city = city;
    }

    public String getPostcode(){
        return postcode;
    }

    public void setPostcode(String postcode){
        this.postcode = postcode;
    }

    public Country getCountry(){
        return country;
    }

    public void setCountry(Country country){
        this.country = country;
    }

    @Override
    public String toString() {
        return "Property{" +
                "id=" + id +
                ", name='" + buildingName + '\'' +
                ", description='" + description + '\'' +
                ", city='" + city + '\'' +
                ", country='" + country.name() + '\'' +
                '}';
    }
}
