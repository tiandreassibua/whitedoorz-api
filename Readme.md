### Cara Install WhiteDoorz API
---
- Clone repository ini
- Instal semua dependensi pada projek ini

    ```shell
    npm install
    ```
- Kemudian duplikat file `.env.example` dan rename menjadi `.env`

    ```javascript
    NODE_ENV=development
    DATABASE_URL="mysql://<username>:<password>@<host>:<port>/<database_name>"
    PORT=<port>
    JWT_SECRET=<jwt_secret>

    MIDTRANS_IS_PRODUCTION=false
    MIDTRANS_SERVER_KEY=<server_key_midtrans>
    MIDTRANS_CLIENT_KEY=<client_key_midtrans>
    ```
    - `NODE_ENV` = nilai defaultnya itu `development`, bisa diganti `production` ketika sudah di deploy ke cloud
    - `PORT` = nilai default `5000` bisa diganti berapapun asalkan tidak bentrok dengan port aplikasi lain yang sedang berjalan
    - `DATABASE_URL` = bisa diisi sesuai format yang ada dan mengikuti pengaturan di device masing-masing. kalo yang mysql nya tidak menggunakan password bisa dibuat seperti ini
    - `JWT_SECRET` = silahkan buat text random. lebih sulit lebih bagus
    - `MIDTRANS_IS_PRODUCTION` = nilai default yaitu `false` karna masih tahap development, kalau `true` pas pembayaran nanti udah menggunakan uang beneran
    - `MIDTRANS_SERVER_KEY` = silahkan daftar ke midtrans untuk mendapatkan server key dan client key, kemudian masukan ke env variable nya
    - `MIDTRANS_CLIENT_KEY` = silahkan daftar ke midtrans untuk mendapatkan server key dan client key, kemudian masukan ke env variable nya
    ```javascript
    // tanpa password
    DATABASE_URL="mysql://root:@localhost:3306/whitedoorz"
    // dengan password
    DATABASE_URL="mysql://root:root@localhost:3306/whitedoorz"

    // 3306 itu port default bawaan mysql
    ```
- Kemudian buat database di di mysql, dan pastikan sesuai dengan yang ada di env variable
- setelah itu jalankan perintah berikut di terminal
    ```
    npx prisma db push
    ```
- untuk menjalankan servernya bisa menjalankan command berikut
    ```
    npm run dev
    ```