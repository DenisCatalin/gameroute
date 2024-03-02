import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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
});

export async function POST(req: Request) {
  if (req.method === "POST") {
    try {
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
        } else if (typeof File !== "undefined" && value instanceof File) {
          const file = value;

          let bufferData;
          try {
            // Attempt to use experimental feature, handle warning
            bufferData = Buffer.from(await file.arrayBuffer());
          } catch (e) {
            if (e instanceof ReferenceError && e.message.includes("experimental")) {
              console.warn(
                "ExperimentalWarning: buffer.File is an experimental feature. Ignoring..."
              );
            } else {
              throw new Error("Error"); // Convert unknown type to Error
            }
          }

          // Check if bufferData is available (not affected by experimental warning)
          if (bufferData) {
            const b64 = bufferData.toString("base64");
            const dataURI = "data:" + file.type + ";base64," + b64;
            const uploadedImage = await cloudinary.uploader.upload(dataURI, {
              folder: `Blackwater/${resource}/${name}`,
            });
            uploadedImageUrls.push(uploadedImage.secure_url);
          }
        }
      }

      return NextResponse.json({ uploadedImageUrls }, { status: 200 });
    } catch (e) {
      console.error(e);
      return NextResponse.json({ error: "Error" || "Internal Server Error" }, { status: 500 });
    }
  }
}
