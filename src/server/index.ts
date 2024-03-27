import { publicProcedure, router } from "./trpc";
import { gtaLocationsTags, nades, resources } from "@/db/schema";
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
  getResourcesTags: publicProcedure.query(async () => {
    const results = await db.select().from(gtaLocationsTags);
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
  deleteNade: publicProcedure.input(z.object({ id: z.number() })).mutation(async (req: any) => {
    try {
      await db.delete(nades).where(eq(nades.nadeID, req.input.id)).returning();
      return true;
    } catch (err) {
      console.error(err);
    }
  }),
  deleteTag: publicProcedure.input(z.object({ id: z.number() })).query(async (req: any) => {
    try {
      await db.delete(gtaLocationsTags).where(eq(gtaLocationsTags.tagID, req.input.id)).returning();
      return true;
    } catch (err) {
      console.error(err);
    }
  }),
  addLocation: publicProcedure
    .input(
      z.object({
        name: z.string(),
        tag: z.string(),
        type: z.string(),
        gallery: z.string(),
        location: z.string(),
      })
    )
    .mutation(async opts => {
      try {
        await db.insert(resources).values({
          resourceName: opts.input.name,
          resourceTag: opts.input.tag,
          resourceType: opts.input.type,
          resourceGallery: opts.input.gallery,
          resourceLocation: opts.input.location,
        });
      } catch (err) {
        console.error("Error", err);
        return false;
      }
      return true;
    }),
  getResourcesByType: publicProcedure
    .input(z.object({ type: z.string() }))
    .query(async (req: any) => {
      const result = await db
        .select()
        .from(resources)
        .where(eq(resources.resourceType, req.input.type));
      if (result.length > 0) {
        return result;
      } else {
        return [];
      }
    }),
  addTag: publicProcedure
    .input(
      z.object({
        resource: z.string(),
        list: z.string(),
      })
    )
    .mutation(async opts => {
      try {
        await db.insert(gtaLocationsTags).values({
          tagResource: opts.input.resource,
          tagList: opts.input.list,
        });
      } catch (err) {
        console.error("Error", err);
        return false;
      }
      return true;
    }),
  updateTag: publicProcedure
    .input(z.object({ id: z.number(), list: z.string() }))
    .input(
      z.object({
        id: z.number(),
        list: z.string(),
      })
    )
    .mutation(async opts => {
      try {
        await db
          .update(gtaLocationsTags)
          .set({
            tagID: opts.input.id,
            tagList: opts.input.list,
          })
          .where(eq(gtaLocationsTags.tagID, opts.input.id))
          .returning();
      } catch (err) {
        console.error("Error", err);
        return false;
      }
    }),
});

export type AppRouter = typeof appRouter;
