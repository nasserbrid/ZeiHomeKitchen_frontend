import { LoginRequest, RegisterRequest, AuthResponse } from '../types/User';
import { Constants } from '../Constants/constant';
import IAuthService from './IAuthService';

export default class AuthService implements IAuthService{

  /**
   * 
   * @param credentials 
   * @returns 
   */
  public async GetLogin(credentials: LoginRequest): Promise<AuthResponse> 
  {
    
    const response = await fetch(`${Constants.API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      mode: "cors"
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }

    return await response.json();

  }


  /**
   * 
   * @param userData 
   * @returns 
   */
  public async GetRegister(userData: RegisterRequest): Promise<AuthResponse> {
    console.log("Données envoyées à l'API :", userData); 
    const response = await fetch(`${Constants.API_URL}/register`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
      const errorData = await response.json(); // Récupérez les détails de l'erreur
      console.error("Erreur lors de l'inscription :", errorData);
      throw new Error(errorData.message || 'Registration failed');
  }
  
    console.log("Données envoyées à l'API :", userData);

    return await response.json();
  }
  
  
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
// };