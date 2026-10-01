import { eq } from "drizzle-orm";
import { db } from "@/db";
import { learners } from "@/db/schema";

export const dynamic = "force-dynamic";

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: unknown };
    const email = clean(body.email).toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }

    const found = await db.select().from(learners).where(eq(learners.email, email)).limit(1);
    if (found.length === 0) {
      return Response.json(
        { ok: false, error: "No studio found for that email. Start learning to create one." },
        { status: 404 },
      );
    }

    return Response.json({ ok: true, learner: found[0] });
  } catch {
    return Response.json({ ok: false, error: "Could not sign in." }, { status: 500 });
  }
}
