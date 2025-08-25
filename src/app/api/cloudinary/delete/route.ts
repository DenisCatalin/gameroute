import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    const { videoIds, imageIds } = (await req.json()) as {
      videoIds: string[];
      imageIds: string[];
    };

    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json({ error: "Missing Cloudinary credentials" }, { status: 500 });
    }

    const destroyPromises: Promise<any>[] = [];
    if (Array.isArray(videoIds) && videoIds.length > 0) {
      for (const id of videoIds) {
        destroyPromises.push(
          cloudinary.uploader.destroy(id, { resource_type: "video", invalidate: true })
        );
      }
    }
    if (Array.isArray(imageIds) && imageIds.length > 0) {
      for (const id of imageIds) {
        destroyPromises.push(
          cloudinary.uploader.destroy(id, { resource_type: "image", invalidate: true })
        );
      }
    }

    const results = await Promise.allSettled(destroyPromises);
    return NextResponse.json({ results });
  } catch (err) {
    console.error("Cloudinary delete error", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
