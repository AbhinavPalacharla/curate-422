/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: create.artifact.ts: Describes the handler for the API request to create a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors
import { saveFile } from "@/utils/saveFile"; // Importing a utility function to save files

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { description, b64File } = req.body;

  try {
    // Saving the base64 encoded file to the server and getting the file name
    const fileName = await saveFile(b64File);

    // Creating a new artifact entry in the database
    const artifact = await prisma.artifact.create({
      data: {
        description: description, // Setting the description for the artifact
        media: {
          create: {
            type: 1, // Setting the type of media (1 for image)
            imageURL: `/files/${fileName}`, // Setting the URL of the saved file
          },
        },
        collection: {
          connect: {
            id: 1, // Connecting the artifact to the specified collection (id: 1)
          },
        },
      },
    });

    // Sending a success response with the created artifact
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
