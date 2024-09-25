import dotenv from "dotenv";
import dbService from "./mongo.js";

dotenv.config();

await dbService.initializeDb();
const db = await dbService.getDb();

const seedProductsDb = async () => {
  const seedProducts = [
    {
      imageUrl: "https://i.postimg.cc/zfYYnvqN/product-01.png",
      hoverImageUrl: "https://i.postimg.cc/LXHdbWq0/product-01-00.png",
      title: "#01 @ Blue Velvet Collection",
      price: "15",
    },
    {
      imageUrl: "https://i.postimg.cc/6pvN2nJz/product-02.png",
      hoverImageUrl: "https://i.postimg.cc/CKCTJ0Kq/product-02-00.png",
      title: "#01 @ City Escape Collection",
      price: "11.90",
    },
    {
      imageUrl: "https://i.postimg.cc/Vv6xYbWq/product-03.png",
      hoverImageUrl: "https://i.postimg.cc/ydvq4Tc6/product-03-00.png",
      title: "#01 @ New World Collection",
      price: "12.50",
    },
    {
      imageUrl: "https://i.postimg.cc/xjpr6t9t/product-04.png",
      hoverImageUrl: "https://i.postimg.cc/wMGS3TwS/product-04-00.png",
      title: "#01 @ Long Dream Collection",
      price: "20",
    },
    {
      imageUrl: "https://i.postimg.cc/jdBpb2wf/product-05.png",
      hoverImageUrl: "https://i.postimg.cc/CLR3Xk1Y/product-05-00.png",
      title: "#02 @ Long Dream Collection",
      price: "20",
    },
    {
      imageUrl: "https://i.postimg.cc/xd2BXZPT/product-06.png",
      hoverImageUrl: "https://i.postimg.cc/mgM024C5/product-06-00.png",
      title: "#02 @ City Escape Collection",
      price: "11.90",
    },
    {
      imageUrl: "https://i.postimg.cc/C1MtNft3/product-07.png",
      hoverImageUrl: "https://i.postimg.cc/bv9WkR60/product-07-00.png",
      title: "#02 @ New World Collection",
      price: "12.50",
    },
  ];

  try {
    // CLEAR DB:
    console.log("\nClearing DB...");
    await db.collection("products").deleteMany();
    console.log("DB clean!\n");

    // SEED DB:
    console.log("Seeding DB...");
    await db.collection("products").insertMany(seedProducts);
    console.log("DB seeded!");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

await seedProductsDb();
