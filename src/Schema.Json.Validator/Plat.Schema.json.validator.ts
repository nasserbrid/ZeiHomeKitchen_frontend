// Schema.Json.Validator/Plat.Schema.json.validator.ts
export const platSchema = {
    type: "object",
    properties: {
      idPlat: { type: "number" },
      nom: { type: "string" },
      description: { type: "string", nullable: true },
      image: { type: "string", nullable: true },
      prix: { type: "number" },
      ingredientIds: { type: "array", items: { type: "number" } },
      imageBase64: { type: "string", nullable: true },
    },
    required: ["idPlat", "nom", "prix", "ingredientIds"],
    additionalProperties: false,
  };
  