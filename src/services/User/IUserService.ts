import { User } from "../../Models/User"; // Assurez-vous que ce modèle existe

export default interface IUserService {
    // Méthode pour récupérer l'utilisateur actuel
    getCurrentUser(): Promise<User | null>; 
}
