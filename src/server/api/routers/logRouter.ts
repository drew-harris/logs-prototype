import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const logRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  deleteLogs: publicProcedure.mutation(async ({ ctx }) => {
    await ctx.prisma.message.deleteMany({});
  }),

  getLogs: publicProcedure
    .input(
      z.object({
        studentId: z.string().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const messages = await ctx.prisma.message.findMany({
          where: {
            playerId: input.studentId,
          },
          orderBy: {
            timestamp: "desc",
          },
          take: 50,
        });
        return messages;
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not get messages",
        });
      }
    }),
});
