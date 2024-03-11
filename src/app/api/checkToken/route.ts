import { verifyToken } from "@/app/lib/verifyToken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { JwtPayload } from "jsonwebtoken";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

type MyTokenPayload = JwtPayload & {
  exp: number;
};

export async function GET(req: Request) {
  if (req.method === "GET") {
    const cookieStore = cookies();
    if (cookieStore.get("token")) {
      const token = (await verifyToken(cookieStore.get("token")?.value)) as MyTokenPayload;
      if (token.exp > Date.now() / 1000) {
        return NextResponse.json({ token }, { status: 200 });
      } else {
        cookieStore.delete("token");
        return NextResponse.json({ message: "Token expired" }, { status: 200 });
      }
    } else {
      return NextResponse.json({ message: "No token" }, { status: 200 });
    }
  }
}
