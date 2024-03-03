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

const MAX_FILE_SIZE = 4500000; // 4.5MB

export async function POST(req: Request) {
  if (req.method === "POST") {
    const formData = await req.formData();
    const formDataArray = Array.from(formData);
    const uploadedImageUrls = [];
    let resource = "";
    let name = "";
    let totalSize = 0;

    for (const [key, value] of formDataArray) {
      if (key === "resource") {
        resource = value.toString();
      } else if (key === "name") {
        name = value.toString();
      } else if (value instanceof File) {
        const file = value;

        if (file.size > MAX_FILE_SIZE)
          return NextResponse.json({ error: "File size limit exceeded" }, { status: 400 });

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
