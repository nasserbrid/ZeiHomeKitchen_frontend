// Schema.Json.Validator/PlatListSchema.Schema.json.validator.ts
export const PlatListSchema = {
  type: "array",
  items: {
    type: "object",
    properties: {
      IdPlat: { type: "number" },
      Nom: { type: "string" },
      Description: { type: ["string", "null"] }, // Correction ici
      Image: { type: ["string", "null"] },
      Prix: { type: "number" },
      IngredientIds: { type: "array", items: { type: ["number", "null"] } },
      ReservationIds: { type: "array", items: { type: ["number", "null"] } }, // Correction ici
      ImageBase64: { type: ["string", "null"] }
    },
    required: ["IdPlat", "Nom", "Prix", "IngredientIds", "ReservationIds"],
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

  

  
