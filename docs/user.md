# User API Spec

---

## Get User Profile

---

Endpoint : GET /api/users/profile

Headers:

- Authorization : token

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Andreas",
    "lastName": "Sibua",
    "phone": "089776549321",
    "email": "andreas@email.com"
  }
}
```

Response Body Error :

```json
{
  "errors": "You are not authenticated"
}
```

## Update User Profile

---

Endpoint : GET /api/users/profile

Headers:

- Authorization : token

Request Body :

```json
{
  "id": 1,
  "firstName": "Andreas Update", // optional
  "lastName": "Sibua Update" // optional
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Andreas Update",
    "lastName": "Sibua Update",
    "phone": "089776549321",
    "email": "andreas@email.com"
  }
}
```

Response Body Error :

```json
{
  "errors": "firstName length max 50"
}
```
