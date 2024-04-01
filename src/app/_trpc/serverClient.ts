// import { httpBatchLink } from "@trpc/client";
// import { caller } from "@/server/trpc";

// const appUrl =
//   process.env.NODE_ENV === "production"
//     ? process.env.PROD_APP_URL || "https://gameroute.vercel.app/api/trpc"
//     : process.env.DEV_APP_URL || "http://localhost:3000/api/trpc";

// export const serverClient = caller({
//   links: [
//     httpBatchLink({
//       url: appUrl,
//     }),
//   ],
// });
