import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import tinify from "tinify";
import fs from "fs";

export const dynamic = "auto";
export const dynamicParams = true;
export const revalidate = false;
export const fetchCache = "auto";
export const runtime = "nodejs";
export const preferredRegion = "auto";
export const maxDuration = 5;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET,
  secure: true,
});

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.formData();
    const formDataArray = Array.from(formData);
    const uploadedImageUrls = [];
    let resource = "";
    let name = "";

    for (const [key, value] of formDataArray) {
      if (key === "resource") {
        resource = value.toString();
      } else if (key === "name") {
        name = value.toString();
      } else if (value instanceof File) {
        const file = value;

        const b64 = Buffer.from(await file.arrayBuffer()).toString("base64");
        let dataURI = "data:" + file.type + ";base64," + b64;
        const uploadedImage = await cloudinary.uploader.upload(dataURI, {
          folder: `Blackwater/${resource}/${name}`,
        });
        uploadedImageUrls.push(uploadedImage.secure_url);
      }
    }
    return NextResponse.json({ uploadedImageUrls }, { status: 200 });
  }
}
