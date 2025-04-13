// Schema.Json.Validator/PlatSchema.Schema.json.validator.ts
export const PlatSchema = {
  type: "object",
  properties: {
    idPlat: { type: "number" },
    nom: { type: "string" },
    description: { type: ["string", "null"] },
    image: { type: "string", nullable: true },
    prix: { type: "number" },
    ingredientIds: { type: "array", items: { type: "number" } },
    //ReservationIds: { type: "array", items: { type: "number", nullable: true } }, // **Corrigé**
    imageBase64: { type: "string", nullable: true }
  },
  required: ["idPlat", "nom", "prix", "ingredientIds"],
  additionalProperties: false,

  //   type: "object",
  //   properties: {
  //     IdPlat: { type: "number" },
  //     Nom: { type: "string" },
  //     Description: { type: "string", nullable: true },
  //     Image: { type: "string", nullable: true },
  //     Prix: { type: "number" },
  //     IngredientIds: { type: "array", items: { type: "number" } },
  //     ReservationIds: { type: "array", items: { type: "number", nullable: true },
  //     ImageBase64: { type: "string", nullable: true },
  //   },
  //   required: ["IdPlat", "Nom", "Prix","IngredientIds", "ReservationIds"],
  //   additionalProperties: false,
  // }
};
  