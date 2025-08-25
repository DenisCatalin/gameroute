import { publicProcedure, router } from "./trpc";
import { nades } from "@/db/schema";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const db = drizzle(sql);

export const appRouter = router({
  dummyData: publicProcedure.query(async () => {
    return [10, 20, 30];
  }),
  getNades: publicProcedure.query(async () => {
    const results = await db.select().from(nades);
    if (results.length > 0) {
      return results;
    } else {
      return [];
    }
  }),
  addNade: publicProcedure
    .input(
      z.object({
        map: z.string(),
        position: z.string(),
        grenades: z.string(),
        team: z.string(),
      })
    )
    .mutation(async opts => {
      try {
        const insertResult = await db.insert(nades).values({
          nadeMap: opts.input.map,
          nadePosition: opts.input.position,
          nadeGrenades: opts.input.grenades,
          nadeTeam: opts.input.team,
        });
      } catch (err) {
        console.error("addNade error:", err);
        return false;
      }
      return true;
    }),
  updateNade: publicProcedure
    .input(
      z.object({
        id: z.number(),
        grenades: z.string(),
      })
    )
    .mutation(async opts => {
      try {
        const updated = await db
          .update(nades)
          .set({
            nadeGrenades: opts.input.grenades,
          })
          .where(eq(nades.nadeID, opts.input.id))
          .returning();
        return (updated?.length ?? 0) > 0;
      } catch (err) {
        console.error("updateNade error:", err);
        return false;
      }
    }),
  deleteNade: publicProcedure.input(z.object({ id: z.number() })).mutation(async (req: any) => {
    try {
      await db.delete(nades).where(eq(nades.nadeID, req.input.id)).returning();
      return true;
    } catch (err) {
      console.error(err);
    }
  }),
});

export type AppRouter = typeof appRouter;
