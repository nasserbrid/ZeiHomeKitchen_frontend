export type User = {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
  }
  
  export type LoginRequest = {
    username: string;
    password: string;
  }
  
  export type RegisterRequest ={
    username: string,
    email: string;
    nom: string;
    prenom: string;
    password: string;
    
  }
  
  export type AuthResponse ={
    token: string;
    user: User;
  }