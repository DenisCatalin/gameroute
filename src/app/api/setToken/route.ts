import { verifyToken } from "@/app/lib/verifyToken";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

export async function POST(req: Request) {
  if (req.method === "POST") {
    const cookieStore = cookies();
    const data = await req.json();
    const token = jwt.sign(
      {
        iat: Math.floor(Date.now() / 1005),
        exp: Math.floor(Date.now() / 1000 + 7 * 24 * 60 * 60),
        ...data,
      },
      "o3kWYB/Av9w/TNqtTj8Uxa7ULvnUz3nYJweKsB/JWs4HWWZUII0EFpfb5xKIGKMM"
    );
    cookieStore.set("token", token);
    return NextResponse.json({ message: "Token settled" }, { status: 200 });
  }
}
