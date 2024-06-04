/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: delete.collection.ts: Describes the handler for the API request to delete a collection

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { id } = req.body;

  try {
    // Deleting the collection from the database using Prisma
    const collection = await prisma.collection.delete({
      where: { id }, // Specifying the collection id to delete
    });

    // Sending a success response with the deleted collection
    return res.status(200).json(collection);
  } catch (err) {
    // Handling errors
    handleError(err, res);
  }
};

// Exporting the handler function
export default handler;