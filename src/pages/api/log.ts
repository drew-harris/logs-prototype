import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db";
import { z } from "zod";

const zMessage = z.object({
  playerId: z.string(),
  content: z.string(),
  color: z.string().optional(),
  level: z.number().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(400).json({
      error: {
        message: "Wrong method type",
      },
    });
  }

  try {
    const inputMessage = zMessage.parse(req.body);
    const newMessage = await prisma.message.create({
      data: {
        ...inputMessage,
      },
    });

    return res.status(200).json(newMessage);
  } catch (error) {
    res.status(400).json({
      error: {
        message: "Wrong body format",
      },
    });
  }
}
