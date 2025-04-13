// Schema.Json.Validator/PlatListSchema.Schema.json.validator.ts
export const PlatListSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      idPlat: { type: "number" },
      nom: { type: "string" },
      description: { type: ["string", "null"] },
      image: { type: ["string", "null"] },
      prix: { type: "number" },
      ingredientIds: { type: "array", items: { type: ["number", "null"] } },
     // ReservationIds: { type: "array", items: { type: ["number", "null"] } }, 
      imageBase64: { type: ["string", "null"] }
    },
    required: ["idPlat","nom", "prix", "ingredientIds"],
    additionalProperties: false,
  },
 
  //   type: "array",
  //   items: {
  //     type: "object",
  //     properties: {
  //       IdPlat: { type: "number" },
  //       Nom: { type: "string" },
  //       Description: { type: "string", nullable: true },
  //       Image: { type: "string", nullable: true },
  //       Prix: { type: "number" },
  //       IngredientIds: { type: "array", items: { type: "number", nullable: true } },
  //       ReservationIds: { type: "array", items: { type: "number", nullable: true },
  //       ImageBase64: { type: "string", nullable: true },
  //     },
  //     required: ["IdPlat", "Nom", "Prix", "IngredientIds","ReservationIds"],
  //     additionalProperties: false,
  //   },
  // }
};
  
  // "type": "array",
  // // items: {
  //   //"type": "object",
  //   "properties": {
  //     "IdPlat": { "type": "number" },
  //     "Nom": { "type": "string" },
  //     "Description": { "type": "string", "nullable": true },
  //     "Image": { "type": "string", "nullable": true },
  //     "Prix": { "type": "number" },
  //     //"IngredientIds": { type: "array", items: { type: "number" } },
  //     "ImageBase64": { "type": "string", "nullable": true },
  //   },
  //   "required": ["IdPlat", "Nom", "Prix"]
  //   //additionalProperties: false,
  // // },
//};

  

  
