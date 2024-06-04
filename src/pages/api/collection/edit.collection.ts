/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: edit.collection.ts: Describes the handler for the API request to edit a collection

import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors
import { ReasonPhrases } from "http-status-codes"; // Importing HTTP status code phrases

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { id, ...data } = req.body;

  try {
    // Updating the collection in the database using Prisma
    const collection = await prisma.collection.update({
      where: {
        id: parseInt(id), // Parsing the collection id to integer for database query
      },
      data: data, // Updating the collection data with the provided data
    });

    // If the collection is not found, return a 404 response
    if (!collection) {
      return res.status(404).json({ message: ReasonPhrases.NOT_FOUND });
    }

    // Sending a success response with the updated collection
    return res.status(200).json(collection);
  } catch (err) {
    // Handling errors
    handleError(err, res);
  }
};

// Exporting the handler function
export default handler;