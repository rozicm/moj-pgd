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
    return ctx.db.voznja.findMany({
      orderBy: [
        {
          voznja_id: "desc",
        },
      ],
    });
  }),

  get_intervencija: publicProcedure.query(({ ctx }) => {
    return ctx.db.intervencija.findMany();
  }),

  update_oprema_status: publicProcedure
    .input(
      z.object({
        oprema_id: z.number(),
        new_status: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { oprema_id, new_status } = input;
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
  add_voznja: publicProcedure
    .input(
      z.object({
        voznja_id: z.number().min(1),
        datum: z.date(),
        zac_km: z.number(),
        kon_km: z.number(),
        namen: z.string(),
        voznik: z.string(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      console.log(input);

      return ctx.db.voznja.create({
        data: input,
      });
    }),

  add_intervencija: publicProcedure
    .input(
      z.object({
        intervencija_id: z.number().min(1),
        datum: z.date(),
        tip: z.string(),
        st_clanov: z.number(),
        opis: z.string(),
      }),
    )

    .mutation(async ({ ctx, input }) => {
      console.log(input);

      return ctx.db.intervencija.create({
        data: input,
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
