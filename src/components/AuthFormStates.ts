//Ici ce n'est pas une interface mais un Type, 
//Je change l'interface en type

export type AuthFormState ={
  isLogin: boolean;
  username: string;
  email: string;
  nom:string,
  prenom:string,
  password: string;
  error: string | null;
  loading: boolean;
}

// export interface AuthFormState {
//     isLogin: boolean;
//     username: string;
//     email: string;
//     nom:string,
//     prenom:string,
//     password: string;
//     error: string | null;
//     loading: boolean;
//   }