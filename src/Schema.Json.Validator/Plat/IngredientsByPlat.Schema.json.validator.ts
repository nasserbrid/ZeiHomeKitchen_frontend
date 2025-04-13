// Schema.Json.Validator/Plat/IngredientsByPlatSchema.Schema.json.validator.ts
export const IngredientsByPlatSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        idIngredient: { type: "number" },
        nom: { type: "string" },
        platIds: { type: "array", items: { type: "number" } },
      },
      required: ["idIngredient", "nom"],
      additionalProperties: false,
    },
  };
  