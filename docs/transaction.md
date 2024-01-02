# Transaction API Spec

---

## Create Transaction API

---

Endpoint : POST /api/transactions

Headers :

- Authorization : token

Request Body :

```json
{
  "transaction": {
    "propertyId": 3,
    "checkIn": "2023-12-10T00:00:00.000Z",
    "checkOut": "2023-12-12T00:00:00.000Z",
    "totalPrice": 950000
  },
  "transactionRooms": [
    {
      "roomId": 1,
      "roomQty": 1
    },
    {
      "roomId": 2,
      "roomQty": 1
    }
  ]
}
```

Response Body Success

```json
{
  "data": {
    "id": "9e2f3103-60e7-48a4-a3a1-8a29b4573c8f",
    "userId": 10,
    "propertyId": 3,
    "checkIn": "2023-12-10T00:00:00.000Z",
    "checkOut": "2023-12-12T00:00:00.000Z",
    "totalPrice": 950000,
    "status": "created",
    "redirect_url": null,
    "createdAt": "2023-12-12T08:42:52.650Z",
    "updatedAt": "2023-12-12T08:42:52.650Z"
  }
}
```

## Get List Transaction API

---

Endpoint : GET /api/transactions

Headers :

- Authorization : token

Request Body :

Response Body Success :

```json
{
  "data": [
    {
      "id": "77e42b01-2d04-4d7c-9610-652910c5ab2c",
      "userId": 10,
      "propertyId": 3,
      "checkIn": "2023-12-10T00:00:00.000Z",
      "checkOut": "2023-12-12T00:00:00.000Z",
      "totalPrice": 950000,
      "status": "created",
      "redirect_url": null,
      "transactionRooms": [
        {
          "id": 1,
          "roomId": 1,
          "roomQty": 1,
          "roomName": "Deluxe Twin Garden View With Balcony",
          "roomImg": "",
          "roomPrice": 550000,
          "roomMaxPeople": 4,
          "roomBedQty": 2
        },
        {
          "id": 2,
          "roomId": 2,
          "roomQty": 1,
          "roomName": "Deluxe King Garden View With Balcony",
          "roomImg": "",
          "roomPrice": 550000,
          "roomMaxPeople": 2,
          "roomBedQty": 1
        }
      ]
    }
  ]
}
```

Response Body Error :

```json
{
  "errors": "You are not authenticated"
}
```

## Get Transaction API

Endpoint : GET /api/transactions/:transactionId

Headers :

- Authorization : token

Request Body :

Response Body Success :

```json
{
  "data": {
    "id": "1befd62b-bc95-40ac-9015-7898270a2a9e",
    "userId": 10,
    "propertyId": 3,
    "checkIn": "2023-12-10T00:00:00.000Z",
    "checkOut": "2023-12-12T00:00:00.000Z",
    "totalPrice": 950000,
    "status": "created",
    "redirect_url": null,
    "transactionRooms": [
      {
        "id": 3,
        "roomId": 1,
        "roomQty": 1,
        "roomName": "Deluxe Twin Garden View With Balcony",
        "roomImg": "",
        "roomPrice": 550000,
        "roomMaxPeople": 4,
        "roomBedQty": 2
      },
      {
        "id": 4,
        "roomId": 2,
        "roomQty": 1,
        "roomName": "Deluxe King Garden View With Balcony",
        "roomImg": "",
        "roomPrice": 550000,
        "roomMaxPeople": 2,
        "roomBedQty": 1
      }
    ],
    "user": {
      "firstName": "andreas",
      "lastName": "sibua",
      "email": "andreassibua@gmail.com",
      "phone": "+6285399088890"
    }
  }
}
```

Response Body Error :
```json
{
  "errors": "transaction is not found"
}
```