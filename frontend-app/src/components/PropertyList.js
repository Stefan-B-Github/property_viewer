import React from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

export default class PersonList extends React.Component {
  state = {
    properties: [],
    
  }

  componentDidMount() {
    axios.get(apiUrl)
      .then(res => {
        const properties = res.data;
        this.setState({ properties });
      })
  }

  render() {
    return (
        <><h1>Property List</h1><table class="table">
            <tbody>
                <tr>
                    <th scope="col">Building Name</th>
                    <th scope="col">City</th>
                    <th scope="col">Postcode</th>
                    <th scope="col">Country</th>
                </tr>
                {this.state.properties
                    .map(property => <tr style={{ textAlign: "left" }}>
                        <th>
                            <a href={apiUrl + "/" + property.id}>
                                {property.buildingName}
                            </a>
                        </th>
                        <td>{property.city}</td>
                        <td>{property.postcode}</td>
                        <td>{property.country}</td>
                    </tr>
                    )}
            </tbody>
        </table></>
    )
  }
}
