import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(v.literal("image"), v.literal("pdf"), v.literal("csv"));
export const roles = v.union(v.literal("admin"), v.literal("member"));

export default defineSchema({
  files: defineTable({
     name: v.string(),
     fileId: v.id("_storage"),
     shouldDelete: v.optional(v.boolean()),
     type: fileTypes, 
     userId: v.id("users"),
     orgId: v.string() }).index(
    "by_orgId",
    ["orgId"]
  ).index("by_shouldDelete", ["shouldDelete"]),
  favorites: defineTable({
    fileId: v.id("files"),
    userId: v.id("users"),
    orgId: v.string(),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId",]),
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    image: v.optional(v.string()),
    // clerkId: v.string(),
    orgIds: v.array(
      v.object({
        orgId: v.string(),
        role: roles,
      })
    ),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});





