/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: copy.artifact.ts: Describes the handler for the API request to move a given artifact.

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { artifactId, collectionId } = req.body;

  try {
    const artifact = await prisma.artifact.update({
      where: { id: parseInt(artifactId as string) },
      data: {
        collection: { connect: { id: collectionId } },
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
