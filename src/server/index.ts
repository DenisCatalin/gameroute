import { publicProcedure, router } from "./trpc";
import { nades, resources } from "@/db/schema";
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
  getResources: publicProcedure.query(async () => {
    const results = await db.select().from(resources);
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
        await db.insert(nades).values({
          nadeMap: opts.input.map,
          nadePosition: opts.input.position,
          nadeGrenades: opts.input.grenades,
          nadeTeam: opts.input.team,
        });
      } catch (err) {
        console.error("Error", err);
        return false;
      }
      return true;
    }),
  updateNade: publicProcedure
    .input(z.object({ id: z.number(), grenades: z.string() }))
    .input(
      z.object({
        id: z.number(),
        grenades: z.string(),
      })
    )
    .mutation(async opts => {
      try {
        await db
          .update(nades)
          .set({
            nadeID: opts.input.id,
            nadeGrenades: opts.input.grenades,
          })
          .where(eq(nades.nadeID, opts.input.id))
          .returning();
      } catch (err) {
        console.error("Error", err);
        return false;
      }
    }),
  deleteNade: publicProcedure.input(z.object({ id: z.number() })).query(async (req: any) => {
    const result = await db.delete(nades).where(eq(nades.nadeID, req.input.id)).returning();
    if (result.length > 0) {
      return result[0];
    } else {
      return null;
    }
  }),
  // getProductsByCategory: publicProcedure
  //   .input(z.object({ category: z.string() }))
  //   .query(async (req: any) => {
  //     const result = await db
  //       .select()
  //       .from(products)
  //       .where(eq(products.productCategory, req.input.category));
  //     if (result.length > 0) {
  //       return result;
  //     } else {
  //       return null;
  //     }
  //   }),
});

export type AppRouter = typeof appRouter;
