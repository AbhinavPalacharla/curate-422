/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: get.collections.ts: Describes the handler for the API request to get all collections

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import { Collection } from "@prisma/client";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Array<Collection>>
) => {
  try {
    const collections = await prisma.collection.findMany();

    return res.status(200).json(collections);
  } catch (err) {
    handleError(err, res);
  }
};

export default handler;
