import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Sanity webhook roept dit aan bij elke publish → site herlaadt direct
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Ongeautoriseerd" }, { status: 401 });
  }

  revalidatePath("/", "layout"); // herlaadt alle pagina's
  return NextResponse.json({ revalidated: true, now: new Date().toISOString() });
}
