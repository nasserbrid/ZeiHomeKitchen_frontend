import { AuthRegisterSchema } from './../../Schema.Json.Validator/Auth/AuthRegister.Schema.json.validator';
import { AuthLoginSchema } from '../../Schema.Json.Validator/Auth/AuthLogin.Schema.json.validator';
import { Constants } from "../../Constants/constant";
import { AuthResponse, LoginRequest, RegisterRequest } from "../../Models/User";
import IAuthService from "././IAuthService";
import Ajv,{ ValidateFunction } from 'ajv';

export default class AuthService implements IAuthService {
   private ajv: Ajv;
   private validateAuthLoginSchema: ValidateFunction;
   private validateAuthRegisterSchema: ValidateFunction;

   constructor() {
    this.ajv = new Ajv();
    this.validateAuthLoginSchema = this.ajv.compile(AuthLoginSchema);
    this.validateAuthRegisterSchema = this.ajv.compile(AuthRegisterSchema);
   }
   


  /**
   *
   * @param credentials
   * @returns
   */
  public async GetLogin(credentials: LoginRequest): Promise<AuthResponse> {
    try {
        const response = await fetch(`${Constants.API_URL}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
            mode: "cors",
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await response.json();
        console.log('Réponse de connexion:', data); 

        // Validation de la réponse
        // const valid = this.validateAuthLoginSchema(data);
        // if (!valid) {
        //     console.error(this.validateAuthLoginSchema.errors);
        //     throw new Error("Les données de connexion ne sont pas conformes au schéma attendu.");
        // }

        return Promise.resolve(data);
       
    } catch (error) {
        console.error('Erreur de connexion:', error);
        return Promise.reject(error);
    }
}



  /**
   *
   * @param userData
   * @returns
   */
  public async GetRegister(userData: RegisterRequest): Promise<AuthResponse> {
    console.log("Données envoyées à l'API :", userData);
    
    const response = await fetch(`${Constants.API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    if (!response.ok) {
        const errorData = await response.json(); 
        console.error("Erreur lors de l'inscription :", errorData);
        throw new Error(errorData.message || "Registration failed");
    }

    const authResponse: AuthResponse = await response.json();
    console.log('Réponse de connexion:', authResponse);

    // Validation de la réponse
    const valid = this.validateAuthRegisterSchema(authResponse);
    if (!valid) {
        console.error(this.validateAuthRegisterSchema.errors);
        throw new Error("Les données d'inscription ne sont pas conformes au schéma attendu.");
    }

    console.log("Données reçues de l'API :", authResponse);
    return Promise.resolve(authResponse);
}


// import { LoginRequest, RegisterRequest, AuthResponse } from '../types/User';
// import { Constants } from '../Constants/constant';

// export const authService = {
//   async login(credentials: LoginRequest): Promise<AuthResponse> {
//     const response = await fetch(`${Constants.API_URL}/login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(credentials),
//       mode: "cors"
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || 'Login failed');
//     }

//     return await response.json();
//   },

//   async register(userData: RegisterRequest): Promise<AuthResponse> {
//     console.log("Données envoyées à l'API :", userData);
//     const response = await fetch(`${Constants.API_URL}/register`, {
//       method: 'POST',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//       const errorData = await response.json(); // Récupérez les détails de l'erreur
//       console.error("Erreur lors de l'inscription :", errorData);
//       throw new Error(errorData.message || 'Registration failed');
//   }

//     console.log("Données envoyées à l'API :", userData);

//     return await response.json();
//   },
// };}
}