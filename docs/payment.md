# Payment API Spec

---

## Create Payment API

Endpoint : POST /api/payments

Headers :

- Authorization : token

Request Body :

```json
{
  "transactionId": "fc5c1445-e431-4e51-a300-938e9408ecd2"
}
```

Response Body Success :

```json
{
  "data": {
    "token": "token-payment-midtrans",
    "redirect_url": "url-payment"
  }
}
```

Response Body Error :

```json
{
  "errors": "transaction is not found"
}
```
