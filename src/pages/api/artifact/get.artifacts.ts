/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: get.artifact.ts: Describes the handler for the API request to get an artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request query
  const { collectionId } = req.query;

  try {
    // Fetching artifacts from the database using Prisma
    const artifacts = await prisma.artifact.findMany({
      where: { collection: { id: parseInt(collectionId as string) } }, // Filtering artifacts by collection id
      include: {
        media: true, // Including related media data for each artifact
      },
    });

    // Sending a success response with the fetched artifacts
    return res.status(200).json(artifacts);
  } catch (err) {
    // Handling errors
    handleError(err, res);
  }
};

// Exporting the handler function
export default handler;
