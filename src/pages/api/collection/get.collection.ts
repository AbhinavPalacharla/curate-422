import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import { Collection } from "@prisma/client";
import { ReasonPhrases } from "http-status-codes";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Collection | { message: string }>
) => {
  const { id } = req.query;

  try {
    const collection = await prisma.collection.findUnique({
      where: {
        id: parseInt(id as string),
      },
    });

    if (!collection) {
      return res.status(404).json({ message: ReasonPhrases.NOT_FOUND });
    }

    return res.status(200).json(collection);
  } catch (err) {
    handleError(err, res);
  }
};

export default handler;
