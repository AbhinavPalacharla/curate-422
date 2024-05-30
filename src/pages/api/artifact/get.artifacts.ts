import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { collectionId } = req.query;

  try {
    const artifacts = await prisma.artifact.findMany({
      where: { collection: { id: parseInt(collectionId as string) } },
      include: {
        media: true,
      },
    });

    return res.status(200).json(artifacts);
  } catch (err) {
    handleError(err, res);
  }
};

export default handler;