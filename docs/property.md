# Property API Spec

---

## GET Search Property

---

Endpoint : GET /api/properties

Query Params :

- name : search by property name, using like, optional
- city : search by property city, using like, optional
- page : number of page, default 1
- size : size per page, default 10

Response Body Success :

```json
{
  "data": [
    {
      "id": 1,
      "slug": "the-alana-yogyakarta-hotel-convention-center-0727e75d",
      "name": "The Alana Yogyakarta Hotel & Convention Center",
      "address": "Jl. Palagan Tentara Pelajar No.KM.7, Mudal, Sariharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581",
      "city": "Yogyakarta",
      "image": "https://lh5.googleusercontent.com/p/AF1QipOFG3a-NCQR5UxWnHPHnuSKalt4OCHw3PcThbjS=w408-h272-k-no",
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31627.799564732006!2d110.33908707431642!3d-7.739339799999992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a58e23d58705d%3A0xe3e3f1de06133d33!2sThe%20Alana%20Yogyakarta%20Hotel%20%26%20Convention%20Center!5e0!3m2!1sid!2sid!4v1702008501341!5m2!1sid!2sid",
      "rating": 0,
      "description": "Hanya berjarak 10 menit berkendara dari Kebun Raya dan Istana Kepresidenan Bogor, Bogor Valley Hotel akan menyambutmu dengan keramahan para stafnya. Kamu dapat menikmati pemandangan Gunung Salak dan Pangrango yang indah dari kamar hotel. WiFi bisa diakses gratis di seluruh properti. Untuk kenyamananmu, seluruh kamar di hotel ini dilengkapi AC dan jendela besar dengan pemandangan lampu kota atau gunung. Fasilitas TV kabel, area tempat duduk dan ketel listrik tersedia di semua kamar. Sedangkan kamar mandi dilengkapi dengan fasilitas shower dan peralatan mandi gratis.",
      "category": "apartment",
      "createdAt": "2023-12-08T04:09:08.934Z",
      "updatedAt": "2023-12-08T04:09:08.934Z"
    },
    {
      "id": 2,
      "slug": "all-nite-day-hotel-yogyakarta-gejayan-73b9fd2d",
      "name": "All Nite & Day Hotel Yogyakarta - Gejayan",
      "address": "Jl. Affandi No.17C, Klitren, Kec. Gondokusuman, Kota Yogyakarta, Daerah Istimewa Yogyakarta 55222",
      "city": "Yogyakarta",
      "image": "https://lh3.googleusercontent.com/gps-proxy/AFm_dcQ22hpvuFRzaMe1CO-ixHfjVn-nykLDJ2Iya6CvJivyfYC17luD6dsomldwMcCctbO2jbJzu1YC3A1bVBbUne2_Zz8mk6MvCAYKRWypHdmhAS1qNz6ZEjr4p48WnbXhqoIkGs8qO3XEr7zgBwcRTfczUHgmKIGsnKsWQDhBz67930yk9hPXAS5-Ww=w408-h306-k-no",
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63249.23093681313!2d110.39168936450056!3d-7.781667743677258!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59cf1b3e3ebd%3A0x2ae7d5ebc823cf82!2sAll%20Nite%20%26%20Day%20Hotel%20Yogyakarta%20-%20Gejayan!5e0!3m2!1sid!2sid!4v1702008835687!5m2!1sid!2sid",
      "rating": 2.7143,
      "description": "Hanya berjarak 10 menit berkendara dari Kebun Raya dan Istana Kepresidenan Bogor, Bogor Valley Hotel akan menyambutmu dengan keramahan para stafnya. Kamu dapat menikmati pemandangan Gunung Salak dan Pangrango yang indah dari kamar hotel. WiFi bisa diakses gratis di seluruh properti. Untuk kenyamananmu, seluruh kamar di hotel ini dilengkapi AC dan jendela besar dengan pemandangan lampu kota atau gunung. Fasilitas TV kabel, area tempat duduk dan ketel listrik tersedia di semua kamar. Sedangkan kamar mandi dilengkapi dengan fasilitas shower dan peralatan mandi gratis.",
      "category": "hotel",
      "createdAt": "2023-12-08T04:14:14.211Z",
      "updatedAt": "2023-12-08T08:59:13.831Z"
    },
    {
      "id": 3,
      "slug": "ros-in-hotel-57bb217f",
      "name": "Ros-In Hotel",
      "address": "Jl. Ringroad Selatan, Druwo, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",
      "city": "Jakarta",
      "image": "https://lh3.googleusercontent.com/gps-proxy/AFm_dcQ22hpvuFRzaMe1CO-ixHfjVn-nykLDJ2Iya6CvJivyfYC17luD6dsomldwMcCctbO2jbJzu1YC3A1bVBbUne2_Zz8mk6MvCAYKRWypHdmhAS1qNz6ZEjr4p48WnbXhqoIkGs8qO3XEr7zgBwcRTfczUHgmKIGsnKsWQDhBz67930yk9hPXAS5-Ww=w408-h306-k-no",
      "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63241.057322123546!2d110.29176114863279!3d-7.835662899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57ad651e4885%3A0x6bbf530298ce16c6!2sRos-In%20Hotel!5e0!3m2!1sid!2sid!4v1702008982629!5m2!1sid!2sid",
      "rating": 0,
      "description": "Hanya berjarak 10 menit berkendara dari Kebun Raya dan Istana Kepresidenan Bogor, Bogor Valley Hotel akan menyambutmu dengan keramahan para stafnya. Kamu dapat menikmati pemandangan Gunung Salak dan Pangrango yang indah dari kamar hotel. WiFi bisa diakses gratis di seluruh properti. Untuk kenyamananmu, seluruh kamar di hotel ini dilengkapi AC dan jendela besar dengan pemandangan lampu kota atau gunung. Fasilitas TV kabel, area tempat duduk dan ketel listrik tersedia di semua kamar. Sedangkan kamar mandi dilengkapi dengan fasilitas shower dan peralatan mandi gratis.",
      "category": "hotel",
      "createdAt": "2023-12-08T04:16:43.310Z",
      "updatedAt": "2023-12-08T04:16:43.310Z"
    }
  ],
  "paging": {
    "page": 1,
    "totalPage": 1,
    "totalItem": 3
  }
}
```

