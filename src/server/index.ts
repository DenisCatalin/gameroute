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
  // getProductById: publicProcedure.input(z.object({ id: z.number() })).query(async (req: any) => {
  //   const result = await db
  //     .select()
  //     .from(products)
  //     .where(eq(products.productID, req.input.id))
  //     .limit(1);
  //   if (result.length > 0) {
  //     return result[0];
  //   } else {
  //     return null;
  //   }
  // }),
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
  // addProduct: publicProcedure
  //   .input(
  //     z.object({
  //       productName: z.string(),
  //       productCategory: z.string(),
  //       productPrice: z.number(),
  //       productThumbnail: z.string(),
  //       productStock: z.number(),
  //       productOnSale: z.boolean(),
  //       productDiscount: z.number(),
  //       productSpecifications: z.string(),
  //       productDescription: z.string(),
  //       productGallery: z.string(),
  //       productBrand: z.string(),
  //       productResealed: z.boolean(),
  //     })
  //   )
  //   .mutation(async opts => {
  //     try {
  //       await db.insert(products).values({
  //         productName: opts.input.productName,
  //         productCategory: opts.input.productCategory,
  //         productPrice: opts.input.productPrice,
  //         productThumbnail: opts.input.productThumbnail,
  //         productStock: opts.input.productStock,
  //         productOnSale: opts.input.productOnSale,
  //         productDiscount: opts.input.productDiscount,
  //         productSpecifications: opts.input.productSpecifications,
  //         productDescription: opts.input.productDescription,
  //         productGallery: opts.input.productGallery,
  //         productBrand: opts.input.productBrand,
  //         productResealed: opts.input.productResealed,
  //       });
  //     } catch (err) {
  //       console.error("Error", err);
  //       return false;
  //     }
  //     return true;
  //   }),
  // deleteProduct: publicProcedure.input(z.object({ id: z.number() })).query(async (req: any) => {
  //   const result = await db
  //     .delete(products)
  //     .where(eq(products.productID, req.input.id))
  //     .returning();
  //   if (result.length > 0) {
  //     return result[0];
  //   } else {
  //     return null;
  //   }
  // }),
});

export type AppRouter = typeof appRouter;
