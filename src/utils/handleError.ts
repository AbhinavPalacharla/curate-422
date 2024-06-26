/// AUTHORS: AP, VD
/// LAST EDITED: 6-3-2024
/// DESCRIPTION: handleError.ts: creates a functions to handle bad request errors. 

import type { NextApiResponse } from "next";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
// import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const handleError = (error: any, res: NextApiResponse) => {
  if (error instanceof PrismaClientKnownRequestError) {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: ReasonPhrases.INTERNAL_SERVER_ERROR,
  });
};

export { handleError };
