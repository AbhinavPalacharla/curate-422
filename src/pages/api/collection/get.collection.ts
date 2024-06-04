/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: get.collection.ts: Describes the handler for the API request to get a specific collection

// Import necessary types and functions from Next.js, Prisma, and other utilities
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import { Collection } from "@prisma/client";
import { ReasonPhrases } from "http-status-codes";

// Define the API handler function, which is asynchronous
const handler = async (
  req: NextApiRequest, // Type of the request object
  res: NextApiResponse<Collection | { message: string }> // Type of the response object
) => {
  const { id } = req.query; // Extract the 'id' from the query parameters

  try {
    // Attempt to find a unique collection in the database with the provided id
    const collection = await prisma.collection.findUnique({
      where: {
        id: parseInt(id as string), // Parse the 'id' as an integer
      },
    });

    // If no collection is found, respond with a 404 status code and a 'Not Found' message
    if (!collection) {
      return res.status(404).json({ message: ReasonPhrases.NOT_FOUND });
    }

    // If the collection is found, respond with a 200 status code and the collection data
    return res.status(200).json(collection);
  } catch (err) {
    // In case of an error, handle it and respond appropriately
    handleError(err, res);
  }
};

// Export the handler as the default export
export default handler;