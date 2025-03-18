import { AuthResponse, LoginRequest, RegisterRequest } from "../types/User";

export default interface IAuthService {

    GetLogin(credentials: LoginRequest): Promise<AuthResponse>;
    GetRegister(userData: RegisterRequest ): Promise<AuthResponse>;
}