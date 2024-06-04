/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: delete.artifact.ts: Describes the handler for the API request to delete a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { artifactId } = req.body;

  try {
    // Deleting the artifact from the database using Prisma
    const artifact = await prisma.artifact.delete({
      where: {
        id: parseInt(artifactId as string), // Parsing the artifactId to integer for database query
      },
    });

    // Sending a success response with the deleted artifact
    return res.status(200).json(artifact);
  } catch (err) {
    // Handling errors
    handleError(err, res);
  }
};

// Configuration for the API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Setting the body size limit for requests
    },
  },
};

// Exporting the handler function
export default handler;