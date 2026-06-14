import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    title: v.string(),
    imageId: v.string(),
    price: v.number(),
  }),
  todos: defineTable({
    text: v.string(),
    completed: v.boolean(),
  }),

  ingredients: defineTable({
    name: v.string(),
    brandHint: v.optional(v.string()),
    openFoodFactsId: v.optional(v.string()),
    defaultUnit: v.string(), // "g" | "ml" | "serving"
    isStaple: v.boolean(),
  }).index("by_name", ["name"]),

  nutritionInfo: defineTable({
    ingredientId: v.id("ingredients"),
    perQuantity: v.number(), // e.g. 100
    unit: v.string(), // e.g. "g"
    kcal: v.number(),
    protein: v.number(),
    carbs: v.number(),
    fat: v.number(),
    fiber: v.optional(v.number()),
  }).index("by_ingredient", ["ingredientId"]),

  conversions: defineTable({
    ingredientId: v.id("ingredients"),
    fromUnit: v.string(),
    toDefaultUnitQty: v.number(),
  }).index("by_ingredient", ["ingredientId"]),

  storage: defineTable({
    ingredientId: v.id("ingredients"),
    quantity: v.number(),
    unit: v.string(),
    expDate: v.optional(v.string()), // ISO date
    addedAt: v.number(),
    finished: v.boolean(),
  })
    .index("by_finished", ["finished"])
    .index("by_ingredient", ["ingredientId"]),

  meals: defineTable({
    eatenAt: v.number(),
    label: v.string(), // breakfast | lunch | dinner | snack
    note: v.optional(v.string()),
    // Optional raw macros for "ate out" entries with no ingredients
    rawProtein: v.optional(v.number()),
    rawCarbs: v.optional(v.number()),
    rawFat: v.optional(v.number()),
    rawKcal: v.optional(v.number()),
  }).index("by_eatenAt", ["eatenAt"]),

  mealIngredients: defineTable({
    mealId: v.id("meals"),
    ingredientId: v.id("ingredients"),
    quantity: v.number(),
    unit: v.string(),
  }).index("by_meal", ["mealId"]),
});
