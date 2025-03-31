// Schema.Json.Validator/IngredientsByPlat.Schema.json.validator.ts
export const ingredientsByPlatSchema = {
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
  