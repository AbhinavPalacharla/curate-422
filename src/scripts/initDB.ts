/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: initDB.ts: Database initialization script

// Import the Prisma client instance from the utils directory
import { prisma } from "../utils/prisma";

// Immediately-invoked async function to initialize the database
(async () => {
  console.log("INITIALIZING DB"); // Log the start of the database initialization

  console.log("CREATING SAMPLE COLLECTIONS"); // Log the creation of sample collections

  // Use the Prisma client to create multiple sample collections in the database
  await prisma.collection.createMany({
    data: [{ id: 1, name: "The Pile", icon: "ReportColumns" }], // Define the sample collections data
  });

  // Uncomment the following lines to create sample artifacts
  // console.log("CREATING SAMPLE ARTIFACTS");

  console.log("DONE"); // Log the completion of the database initialization
})();