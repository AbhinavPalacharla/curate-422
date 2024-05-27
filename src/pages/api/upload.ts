import { HandleUploadBody } from "@vercel/blob/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const dataURLtoFile = (dataurl: string, filename: string) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)![1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const storeFile = async (fileName: string, file: File) => {
  const uploadDir = path.join(process.cwd(), "public/files");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const filePath = path.join(uploadDir, fileName);

  const fileContents = await file.arrayBuffer();

  fs.writeFileSync(filePath, Buffer.from(fileContents));
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const b64file = req.body.b64File;

  const type = b64file.split(";")[0].split("/")[1];

  const fileName = `${uuidv4()}.${type}`;

  const file = dataURLtoFile(b64file, fileName);

  await storeFile(fileName, file);

  return res.status(200).send("");
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

export default handler;
