import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const fileTypes = v.union(v.literal("image"), v.literal("pdf"), v.literal("csv"))

export default defineSchema({
  files: defineTable({
     name: v.string(),
     fileId: v.id("_storage"),
     type: fileTypes, 
     orgId: v.string() }).index(
    "by_orgId",
    ["orgId"]
  ),
  favorites: defineTable({
    fileId: v.id("files"),
    userId: v.id("users"),
    orgId: v.string(),
  }).index("by_userId_orgId_fileId", ["userId", "orgId", "fileId",]),
  users: defineTable({
    tokenIdentifier: v.string(),
    // clerkId: v.string(),
    orgIds: v.array(v.string()),
  }).index("by_tokenIdentifier", ["tokenIdentifier"]),
});





