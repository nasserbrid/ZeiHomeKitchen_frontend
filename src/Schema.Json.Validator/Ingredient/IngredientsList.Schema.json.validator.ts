// Schema.Json.Validator/IngredientsList.Schema.json.validator.ts
export const ingredientsListSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        IdIngredient: { type: "number" },
        Nom: { type: "string" },
        PlatIds: {
          type: "array",
          items: { type: "number" },
        },
      },
      required: ["idIngredient", "nom"],
      additionalProperties: false,
    },
  };
  