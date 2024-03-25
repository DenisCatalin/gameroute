import { initTRPC } from "@trpc/server";
import { appRouter } from "./index";

const t = initTRPC.create();

export const router = t.router;
export const publicProcedure = t.procedure;
// export const caller = t.createCallerFactory(appRouter);
