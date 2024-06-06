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
    "name": "Property1",
    "description": "Here is a property",
    "id": 1
}
```

Pagination: `http://localhost:8080/properties?page=0&size=2&sort=createdAt,desc`


### TODO


- Add extra fields to class
- Frontend using API
- Other things

--------------------------