import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";
import { ReasonPhrases } from "http-status-codes";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id, ...data } = req.body;

  try {
    const collection = await prisma.collection.update({
      where: {
        id: parseInt(id),
      },
      data: data,
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
