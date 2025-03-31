// Schema.Json.Validator/IngredientsList.Schema.json.validator.ts
export const ingredientsListSchema = {
    type: "array",
    items: {
      type: "object",
      properties: {
        idIngredient: { type: "number" },
        nom: { type: "string" },
        platIds: {
          type: "array",
          items: { type: "number" },
        },
      },
      required: ["idIngredient", "nom", "platIds"],
      additionalProperties: false,
    },
  };
  