import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

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

        if (file.size > 5000000) {
          const fileSize = file.size;
          const chunkSize = 5000000;
          let start = 0;
          let end = Math.min(chunkSize, fileSize);
          let partNumber = 1;

          while (start < fileSize) {
            const blob = file.slice(start, end);
            const reader = new FileReader();

            reader.readAsDataURL(blob);
            reader.onloadend = async () => {
              const b64Data = reader.result?.toString() || "";
              const dataURI = "data:" + file.type + ";base64," + b64Data;

              const uploadedImage = await cloudinary.uploader.upload_large(dataURI, {
                folder: `Blackwater/${resource}/${name}`,
                partNumber,
                totalParts: Math.ceil(fileSize / chunkSize),
              });

              uploadedImageUrls.push(uploadedImage.secure_url);

              if (end < fileSize) {
                start = end;
                end = Math.min(start + chunkSize, fileSize);
                partNumber++;
              }
            };
          }
        } else {
          const b64 = Buffer.from(await file.arrayBuffer()).toString("base64");
          let dataURI = "data:" + file.type + ";base64," + b64;
          const uploadedImage = await cloudinary.uploader.upload_large(dataURI, {
            folder: `Blackwater/${resource}/${name}`,
          });
          uploadedImageUrls.push(uploadedImage.secure_url);
        }
      }
    }

    return NextResponse.json({ uploadedImageUrls }, { status: 200 });
  }
}
