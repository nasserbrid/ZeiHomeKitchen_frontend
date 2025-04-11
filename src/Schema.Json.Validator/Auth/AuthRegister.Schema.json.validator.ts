export const AuthRegisterSchema = {
  type: "object",
  properties: {
    Token: { type: "string" },
    User: {
      type: "object",
      properties: {
        Id: { type: "number" },
        username: { type: "string" },
        Nom: { type: "string" },
        Prenom: { type: "string" },
        Email: { type: "string" },
      },
      required: ["Id", "username", "Nom", "Prenom", "Email"],
      additionalProperties: false,
    },
  },
  required: ["Token", "User"],
  additionalProperties: false,
};
