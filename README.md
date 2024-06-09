# Property Viewer
A simple record storing application written in Java Spring Boot and React/Axios.

It requires **Maven**, **NPM**, a local **Postgres** database for data storage, and a [GeoApify API key](https://www.geoapify.com/geocoding-api) for accessing geographical coordinates.

## Installation
1) In the `datasource` section of `src/main/resources/application.yml`, update the `url`, `username` and `password` fields to match those of the local Postgres database.
2) In the same `application.yml` file, update the `geoapify.key` value to match the GeoApify API key.
3) In Postgres, ensure that the database named in the `datasource.url` exists. I.e., enter `CREATE DATABASE property_table;` within the `psql` shell;
4) Run the Java backend:
```bash
mvn clean spring-boot:run
```
The backend will be accessible on `http://localhost:8080`

5) Add the necessary dependencies and run the React frontend:
```bash
cd frontend-app
npm install axios@0.24.0
npm install react-router-dom
npm install --save dotenv 
npm install --save bootstrap
npm start
```
The frontend will load on `http://localhost:3000`.

## Example requests to the Java backend:

#### Retrieve a number of records:

GET: `http://localhost:8080/properties?page=0&size=2&sort=createdAt,desc`

#### Find records with a matching postcode:

GET `http://localhost:8080/properties?postcode=<postcode>`

#### Submit or amend a record:

POST: `http://localhost:8080/properties/`

```
{
    "buildingName": "Building 1",
    "description": "An example building",
    "number": "Surrey Quays Centre, Redriff Rd",
    "city": "London",
    "postcode": "SE16 7EE",
    "country": "UNITED_KINGDOM",
    "id": 1
}
```
*Note: a PATCH request with the same body will update a record with a matching `id`.*

Whenever a record is added or amended, the system will automatically find and append the geographical coordinates to the record.

#### Delete a record with a specific ID:

DELETE: `http://localhost:8080/properties/<id>`

## Screenshots of frontend:

#### Main React page:
![Front page](https://i.imgur.com/rRS0o3X.png)

#### Property viewing page, complete with geo-locating map:
![Viewer page](https://i.imgur.com/4lamMoJ.png)