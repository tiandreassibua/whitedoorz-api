# Room API Spec

---

## Create Room API

---

Endpoint : POST /api/properties/:propId/rooms

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "Deluxe King Garden View With Balcony",
  "image": ""
  "price": 550000,
  "maxPeople": 2,
  "bedQty": 1,
  "availableQty": 3
}
```

Response Body Success :

```json
{
  "data": {
    "id": 3,
    "propertyId": 5,
    "image": "",
    "name": "Deluxe King Garden View With Balcony",
    "price": 550000,
    "maxPeople": 2,
    "bedQty": 1,
    "availableQty": 3,
    "createdAt": "2023-12-12T08:10:04.813Z",
    "updatedAt": "2023-12-12T08:10:04.813Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "property is not found"
}
```

## Update Room API

---

Endpoint : PUT /api/properties/:propId/rooms/:roomId

Headers :

- Authorization : token

Request Body:

```json
{
  "name": "Bartoletti, Rolfson and Will",
  "image": "http://dummyimage.com/1920x1080.png/5fa2dd/ffffff",
  "price": 550000,
  "maxPeople": 4,
  "bedQty": 2,
  "availableQty": 4
}
```

Response Body Success :

```json
{
  "data": {
    "id": 3,
    "propertyId": 5,
    "image": "http://dummyimage.com/1920x1080.png/5fa2dd/ffffff",
    "name": "Bartoletti, Rolfson and Will",
    "price": 550000,
    "maxPeople": 4,
    "bedQty": 2,
    "availableQty": 4,
    "createdAt": "2023-12-12T08:10:04.813Z",
    "updatedAt": "2023-12-12T08:15:22.813Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "property is not found"
}
```