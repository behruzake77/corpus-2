import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const learners = pgTable("learners", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  yearOfStudy: text("year_of_study").notNull(),
  institution: text("institution"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
