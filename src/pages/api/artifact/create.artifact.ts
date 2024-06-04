/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: create.artifact.ts: Describes the handler for the API request to create a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import { saveFile } from "@/utils/saveFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { description, b64File } = req.body;

  try {
    const fileName = await saveFile(b64File);

    const artifact = await prisma.artifact.create({
      data: {
        description: description,
        media: {
          create: {
            type: 1,
            imageURL: `/files/${fileName}`,
          },
        },
        collection: {
          connect: {
            id: 1,
          },
        },
      },
    });

    return res.status(200).json(artifact);
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
