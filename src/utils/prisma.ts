/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: prisma.ts: initialization functions for Prisma ORM, run at the start of the program.

import { PrismaClient } from "@prisma/client";

// Declare a global variable 'prisma' which can be of type PrismaClient or undefined
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Check if the code is running on the server-side
if (typeof window === "undefined") {
  // If in production environment, create a new instance of PrismaClient
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    // In development, use a global instance to avoid creating multiple instances during hot reloading
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }

    prisma = global.prisma;
  }
}

export { prisma };

// import { PrismaClient } from "@prisma/client";

// declare global {
//   var prisma: PrismaClient | undefined;
// }

// const prisma =
//   global.prisma ||
//   new PrismaClient({
//     // log: ["query"],
//   });

// if (process.env.NODE_ENV !== "production") {
//   global.prisma = prisma;
// }

// export { prisma };
