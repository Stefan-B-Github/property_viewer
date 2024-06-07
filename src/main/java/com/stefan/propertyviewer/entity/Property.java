package com.stefan.propertyviewer.entity;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


import java.io.IOException;
import java.net.HttpURLConnection;
import java.util.ArrayList;
import java.util.List;
import java.net.URL;

import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONArray;

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
    private double latitude;
    private double longitude;

    public Property(String buildingName, String description, String number, String city, String postcode, String country) {
        this.buildingName = buildingName;
        this.description = description;
        this.number = number;
        this.city = city;
        this.postcode = postcode;
        this.country = Country.valueOf(country);
        try{
            double[] coordinates = getCoordinates();
            this.latitude = coordinates[0];
            this.longitude = coordinates[1];
        }
        catch (Exception e){
            this.latitude = 0;
            this.longitude = 0;
        }
    }

    public Property() {
    }

    public Long getId() {
        return id;
    }

    public double[] getCoordinates() throws IOException, JSONException {
        String urlString = "https://api.geoapify.com/v1/geocode/search?text="+ buildingName +"%20" + city + "%20" + postcode + "%20" + country + "%20" + "&apiKey=2b6155e267ec459a9f4197eec515cde1";
        URL url = new URL(urlString);
        HttpURLConnection http = (HttpURLConnection)url.openConnection();
        http.setRequestProperty("Accept", "application/json");   
        JSONObject jsonObj =  new JSONObject(http.getResponseMessage());
        http.disconnect();
        JSONArray arrayObject = jsonObj.getJSONArray("features");
        JSONObject featuresObject = arrayObject.getJSONObject(0).getJSONObject("properties");
        double[] output = new double[2];
        output[0] = featuresObject.getLong("lat");
        output[1] = featuresObject.getLong("lon");
        return output;
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

    public double getLatitude(){
        return latitude;
    }

    public void setLatitude(double latitude){
        this.latitude = latitude;
    }

    public double getLongitude(){
        return longitude;
    }

    public void setLongitude(double longitude){
        this.longitude = longitude;
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
