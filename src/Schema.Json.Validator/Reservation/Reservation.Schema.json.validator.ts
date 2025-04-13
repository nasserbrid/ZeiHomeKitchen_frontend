// Schema.Json.Validator/Reservation/Reservation.Schema.json.validator.ts
export const ReservationSchema = {
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
    required: ["IdReservation", "DateReservation", 
        "Adresse","Statut",
        "Nom",
        "Prenom",
        "NombrePersonnes",
        "PlatIds", "idUtilisateur"
    ],
    additionalProperties: false,
  };