Response Body Error : " "

## Create Property API

---

Endpoint : POST /api/properties/:slug

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Test Hotel",
  "address": "Jl. Ringroad Selatan, Druwo, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",
  "image": "https://lh5.googleusercontent.com/p/AF1QipMGEnBm9vX9VO0zGJXCjNIDNTAHNnztvw2coL-I=w408-h271-k-no",
  "city": "Yogyakarta",
  "location": '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63241.057322123546!2d110.29176114863279!3d-7.835662899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57ad651e4885%3A0x6bbf530298ce16c6!2sRos-In%20Hotel!5e0!3m2!1sid!2sid!4v1702008982629!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  "category": "hotel",
  "description": "Terletak di antara deretan toko dan restoran di daerah perumahan yang rindang, hotel santai ini berjarak 4 km dari taman kerajaan abad ke-18 Taman Sari dan 7 km dari Stasiun Jogjakarta."
}
```

Response Body Success :

```json
{
  "data": {
    "id": 5,
    "slug": "test-hotel-ae8fc523",
    "name": "Test Hotel",
    "address": "Jl. Ringroad Selatan, Druwo, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",
    "city": "Yogyakarta",
    "image": "https://lh5.googleusercontent.com/p/AF1QipMGEnBm9vX9VO0zGJXCjNIDNTAHNnztvw2coL-I=w408-h271-k-no",
    "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63241.057322123546!2d110.29176114863279!3d-7.835662899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57ad651e4885%3A0x6bbf530298ce16c6!2sRos-In%20Hotel!5e0!3m2!1sid!2sid!4v1702008982629!5m2!1sid!2sid",
    "rating": 0,
    "description": "Terletak di antara deretan toko dan restoran di daerah perumahan yang rindang, hotel santai ini berjarak 4 km dari taman kerajaan abad ke-18 Taman Sari dan 7 km dari Stasiun Jogjakarta.",
    "category": "hotel",
    "createdAt": "2023-12-12T08:01:42.151Z",
    "updatedAt": "2023-12-12T08:01:42.151Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "name length must be less than or equal to 150 characters long"
}
```

## Update Property API

---

Endpoint : GET /api/properties/:id

Headers :

- Authorization : token

Request Body :

```json
{
  "name": "Test Hotel bagus", // optional
  "address": "Jl. Ringroad Selatan, Druwo, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188", // optional
  "image": "https://lh5.googleusercontent.com/p/AF1QipMGEnBm9vX9VO0zGJXCjNIDNTAHNnztvw2coL-I=w408-h271-k-no", // optional
  "city": "Yogyakarta", // optional
  "location": '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63241.057322123546!2d110.29176114863279!3d-7.835662899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57ad651e4885%3A0x6bbf530298ce16c6!2sRos-In%20Hotel!5e0!3m2!1sid!2sid!4v1702008982629!5m2!1sid!2sid" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>', // optional
  "category": "hotel", // optional
  "description": "Terletak di antara deretan toko dan restoran di daerah perumahan yang rindang, hotel santai ini berjarak 4 km dari taman kerajaan abad ke-18 Taman Sari dan 7 km dari Stasiun Jogjakarta."// optional
}
```

Response Body Success :

```json
{
  "data": {
    "id": 5,
    "slug": "test-hotel-bagus-ae8fc523",
    "name": "Test Hotel",
    "address": "Jl. Ringroad Selatan, Druwo, Bangunharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55188",
    "city": "Yogyakarta",
    "image": "https://lh5.googleusercontent.com/p/AF1QipMGEnBm9vX9VO0zGJXCjNIDNTAHNnztvw2coL-I=w408-h271-k-no",
    "location": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63241.057322123546!2d110.29176114863279!3d-7.835662899999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a57ad651e4885%3A0x6bbf530298ce16c6!2sRos-In%20Hotel!5e0!3m2!1sid!2sid!4v1702008982629!5m2!1sid!2sid",
    "rating": 0,
    "description": "Terletak di antara deretan toko dan restoran di daerah perumahan yang rindang, hotel santai ini berjarak 4 km dari taman kerajaan abad ke-18 Taman Sari dan 7 km dari Stasiun Jogjakarta.",
    "category": "hotel",
    "createdAt": "2023-12-12T08:01:42.151Z",
    "updatedAt": "2023-12-12T08:01:42.151Z"
  }
}
```

Response Body Error :

```json
{
  "errors": "name length must be less than or equal to 150 characters long"
}
```