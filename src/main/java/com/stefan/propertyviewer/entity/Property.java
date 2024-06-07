package com.stefan.propertyviewer.entity;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.io.IOException;
import java.net.URI;

import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;

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
    private Double[] coordinates;

    public Property(String buildingName, String description, String number, String city, String postcode, String country) {
        this.buildingName = buildingName;
        this.description = description;
        this.number = number;
        this.city = city;
        this.postcode = postcode;
        this.country = Country.valueOf(country);
        try{
            this.getCoordinates();
        }
        catch (Exception e){
            System.out.println("Coordinate error: " + e.toString());
        }
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

    public Double[] getCoordinates() throws IOException, JSONException, InterruptedException {
        if (this.coordinates != null){
            return this.coordinates;
        }
        String addressLine = URLEncoder.encode(buildingName + " " + city + " " + postcode + " " + country.toString().replace("_"," "), StandardCharsets.UTF_8);
        String urlString = "https://api.geoapify.com/v1/geocode/search?text="+ addressLine + "&apiKey=2b6155e267ec459a9f4197eec515cde1";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(urlString))
        .header("Content-Type", "application/json")
        .build();
        HttpResponse<String> response = client.send(request, BodyHandlers.ofString());
        JSONObject jsonObj =  new JSONObject(response.body());
        JSONArray arrayObject = jsonObj.getJSONArray("features");
        JSONObject featuresObject = arrayObject.getJSONObject(0).getJSONObject("properties");
        Double[] coordinates = new Double[2];
        coordinates[0] = featuresObject.getDouble("lat");
        coordinates[1] = featuresObject.getDouble("lon");  
        return coordinates;
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
