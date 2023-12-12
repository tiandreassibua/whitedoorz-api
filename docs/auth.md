# Authentication API Spec
___

## Register User API
___

Endpoint : POST /api/auth/register

Request Body :
```json
{
  "firstName":  "Andreas",
  "lastName":  "Sibua",
  "phone":  "089776549321",
  "email":  "andreas@email.com",
  "password":  "password"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName":  "Andreas",
    "lastName":  "Sibua",
    "phone":  "089776549321",
    "email":  "andreas@email.com"
  }
}
```

Response Body Error :

```json
{
  "errors": "user already exists"
}
```

## Login User API
___

Endpoint : POST /api/auth/login

Request Body :
```json
{
  "email":  "andreas@email.com",
  "password":  "password"
}
```

Response Body Success :

```json
{
  "data": {
    "id": 1,
    "firstName": "Andreas",
    "lastName": "Sibua",
    "phone": "089776549321",
    "email": "andreas@email.com"
  },
  "token": "unique-token"
}
```

Response Body Error :

```json
{
  "errors": "invalid email or password"
}
```