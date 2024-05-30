import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils";
import { handleError } from "@/utils/handleError";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { artifactId } = req.body;

  try {
    const artifact = await prisma.artifact.delete({
      where: {
        id: parseInt(artifactId as string),
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
