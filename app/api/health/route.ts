import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// Health check voor Uptime Robot — ping deze URL elke 5 minuten
export async function GET() {
  try {
    await client.fetch('*[_type == "settings"][0]._id');
    return NextResponse.json({
      status: "ok",
      sanity: "verbonden",
      time: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { status: "fout", sanity: "niet bereikbaar" },
      { status: 500 }
    );
  }
}
