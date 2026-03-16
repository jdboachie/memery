import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("entries").collect();
    return entries;
  },
});

export const create = mutation({
  args: { text: v.string(), url: v.string(), title: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("entries", {
      text: args.text,
      url: args.url,
      title: args.title,
    });
  },
});
