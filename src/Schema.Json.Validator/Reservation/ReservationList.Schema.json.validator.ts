// Schema.Json.Validator/Reservation/ReservationList.Schema.json.validator.ts
export const ReservationListSchema = {

    type: "array",
    items: {
    type: "object",
    properties: {
      IdReservation: { type: "number" },
      DateReservation: { type: "string", format: "date-time" },
      Adresse: { type: "string"},
      Statut: { type: "string"},
      Nom: { type: "string"},
      Prenom: { type: "string"},
      NombrePersonnes: { type: "number" },
      PlatIds: { type: "array", items: { type: "number" ,nullable: true} },
    },
    required: ["IdReservation", "DateReservation", 
        "Adresse","Statut",
        "Nom",
        "Prenom",
        "NombrePersonnes",
        "PlatIds"
    ],
    additionalProperties: false,
   },
  };