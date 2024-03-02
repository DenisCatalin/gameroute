import { NextResponse } from "next/server";
import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const { readFile } = fs.promises;

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_API_SECRET,
});

export async function POST(req: any) {
  if (req.method === "POST") {
    try {
      const form = new formidable.IncomingForm();
      form.parse(req, async (err: any, fields: any, files: any) => {
        if (err) {
          console.error("Error parsing form:", err);
          return NextResponse.json({ error: "Error parsing form" }, { status: 500 });
        }

        const resource = fields.resource;
        const name = fields.name;
        const uploadedImageUrls = [];

        // Handling multiple files
        const fileKeys = Object.keys(files);
        for (const key of fileKeys) {
          const file = files[key];

          if (file) {
            const b64 = Buffer.from(await readFile(file.path)).toString("base64");
            const dataURI = "data:" + file.type + ";base64," + b64;
            const uploadedImage = await cloudinary.uploader.upload(dataURI, {
              folder: `Blackwater/${resource}/${name}`,
            });
            uploadedImageUrls.push(uploadedImage.secure_url);
          }
        }

        if (uploadedImageUrls.length > 0) {
          return NextResponse.json({ uploadedImageUrls }, { status: 200 });
        } else {
          return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
        }
      });
    } catch (e) {
      console.error("Error uploading file:", e);
      return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
    }
  }
}
