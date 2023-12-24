import { prismaClient } from "../src/application/database.js";
import { createSlug } from "../src/utils/generateSlug.js";

import { faker } from "@faker-js/faker";

const propertySeed = async () => {
    const data = [];
    for (let i = 0; i < 10; i++) {
        const cat = ["hotel", "apartment"];
        const image = [
            "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-dskt/tix-hotel/images-web/2020/10/31/046c3104-8935-4c94-b6b3-d54879b1c06a-1604133885644-526f0d4ebc8b3000bf6bc67c840512fe.jpg",
            "https://cf.bstatic.com/xdata/images/hotel/max1024x768/420522486.jpg?k=5ea697710ad87b4de5b5e413733356fbd6564fa60e97120eeaa80d23a5192b39&o=&hp=1",
        ];
        const name = faker.lorem.sentences(1);

        data.push({
            name: name,
            slug: await createSlug(name),
            address: faker.location.streetAddress(),
            category: cat[Math.floor(Math.random() * cat.length)],
            description: faker.lorem.text(),
            city: faker.location.city(),
            location:
                "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15952.136108231021!2d128.0102275963513!3d1.7136036446574074!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x329a61650cccd97b%3A0x1773edc1a70bea03!2sMarahai%20Park%20Hotel!5e0!3m2!1sid!2sid!4v1703397115447!5m2!1sid!2sid",
            image: faker.image.urlPicsumPhotos(640, 480),
        });
    }

    const property = await prismaClient.property.createMany({ data });
    console.log("success seed property");
};

propertySeed()
    .then(async () => {
        await prismaClient.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prismaClient.$disconnect();
        process.exit(1);
    });
