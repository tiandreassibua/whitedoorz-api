# Wishlist API Spec

---

## Create Wishlist API

Endpoint : POST /api/properties/:propId/wishlists

Headers :

- Authorization : token

Request Body :

Response Body Success:

```json
{
  "data": {
    "id": 1,
    "userId": 10,
    "propertyId": 5,
    "createdAt": "2023-12-12T08:22:54.397Z",
    "updatedAt": "2023-12-12T08:22:54.397Z"
  }
}
```

## Get Wishlist API

Endpoint : GET /api/wishlists

Headers :

- Authorization : token

Request Body:

Response Body Success:

```json
{
  "data": [
    {
      "id": 1,
      "propertyId": 5
    }
  ]
}
```

## Delete Wishlist API

Endpoint : DELETE /api/properties/5/wishlists/1

Headers :

- Authorization : token

Request Body:

Response Body Success:

```json
{
  "data": "OK"
}
```