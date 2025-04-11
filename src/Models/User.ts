export type User = {
    id: string;
    username:string;
    Nom?: string;
    Prenom?: string;
    Email: string;
    
  }
  
  export type LoginRequest = {
    username: string;
    Password: string;
  }
  
  export type RegisterRequest ={
    username: string,
    Email: string;
    Nom: string;
    Prenom: string;
    Password: string;
    
  }
  
  export type AuthResponse ={
    token: string;
    user: User;
  }