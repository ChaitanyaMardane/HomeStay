import { PrismaClient } from "@prisma/client";
import { listingsData } from "./constants/listingData.js";

const prisma = new PrismaClient();

async function main() {
  const listings = await prisma.listing.createMany({
    data: listingsData,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
