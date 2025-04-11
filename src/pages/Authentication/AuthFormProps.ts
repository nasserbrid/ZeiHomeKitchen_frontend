import IAuthService from "../../services/AuthService/IAuthService";

export interface AuthFormProps {
  onSuccess: (token: string, username: string) => void;
  //Toujours passer le service par le props et ensuite on peut l'utiliser dans le module (exple ici AuthForm.tsx)
  //On injecte le service dans le props ici pour pouvoir l'utiliser dans AuthForm.tsx
  authService:IAuthService
}

