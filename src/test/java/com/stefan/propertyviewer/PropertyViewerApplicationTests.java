package com.stefan.propertyviewer;

import org.json.JSONException;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Example;
import org.springframework.http.ResponseEntity;

import com.stefan.propertyviewer.controller.PropertyRestController;
import com.stefan.propertyviewer.entity.Country;
import com.stefan.propertyviewer.entity.Property;

import ch.qos.logback.classic.pattern.PropertyConverter;

import static org.mockito.Mockito.when;

import java.io.IOException;
import java.util.Collection;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;


import org.mockito.InjectMocks;

@SpringBootTest
public class PropertyViewerApplicationTests {

    @InjectMocks
    private PropertyRestController testController;

    @Test
    public void testGetExample() {
        Double[] double1 = new Double[2];
        double1[0] = null;
        double1[1] = null;
        String postcodeToCheck = "SE3 3EE";
        Property exampleProperty = new Property("DemoName1","","123 Yes Street","London",postcodeToCheck,"UNITED_KINGDOM",double1);
        try {
            testController.addProperty(exampleProperty);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (JSONException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        ResponseEntity<Collection<Property>> responseEntity = testController.findPropertyWithPostcode(postcodeToCheck);
        Collection<Property> propertyCollection = responseEntity.getBody();
        Property outcomeProperty = propertyCollection.stream().findFirst().orElse(null);
        assertNotNull(outcomeProperty);
        assertEquals(outcomeProperty.getPostcode(), postcodeToCheck);
        Double[] outcomeCoordinates = outcomeProperty.getCoordinates();
        assertTrue(outcomeCoordinates[0] > 51d && outcomeCoordinates[0] < 52d);
        assertTrue(outcomeCoordinates[1] > 0d && outcomeCoordinates[1] < 1d);
        System.out.println("Tests complete");
    }



}

