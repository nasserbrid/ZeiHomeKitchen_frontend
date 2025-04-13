// Schema.Json.Validator/Reservation/ReservationList.Schema.json.validator.ts
export const ReservationListSchema = {

    type: "array",
    items: {
    type: "object",
    properties: {
      idReservation: { type: "number" },
      dateReservation: { type: "string", format: "date-time" },
      adresse: { type: "string"},
      statut: { type: "string"},
      nom: { type: "string"},
      prenom: { type: "string"},
      nombrePersonnes: { type: "number" },
      platIds: { type: "array", items: { type: "number" ,nullable: true} },
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