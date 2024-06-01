import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;

  try {
    const collection = await prisma.collection.delete({
      where: { id },
    });

    return res.status(200).json(collection);
  } catch (err) {
    handleError(err, res);
  }
};

export default handler;
