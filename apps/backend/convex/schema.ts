import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  entries: defineTable({
    title: v.string(),
    text: v.string(),
    url: v.string(),
  }),
});
