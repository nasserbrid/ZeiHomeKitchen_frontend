import { AuthResponse, LoginRequest, RegisterRequest } from "../Models/User";

export default interface IAuthService {
  GetLogin(credentials: LoginRequest): Promise<AuthResponse>;
  GetRegister(userData: RegisterRequest): Promise<AuthResponse>;
}
