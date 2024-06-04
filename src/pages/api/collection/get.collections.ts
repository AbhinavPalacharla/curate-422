/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: get.collections.ts: Describes the handler for the API request to get all collections

// Import necessary types and functions from Next.js, Prisma, and other utilities
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import { Collection } from "@prisma/client";

// Define the API handler function, which is asynchronous
const handler = async (
  req: NextApiRequest, // Type of the request object
  res: NextApiResponse<Array<Collection>> // Type of the response object
) => {
  try {
    // Attempt to find all collections in the database
    const collections = await prisma.collection.findMany();

    // Respond with a 200 status code and the list of collections
    return res.status(200).json(collections);
  } catch (err) {
    // In case of an error, handle it and respond appropriately
    handleError(err, res);
  }
};

// Export the handler as the default export
export default handler;
