/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: create.collection.ts: Describes the handler for the API request to create a collection

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { name, icon } = req.body;

  try {
    // Creating a new collection entry in the database using Prisma
    const collection = await prisma.collection.create({
      data: {
        name, // Setting the name for the collection
        icon, // Setting the icon for the collection
      },
    });

    // Sending a success response with the created collection
    return res.status(200).json(collection);
  } catch (err) {
    // Handling errors
    handleError(err, res);
  }
};

// Exporting the handler function
export default handler;