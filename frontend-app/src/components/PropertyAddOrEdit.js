import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const apiUrl = process.env.REACT_APP_API_URL;
const urlArray = window.location.href.split("/");
const currentId = urlArray[urlArray.length - 1];
const pageMode = currentId ? "Edit" : "Add"; 
const removeButtonStyle = currentId ? "block": "None";
var currentProperty = "";


export default class PropertyAddOrEdit extends React.Component {

  state = {
    buildingName: "",
    description: "",
    number: "",
    city: "",
    postcode: "",
    country: "UNITED_KINGDOM",
    id: 0
  } 

  changeBuildingName = event => {
    this.setState({ buildingName: event.target.value });
  }
  changeDescription = event => {
    this.setState({ description: event.target.value });
  }
  changeNumber = event => {
    this.setState({ number: event.target.value });
  }
  changeCity = event => {
    this.setState({ city: event.target.value });
  }
  changePostcode = event => {
    this.setState({ postcode: event.target.value });
  }
  changeCountry = event => {
    this.setState({ country: event.target.value });
  }
  changeId = event => {
    this.setState({ id: event.target.value });
  }

  handleSubmit = event => {
    event.preventDefault();

    const property = {
      buildingName: this.state.buildingName,
      description: this.state.description,
      number: this.state.number,
      city: this.state.city,
      postcode: this.state.postcode,
      country: this.state.country,
      id: this.state.id
    };

    axios.post(apiUrl, property)
      .then(res => {
        console.log(res);
        console.log(res.data);
        window.location.reload(); 
      })
  }

  componentDidMount() {
    if (!currentId){ // Not populating in Add mode.
      return
    }
    axios.get(apiUrl + "/" + currentId)
      .then(res2 => {
        currentProperty = res2.data;
        this.setState({ currentProperty });
      })
  }

