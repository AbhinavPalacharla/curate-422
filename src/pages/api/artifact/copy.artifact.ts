/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: copy.artifact.ts: Describes the handler for the API request to copy a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils"; // Importing the Prisma client for database operations
import { handleError } from "@/utils/handleError"; // Importing a utility function to handle errors
import fs from "fs"; // File system module for file operations
import path from "path"; // Module for working with file paths
import { v4 as uuidv4 } from "uuid"; // Generating UUIDs for file names

// Handler function for the API request
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Destructuring the required data from the request body
  const { artifactId, collectionId } = req.body;

  try {
    // Fetching the artifact data from the database using Prisma
    const artifact = await prisma.artifact.findUnique({
      where: { id: parseInt(artifactId as string) }, // Parsing the artifactId to integer for database query
      include: { media: true }, // Including related media data for the artifact
    });

    // Array to store file paths
    const files: Array<string> = [];

    // Mapping through the media associated with the artifact and pushing their file paths to the files array
    artifact?.media.map((media) => {
      files.push(path.join(process.cwd(), "public", media.imageURL));
    });

    // Array to store new file paths
    const newFiles: Array<string> = [];

    // Mapping through the existing files and copying them with new names
    files.map((fpath) => {
      // Generating a new file name using UUID and file extension
      const newFname = `${uuidv4()}.${fpath.split(".").pop()}`;

      // Constructing the new file path
      const newFilePath = path.join(process.cwd(), "public/files", newFname);

      // Pushing the new file path to the newFiles array
      newFiles.push(`/files/${newFname}`);

      // Copying the file synchronously to the new location
      fs.copyFileSync(fpath, newFilePath);
    });

    // Creating new artifact entries in the database for each copied file
    await Promise.all(
      newFiles.map(async () => {
        return await prisma.artifact.create({
          data: {
            description: artifact?.description, // Copying the description from the original artifact
            media: {
              createMany: {
                data: newFiles.map((f) => {
                  return { type: 1, imageURL: f }; // Creating new media entries for the copied files
                }),
              },
            },
            collection: { connect: { id: collectionId } }, // Connecting the new artifacts to the specified collection
          },
        });
      })
    );

    // Sending a success response
    return res.status(200).json({});
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
