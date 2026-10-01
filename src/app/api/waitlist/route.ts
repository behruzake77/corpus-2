import { eq } from "drizzle-orm";
import { db } from "@/db";
import { waitlist } from "@/db/schema";

export const dynamic = "force-dynamic";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { name?: unknown; email?: unknown };
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();

    if (name.length < 2) {
      return Response.json({ ok: false, error: "Please enter your name." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    const existing = await db.select().from(waitlist).where(eq(waitlist.email, email)).limit(1);
    if (existing.length > 0) {
      return Response.json({ ok: true, already: true });
    }

    await db.insert(waitlist).values({ name, email });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false, error: "Could not save your place." }, { status: 500 });
  }
}
