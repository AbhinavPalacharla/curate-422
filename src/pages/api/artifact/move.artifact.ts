/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: copy.artifact.ts: Describes the handler for the API request to move a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { artifactId, collectionId } = req.body;

  try {
    // Updating the artifact's collection in the database using Prisma
    const artifact = await prisma.artifact.update({
      where: { id: parseInt(artifactId as string) }, // Parsing the artifactId to integer for database query
      data: {
        collection: { connect: { id: collectionId } }, // Connecting the artifact to the specified collection
      },
    });

    // Sending a success response with the updated artifact
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
