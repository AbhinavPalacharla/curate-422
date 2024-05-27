import { prisma } from "../utils/prisma";

(async () => {
  console.log("INITIALIZING DB");

  console.log("CREATING SAMPLE COLLECTIONS");

  await prisma.collection.createMany({
    data: [{ id: 1, name: "The Pile", icon: "ReportColumns" }],
  });

  //   console.log("CREATING SAMPLE ARTIFACTS");

  console.log("DONE");
})();