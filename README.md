# property_viewer
Part of a test



## ME:

```
sudo -u postgres psql template1
ALTER USER postgres with encrypted password 'pie making shake large';
CREATE DATABASE postgres_demo;
exit
sudo systemctl restart postgresql.service
```

`mvn mvn clean spring-boot:run`

Default database: `postgres_demo`
Default table: `properties`

GET/POST `http://localhost:8080/properties/`

eg POST: `http://localhost:8080/properties/`

```
{
    "buildingName": "Surrey Quays Centre",
    "description": "Local Tesco",
    "number": "Redriff Rd",
    "city": "London",
    "postcode": "SE16 7LL",
    "country": "UNITED_KINGDOM",
    "id": 1
}
```

Pagination: `http://localhost:8080/properties?page=0&size=2&sort=createdAt,desc`


### TODO

- Frontend using API
- Searching by other metrics
- Other things

--------------------------