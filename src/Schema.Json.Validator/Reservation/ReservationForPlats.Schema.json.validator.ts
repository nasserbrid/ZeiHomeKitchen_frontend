// Schema.Json.Validator/Reservation/ReservationForPlatsSchema.Schema.json.validator.ts
export const ReservationForPlatsSchema = {

    type: "array",
    items: {
    type: "object",
    properties: {
      idReservation: { type: "number" },
      dateReservation: { type: "string", format: "date-time"},
      adresse: { type: "string"},
      statut: { type: "string"},
      nom: { type: "string"},
      prenom: { type: "string"},
      nombrePersonnes: { type: "number" },    
      platIds: { type: "array", items: { type: "number"} },
      idUtilisateur: { type: "number" }
    },
    required: ["idReservation", "dateReservation", 
        "adresse","statut",
        "nom",
        "prenom",
        "nombrePersonnes",
        "platIds", "idUtilisateur"
    ],
    additionalProperties: false,
   },
  };