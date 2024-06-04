/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: upload.ts: Describes all of the utility functions needed for uploading files to the hard disk for storage as part of the database.

// Import necessary modules and types
import { HandleUploadBody } from "@vercel/blob/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid"; // Import UUID library for generating unique identifiers
import fs from "fs"; // Import Node.js file system module
import path from "path"; // Import Node.js path module

// Utility function to convert a data URL to a File object
const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(","), // Split the data URL to get the mime type and base64 data
    mime = arr[0].match(/:(.*?);/)![1], // Extract the mime type
    bstr = atob(arr[arr.length - 1]), // Decode the base64 data
    n = bstr.length,
    u8arr = new Uint8Array(n); // Create a Uint8Array to hold the binary data
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n); // Convert the binary string to a Uint8Array
  }
  return new File([u8arr], filename, { type: mime }); // Create and return a new File object
};

// Utility function to store a file on the server's file system
const storeFile = async (fileName: string, file: File) => {
  const uploadDir = path.join(process.cwd(), "public/files"); // Define the upload directory

  // Check if the upload directory exists, create it if it doesn't
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName); // Define the full file path

  const fileContents = await file.arrayBuffer(); // Read the file contents as an array buffer

  fs.writeFileSync(filePath, Buffer.from(fileContents)); // Write the file to the file system
};

// API handler function for handling file uploads
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const b64file = req.body.b64File; // Extract the base64 file data from the request body

  const type = b64file.split(";")[0].split("/")[1]; // Extract the file type from the base64 data

  const fileName = `${uuidv4()}.${type}`; // Generate a unique file name with the extracted file type

  const file = dataURLtoFile(b64file, fileName); // Convert the base64 data to a File object

  await storeFile(fileName, file); // Store the file on the server

  return res.status(200).send(""); // Send a 200 OK response
};

// Configuration object for the API handler
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set the maximum allowed body size for the request
    },
  },
};

// Export the handler as the default export
export default handler;