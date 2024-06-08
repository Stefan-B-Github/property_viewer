package com.stefan.propertyviewer;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.http.HttpResponse.BodyHandlers;
import java.nio.charset.StandardCharsets;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.stefan.propertyviewer.entity.Property;

@Component
public class GeoApifyApi {

    
    private static String apiKey;


    public static String getApiGet() {
        return apiKey;
    }

    @Value("${geoapify.key}")
    public void setApiGey(String apiKey) {
        GeoApifyApi.apiKey = apiKey;
    }

    public static Double[] getCoordinatesFromGeoApi(Property property) {
        String buildingName = property.getBuildingName();
        String city = property.getCity();
        String postcode = property.getPostcode();
        String country = property.getCountry().toString();
        String addressLine = URLEncoder.encode(buildingName + " " + city + " " + postcode + " " + country.replace("_"," "), StandardCharsets.UTF_8);
        String urlString = "https://api.geoapify.com/v1/geocode/search?text="+ addressLine + "&apiKey=" + apiKey;
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(urlString))
        .header("Content-Type", "application/json")
        .build();
        HttpResponse<String> response;
        try {
            response = client.send(request, BodyHandlers.ofString());
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        } catch (InterruptedException e) {
            e.printStackTrace();
            return null;
        }
        JSONObject jsonObj =  new JSONObject(response.body());
        JSONArray arrayObject = jsonObj.getJSONArray("features");
        JSONObject featuresObject = arrayObject.getJSONObject(0).getJSONObject("properties");
        Double[] coordinates = new Double[2];
        coordinates[0] = featuresObject.getDouble("lat");
        coordinates[1] = featuresObject.getDouble("lon");  
        return coordinates;
    }

    
}