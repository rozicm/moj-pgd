import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure.query(({ ctx }) => {
    return ctx.db.clan.findMany({
      orderBy: [
        {
          clan_id: "asc",
        },
      ],
    });
  }),

  get_oprema: publicProcedure.query(({ ctx }) => {
    return ctx.db.oprema.findMany();
  }),
  get_voznja: publicProcedure.query(({ ctx }) => {
    return ctx.db.voznja.findMany();
  }),
  
  update_oprema_status: publicProcedure
    .input(
      z.object({
        oprema_id: z.number(),
        new_status: z.boolean(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { oprema_id, new_status } = input;

      // Assuming ctx.db.oprema.update is a function to update the status of the oprema item
      await ctx.db.oprema.update({
        where: {
          id: oprema_id,
        },
        data: {
          status_opreme: new_status,
        },
      });

      return "Status updated successfully";
    }),
  create: publicProcedure
    .input(
      z.object({
        clan_id: z.number().min(1),
        ime: z.string().min(1),
        priimek: z.string().min(1),
        datum_rojstva: z.date(),
        specialnosti: z.string().min(1),
        kraj_bivanja: z.string().min(1),
        zdravniski: z.date().nullable(),
        funkcija: z.string().min(1),
        cin: z.string().min(1),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      console.log(input);

      return ctx.db.clan.create({
        data: input,
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
