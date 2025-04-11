// Schema.Json.Validator/Reservation/CreateReservationSchema.Schema.json.validator.ts
export const CreateReservationSchema = {
    type: "object",
    properties: {
      IdReservation: { type: "number" },
      DateReservation: { type: "string", format: "date-time" },
      Adresse: { type: "string"},
      Statut: { type: "string"},
      Nom: { type: "string"},
      Prenom: { type: "string"},
      NombrePersonnes: { type: "number" },
      PlatIds: { type: "array", items: { type: "number"} },
      IdStatistique: { type: "number" }, // Ajouté ici
      IdUtilisateur: { type: "number" }  // Ajouté ici
    },
    required: ["IdReservation", "DateReservation", 
        "Adresse","Statut",
        "Nom",
        "Prenom",
        "NombrePersonnes",
        "PlatIds"
    ],
    additionalProperties: false,
  };