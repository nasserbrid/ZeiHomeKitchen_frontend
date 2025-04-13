export const AuthLoginSchema = {
  type: "object",
  properties: { 
    username: { type: "string" },
    Password: { type: "string" }     
  },
  required: ["username", "Password"],
  additionalProperties: false,
};
    
  



// export const AuthLoginSchema = {
//   type: "object",
//   properties: {
//     Token: { type: "string" },
//     User: {
//       type: "object",
//       properties: {
//         Id: { type: "number" },
//         username: { type: "string" },
//         Password: { type: "string" },
//         Prenom: { type: "string" },
//         Email: { type: "string" },
//       },
//       required: ["Id", "username", "Password", "Nom", "Prenom", "Email"],
//       additionalProperties: false,
//     },
//     // required: ["Id", "username", "Nom", "Prenom", "Email"],
//     //   additionalProperties: false,
//   },
//   required: ["Token", "User"],
//   additionalProperties: false,
//   }

