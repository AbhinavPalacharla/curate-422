/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: copy.artifact.ts: Describes the handler for the API request to copy a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { artifactId, collectionId } = req.body;

  try {
    const artifact = await prisma.artifact.findUnique({
      where: { id: parseInt(artifactId as string) },
      include: { media: true },
    });

    // const file = path.join(process.cwd(), "public/files", artifact.)

    const files: Array<string> = [];

    artifact?.media.map((media) => {
      files.push(path.join(process.cwd(), "public", media.imageURL));
    });

    const newFiles: Array<string> = [];

    files.map((fpath) => {
      const newFname = `${uuidv4()}.${fpath.split(".").pop()}`;

      const newFilePath = path.join(process.cwd(), "public/files", newFname);

      newFiles.push(`/files/${newFname}`);

      fs.copyFileSync(fpath, newFilePath);
    });

    await Promise.all(
      newFiles.map(async () => {
        return await prisma.artifact.create({
          data: {
            description: artifact?.description,
            media: {
              createMany: {
                data: newFiles.map((f) => {
                  return { type: 1, imageURL: f };
                }),
              },
            },
            collection: { connect: { id: collectionId } },
          },
        });
      })
    );

    return res.status(200).json({});
  } catch (err) {
    handleError(err, res);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb", // Set desired value here
    },
  },
};

export default handler;