  render() {
    return (
      <div class="form-group, w-50">
        <form onSubmit={this.handleSubmit}>
          <label for="bn1">Building Name:</label>
          <input class="form-control" type="text" id="bn1" value={currentProperty.buildingName} name="buildingName" onChange={this.changeBuildingName} required/>
          <label for="ds1">Description:</label>
          <input class="form-control" type="text" id="ds1" value={currentProperty.description} name="description" onChange={this.changeDescription} />
          <label for="bn2">Building Number:</label>
          <input class="form-control" type="text" id="bn2" value={currentProperty.number} name="number" onChange={this.changeNumber} required/>
          <label for="ct">City:</label>
          <input class="form-control" type="text" id="ct" value={currentProperty.city} name="city" onChange={this.changeCity} required/>
          <label for="ps1">Postcode:</label>
          <input class="form-control" type="text1" id="ps1" value={currentProperty.postcode} name="postcode" onChange={this.changePostcode} required/>
          <label for="ct1">Country:</label>
          <select class="form-control" id="ct1" name="country" value={currentProperty.country} onChange={this.changeCountry} required>
          <option value="UNSPECIFIED">Not specified</option>
        <option value="AFGHANISTAN">Afghanistan</option>
        <option value="ALBANIA">Albania</option>
        <option value="ALGERIA">Algeria</option>
        <option value="ANDORRA">Andorra</option>
        <option value="ANGOLA">Angola</option>
        <option value="ANTIGUA_DEPS">Antigua & Deps</option>
        <option value="ARGENTINA">Argentina</option>
        <option value="ARMENIA">Armenia</option>
        <option value="AUSTRALIA">Australia</option>
        <option value="AUSTRIA">Austria</option>
        <option value="AZERBAIJAN">Azerbaijan</option>
        <option value="BAHAMAS">Bahamas</option>
        <option value="BAHRAIN">Bahrain</option>
        <option value="BANGLADESH">Bangladesh</option>
        <option value="BARBADOS">Barbados</option>
        <option value="BELARUS">Belarus</option>
        <option value="BELGIUM">Belgium</option>
        <option value="BELIZE">Belize</option>
        <option value="BENIN">Benin</option>
        <option value="BHUTAN">Bhutan</option>
        <option value="BOLIVIA">Bolivia</option>
        <option value="BOSNIA_HERZEGOVINA">Bosnia Herzegovina</option>
        <option value="BOTSWANA">Botswana</option>
        <option value="BRAZIL">Brazil</option>
        <option value="BRUNEI">Brunei</option>
        <option value="BULGARIA">Bulgaria</option>
        <option value="BURKINA">Burkina</option>
        <option value="BURMA">Burma</option>
        <option value="BURUNDI">Burundi</option>
        <option value="CAMBODIA">Cambodia</option>
        <option value="CAMEROON">Cameroon</option>
        <option value="CANADA">Canada</option>
        <option value="CAPE_VERDE">Cape Verde</option>
        <option value="CENTRAL_AFRICAN_REP">Central African Rep</option>
        <option value="CHAD">Chad</option>
        <option value="CHILE">Chile</option>
        <option value="CHINA">Republic of China</option>
        <option value="REPUBLIC_OF_CHINA">Republic of China</option>
        <option value="COLOMBIA">Colombia</option>
        <option value="COMOROS">Comoros</option>
        <option value="DEMOCRATIC_REPUBLIC_OF_THE_CONGO">Democratic Republic of the Congo</option>
        <option value="REPUBLIC_OF_THE_CONGO">Republic of the Congo</option>
        <option value="COSTA_RICA">Costa Rica</option>
        <option value="CROATIA">Croatia</option>
        <option value="CUBA">Cuba</option>
        <option value="CYPRUS">Cyprus</option>
        <option value="CZECH_REPUBLIC">Czech Republic</option>
        <option value="DANZIG">Danzig</option>
        <option value="DENMARK">Denmark</option>
        <option value="DJIBOUTI">Djibouti</option>
        <option value="DOMINICA">Dominica</option>
        <option value="DOMINICAN_REPUBLIC">Dominican Republic</option>
        <option value="EAST_TIMOR">East Timor</option>
        <option value="ECUADOR">Ecuador</option>
        <option value="EGYPT">Egypt</option>
        <option value="EL_SALVADOR">El Salvador</option>
        <option value="EQUATORIAL_GUINEA">Equatorial Guinea</option>
        <option value="ERITREA">Eritrea</option>
        <option value="ESTONIA">Estonia</option>
        <option value="ETHIOPIA">Ethiopia</option>
        <option value="FIJI">Fiji</option>
        <option value="FINLAND">Finland</option>
        <option value="FRANCE">France</option>
        <option value="GABON">Gabon</option>
        <option value="GAZA_STRIP">Gaza Strip</option>
        <option value="THE_GAMBIA">The Gambia</option>
        <option value="GEORGIA">Georgia</option>
        <option value="GERMANY">Germany</option>
        <option value="GHANA">Ghana</option>
        <option value="GREECE">Greece</option>
        <option value="GRENADA">Grenada</option>
        <option value="GUATEMALA">Guatemala</option>
        <option value="GUINEA">Guinea</option>
        <option value="GUINEA_BISSAU">Guinea-Bissau</option>
        <option value="GUYANA">Guyana</option>
        <option value="HAITI">Haiti</option>
        <option value="HOLY_ROMAN_EMPIRE">Holy Roman Empire</option>
        <option value="HONDURAS">Honduras</option>
        <option value="HUNGARY">Hungary</option>
        <option value="ICELAND">Iceland</option>
        <option value="INDIA">India</option>
        <option value="INDONESIA">Indonesia</option>
        <option value="IRAN">Iran</option>
        <option value="IRAQ">Iraq</option>
        <option value="REPUBLIC_OF_IRELAND">Republic of Ireland</option>
        <option value="ITALY">Italy</option>
        <option value="IVORY_COAST">Ivory Coast</option>
        <option value="JAMAICA">Jamaica</option>
        <option value="JAPAN">Japan</option>
        <option value="JONATHANLAND">Jonathanland</option>
        <option value="JORDAN">Jordan</option>
        <option value="KAZAKHSTAN">Kazakhstan</option>
        <option value="KENYA">Kenya</option>
        <option value="KIRIBATI">Kiribati</option>
        <option value="NORTH_KOREA">North Korea</option>
        <option value="SOUTH_KOREA">South Korea</option>
        <option value="KOSOVO">Kosovo</option>
        <option value="KUWAIT">Kuwait</option>
        <option value="KYRGYZSTAN">Kyrgyzstan</option>
        <option value="LAOS">Laos</option>
        <option value="LATVIA">Latvia</option>
        <option value="LEBANON">Lebanon</option>
        <option value="LESOTHO">Lesotho</option>
        <option value="LIBERIA">Liberia</option>
        <option value="LIBYA">Libya</option>
        <option value="LIECHTENSTEIN">Liechtenstein</option>
        <option value="LITHUANIA">Lithuania</option>
        <option value="LUXEMBOURG">Luxembourg</option>
        <option value="MACEDONIA">Macedonia</option>
        <option value="MADAGASCAR">Madagascar</option>
        <option value="MALAWI">Malawi</option>
        <option value="MALAYSIA">Malaysia</option>
        <option value="MALDIVES">Maldives</option>
        <option value="MALI">Mali</option>
        <option value="MALTA">Malta</option>
        <option value="MARSHALL_ISLANDS">Marshall Islands</option>
        <option value="MAURITANIA">Mauritania</option>
        <option value="MAURITIUS">Mauritius</option>
        <option value="MEXICO">Mexico</option>
        <option value="MICRONESIA">Micronesia</option>
        <option value="MOLDOVA">Moldova</option>
        <option value="MONACO">Monaco</option>
        <option value="MONGOLIA">Mongolia</option>
        <option value="MONTENEGRO">Montenegro</option>
        <option value="MOROCCO">Morocco</option>
        <option value="MOUNT_ATHOS">Mount Athos</option>
        <option value="MOZAMBIQUE">Mozambique</option>
        <option value="NAMIBIA">Namibia</option>
        <option value="NAURU">Nauru</option>
        <option value="NEPAL">Nepal</option>
        <option value="NEWFOUNDLAND">Newfoundland</option>
        <option value="NETHERLANDS">Netherlands</option>
        <option value="NEW_ZEALAND">New Zealand</option>
        <option value="NICARAGUA">Nicaragua</option>
        <option value="NIGER">Niger</option>
        <option value="NIGERIA">Nigeria</option>
        <option value="NORWAY">Norway</option>
        <option value="OMAN">Oman</option>
        <option value="OTTOMAN_EMPIRE">Ottoman Empire</option>
        <option value="PAKISTAN">Pakistan</option>
        <option value="PALESTINE">Palestine</option>
        <option value="PALAU">Palau</option>
        <option value="PANAMA">Panama</option>
        <option value="PAPUA_NEW_GUINEA">Papua New Guinea</option>
        <option value="PARAGUAY">Paraguay</option>
        <option value="PERU">Peru</option>
        <option value="PHILIPPINES">Philippines</option>
        <option value="POLAND">Poland</option>
        <option value="PORTUGAL">Portugal</option>
        <option value="PRUSSIA">Prussia</option>
        <option value="QATAR">Qatar</option>
        <option value="ROMANIA">Romania</option>
        <option value="ROME">Rome</option>
        <option value="RUSSIAN_FEDERATION">Russian Federation</option>
        <option value="RWANDA">Rwanda</option>
        <option value="GRENADINES">Grenadines</option>
        <option value="SAMOA">Samoa</option>
        <option value="SAN_MARINO">San Marino</option>
        <option value="SAO_TOME_PRINCIPE">Sao Tome & Principe</option>
        <option value="SAUDI_ARABIA">Saudi Arabia</option>
        <option value="SENEGAL">Senegal</option>
        <option value="SERBIA">Serbia</option>
        <option value="SEYCHELLES">Seychelles</option>
        <option value="SIERRA_LEONE">Sierra Leone</option>
        <option value="SINGAPORE">Singapore</option>
        <option value="SLOVAKIA">Slovakia</option>
        <option value="SLOVENIA">Slovenia</option>
        <option value="SOLOMON_ISLANDS">Solomon Islands</option>
        <option value="SOMALIA">Somalia</option>
        <option value="SOUTH_AFRICA">South Africa</option>
        <option value="SPAIN">Spain</option>
        <option value="SRI_LANKA">Sri Lanka</option>
        <option value="SUDAN">Sudan</option>
        <option value="SURINAME">Suriname</option>
        <option value="SWAZILAND">Swaziland</option>
        <option value="SWEDEN">Sweden</option>
        <option value="SWITZERLAND">Switzerland</option>
        <option value="SYRIA">Syria</option>
        <option value="TAJIKISTAN">Tajikistan</option>
        <option value="TANZANIA">Tanzania</option>
        <option value="THAILAND">Thailand</option>
        <option value="TOGO">Togo</option>
        <option value="TONGA">Tonga</option>
        <option value="TRINIDAD_TOBAGO">Trinidad & Tobago</option>
        <option value="TUNISIA">Tunisia</option>
        <option value="TURKEY">Turkey</option>
        <option value="TURKMENISTAN">Turkmenistan</option>
        <option value="TUVALU">Tuvalu</option>
        <option value="UGANDA">Uganda</option>
        <option value="UKRAINE">Ukraine</option>
        <option value="UNITED_ARAB_EMIRATES">United Arab Emirates</option>
        <option value="UNITED_KINGDOM">United Kingdom</option>
        <option value="URUGUAY">Uruguay</option>
        <option value="USA">United States of America</option>
        <option value="UZBEKISTAN">Uzbekistan</option>
        <option value="VANUATU">Vanuatu</option>
        <option value="VATICAN_CITY">Vatican City</option>
        <option value="VENEZUELA">Venezuela</option>
        <option value="VIETNAM">Vietnam</option>
        <option value="YEMEN">Yemen</option>
        <option value="ZAMBIA">Zambia</option>
        <option value="ZIMBABWE">Zimbabwe</option>
          </select>
          <label for="id1">ID:</label>
          <input class="form-control" type="number" id="id1" name="id" value={currentProperty.id} onChange={this.changeId} required/>
          <button id="button1" type="submit">{pageMode}</button>
        </form>
        <br/>
        <button style={{ display:removeButtonStyle }} id="button2" ><strong>Delete this property.</strong></button>
      </div>
    )
  }
}

