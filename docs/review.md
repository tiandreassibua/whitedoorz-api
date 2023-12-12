# Review API Spec

---

## Create Review API

Endpoint : POST /api/properties/:propId/reviews

Headers :

- Authorization : token

Request Body :

```json
{
  "body": "mantappp nyaman bangettt mantappp nyaman mantappp nyaman bangetttmantappp nyaman bangettt",
  "rating": 1
}
```

Response Body Success:

```json
{
  "data": {
    "id": 8,
    "userId": 10,
    "propertyId": 5,
    "body": "mantappp nyaman bangettt mantappp nyaman mantappp nyaman bangetttmantappp nyaman bangettt",
    "rating": 1,
    "createdAt": "2023-12-12T08:22:00.957Z",
    "updatedAt": "2023-12-12T08:22:00.957Z"
  }
}
```
