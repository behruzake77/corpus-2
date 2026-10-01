import { eq } from "drizzle-orm";
import { db } from "@/db";
import { learners } from "@/db/schema";

export const dynamic = "force-dynamic";

const years = new Set(["M1", "M2", "M3", "M4", "PA", "Other"]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      name?: unknown;
      email?: unknown;
      yearOfStudy?: unknown;
      institution?: unknown;
    };
    const name = clean(body.name);
    const email = clean(body.email).toLowerCase();
    const yearOfStudy = clean(body.yearOfStudy);
    const institution = clean(body.institution) || null;

    if (name.length < 2) {
      return Response.json({ ok: false, error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }
    if (!years.has(yearOfStudy)) {
      return Response.json({ ok: false, error: "Select your year of study." }, { status: 400 });
    }

    const existing = await db.select().from(learners).where(eq(learners.email, email)).limit(1);
    if (existing.length > 0) {
      return Response.json({
        ok: true,
        learner: existing[0],
        already: true,
      });
    }

    const created = await db
      .insert(learners)
      .values({ name, email, yearOfStudy, institution })
      .returning();

    return Response.json({ ok: true, learner: created[0] });
  } catch {
    return Response.json({ ok: false, error: "Could not create your studio." }, { status: 500 });
  }
}
