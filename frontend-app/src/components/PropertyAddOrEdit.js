import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import CountrySelect from './CountrySelect';

const apiUrl = process.env.REACT_APP_API_URL;
const urlArray = window.location.href.split("/");
const currentId = urlArray[urlArray.length - 1];
const pageMode = currentId ? "Edit" : "Add"; 
const removeButtonStyle = currentId ? "block": "None";

export default class PropertyAddOrEdit extends React.Component {

  handleSubmit = event => {
    event.preventDefault();
    var outgoingProperty = {
      buildingName: document.getElementById("bn1").value,
      description: document.getElementById("ds1").value,
      number: document.getElementById("bn2").value,
      city: document.getElementById("ct1").value,
      country: document.getElementById("cn1").value,
      postcode: document.getElementById("ps1").value,
      id: parseInt(document.getElementById("id1").value)
    }
    if (pageMode == "Add"){ // Adding new record in Add mode.
      axios.post(apiUrl, outgoingProperty)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.alert("New Property Added")
        window.location.reload(); 
      })
    } else {
      
      axios.put(apiUrl + "/" + currentId, outgoingProperty)
      .then(res => {
        window.alert("Property Updated")
        window.location.href = "/";
      })

    }

  }

  handleDelete = event => {
    event.preventDefault();
    axios.delete(apiUrl + "/" + currentId)
    .then(res => {
      window.alert("Property Deleted")
        window.location.href = "/";
    })
  }

  updateMiniMap(lat,long){
    const url1 = "https://maps.google.com/maps?q=" + lat + "," + long + "&t=&z=15&ie=UTF8&iwloc=&output=embed"
    document.getElementById("minimap").innerHTML = "<iframe src = " + url1 + "></iframe>";
    document.getElementById("coordinates").innerHTML = "Coordinates: " + lat + ", " + long;
  }

  componentDidMount() {
    if (pageMode == "Add"){ // Not populating in Add mode.
      return
    }
    axios.get(apiUrl + "/" + currentId)
      .then(res2 => {
        var incomingProperty = res2.data;
        document.getElementById("bn1").value = incomingProperty.buildingName;
        document.getElementById("ds1").value = incomingProperty.description;
        document.getElementById("bn2").value = incomingProperty.number;
        document.getElementById("ct1").value = incomingProperty.city;
        document.getElementById("cn1").value = incomingProperty.country;
        document.getElementById("ps1").value = incomingProperty.postcode;
        document.getElementById("id1").value = incomingProperty.id;
        this.updateMiniMap(incomingProperty.coordinates[0],incomingProperty.coordinates[1])
      })
  }

  render() {
    return (
      <div class="form-group, w-50">
        <div style={{ display:removeButtonStyle }}>
          <p id="coordinates"></p>
          <div id="minimap">
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label for="bn1">Building Name:</label>
          <input class="form-control" type="text" id="bn1" name="buildingName" required/>
          <label for="ds1">Description:</label>
          <input class="form-control" type="text" id="ds1" name="description"/>
          <label for="bn2">Building Number:</label>
          <input class="form-control" type="text" id="bn2" name="number" required/>
          <label for="ct1">City:</label>
          <input class="form-control" type="text" id="ct1" name="city"required/>
          <label for="ps1">Postcode:</label>
          <input class="form-control" type="text" id="ps1" name="postcode"required/>
          <label for="cn1">Country:</label>
          <select class="form-control" id="cn1" name="country" required>
          <CountrySelect />
          </select>
          <label for="id1">ID:</label>
          <input class="form-control" type="number" id="id1" name="id" required/>
          <button id="button1" type="submit">{pageMode}</button>
        </form>
        <br/>
        <button style={{ display:removeButtonStyle }} id="button2" onClick={this.handleDelete}><strong>Delete this property.</strong></button>
      </div>
    )
  }
}

