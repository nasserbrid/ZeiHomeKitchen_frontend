// Schema.Json.Validator/Reservation/CreateReservationSchema.Schema.json.validator.ts
export const CreatePaiementSchema = {
    type: "object",
    properties: {
      IdPaiement: { type: "number" },
      Montant: { type: "number"},
      Statut: { type: "string"},
      Moyen: { type: "string"},
      IdReservation: { type: "number" }  
    },
    required: ["IdPaiement", 
        "Montant","Statut",
        "Moyen",
        "IdReservation"
    ],
    additionalProperties: false,
  };