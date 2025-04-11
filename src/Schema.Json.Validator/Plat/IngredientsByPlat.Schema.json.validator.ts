// Schema.Json.Validator/Plat/IngredientsByPlatSchema.Schema.json.validator.ts
export const IngredientsByPlatSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        IdIngredient: { type: "number" },
        Nom: { type: "string" },
        PlatIds: { type: "array", items: { type: "number" } },
      },
      required: ["IdIngredient", "Nom"],
      additionalProperties: false,
    },
  };
  